export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const searches = await prisma.savedSearch.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(searches);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name, location, minPrice, maxPrice, minBedrooms, maxBedrooms } = await req.json();
    if (!name || !location) {
      return NextResponse.json({ error: 'name and location required' }, { status: 400 });
    }
    const saved = await prisma.savedSearch.create({
      data: {
        userId: session.user.id,
        name,
        location,
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 0,
        minBedrooms: minBedrooms || 0,
        maxBedrooms: maxBedrooms || 0,
      },
    });
    return NextResponse.json(saved, { status: 201 });
  } catch (err: any) {
    console.error('SavedSearch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
