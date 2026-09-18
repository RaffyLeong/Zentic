"use client";

import Image from 'next/image';
import { PropertyType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Building2, Globe, ArrowRight } from 'lucide-react';

interface PropertyCardProps {
  property: PropertyType;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function PropertyCard({
  property,
  isSelected,
  onToggleSelect,
  isFavorited = false,
  onToggleFavorite,
}: PropertyCardProps) {
  const { status } = useSession();
  const [favLoading, setFavLoading] = useState(false);

  const handleFav = async () => {
    if (status !== 'authenticated' || !onToggleFavorite) return;
    setFavLoading(true);
    await onToggleFavorite(property.id);
    setFavLoading(false);
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg group">
      <div className="relative aspect-[16/10] bg-muted">
        <Image
          src={property?.imageUrl ?? ''}
          alt={property?.address ?? 'Property'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
        />
        {/* Compare checkbox */}
        <button
          onClick={() => onToggleSelect(property.id)}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isSelected
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'bg-white/90 text-muted-foreground hover:bg-white'
            }`}
          title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
        >
          {isSelected ? '✓' : '📊'}
        </button>
        {/* Fav button */}
        {status === 'authenticated' && (
          <button
            onClick={handleFav}
            disabled={favLoading}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-all text-lg"
            title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
          >
            {isFavorited ? '❤️' : '🤍'}
          </button>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <p className="font-display font-bold text-lg text-primary">
            💰 £{property?.price?.toLocaleString('en-GB') ?? '0'}
          </p>
        </div>
        <p className="text-sm text-foreground font-medium truncate">
          📍 {property?.address ?? ''}, {property?.city ?? ''}
        </p>
        <p className="text-xs text-muted-foreground">{property?.postcode ?? ''}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>🛏️ {property?.bedrooms ?? 0}</span>
          <span>🚿 {property?.bathrooms ?? 0}</span>
          <span>📐 {property?.sqft
            ? `${property.sqft.toLocaleString('en-GB')} sqft`
            : 'Ask agent'} sqft</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {(property?.pros ?? []).slice(0, 2).map((pro: string, i: number) => (
            <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              ✅ {pro}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
