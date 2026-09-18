export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const comparisons = await prisma.comparison.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { property: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(comparisons);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name, propertyIds } = await req.json();
    if (!name || !propertyIds?.length) {
      return NextResponse.json({ error: 'name and propertyIds required' }, { status: 400 });
    }
    const comparison = await prisma.comparison.create({
      data: {
        userId: session.user.id,
        name,
        items: {
          create: (propertyIds as string[]).map((pid: string) => ({ propertyId: pid })),
        },
      },
      include: { items: { include: { property: true } } },
    });
    return NextResponse.json(comparison, { status: 201 });
  } catch (err: any) {
    console.error('Comparison error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
