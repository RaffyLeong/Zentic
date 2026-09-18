export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { property: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(favorites);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { propertyId } = await req.json();
    if (!propertyId) return NextResponse.json({ error: 'propertyId required' }, { status: 400 });
    const fav = await prisma.favorite.create({
      data: { userId: session.user.id, propertyId },
      include: { property: true },
    });
    return NextResponse.json(fav, { status: 201 });
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'Already saved' }, { status: 409 });
    }
    console.error('Favorite error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
