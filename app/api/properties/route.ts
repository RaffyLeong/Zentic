export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const minPrice = parseInt(searchParams.get('minPrice') || '0') || 0;
    const maxPrice = parseInt(searchParams.get('maxPrice') || '0') || 0;
    const bedrooms = parseInt(searchParams.get('bedrooms') || '0') || 0;
    const bathroom = parseInt(searchParams.get('bathrooms') || '0') || 0;

    const where: any = {};
    if (search) {
      where.OR = [
        { address: { contains: search, mode: 'insensitive' } },
        { postcode: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (minPrice > 0) where.price = { ...(where.price ?? {}), gte: minPrice };
    if (maxPrice > 0) where.price = { ...(where.price ?? {}), lte: maxPrice };
    if (bedrooms > 0) where.bedrooms = { gte: bedrooms };
    if (bathroom > 0) where.bathrooms = { gte: bathroom };
    const properties = await prisma.property.findMany({ where, orderBy: { price: 'asc' } });
    return NextResponse.json(properties);
  } catch (err: any) {
    console.error('Properties fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
