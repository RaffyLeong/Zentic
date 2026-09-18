"use client";

import Image from 'next/image';
import { PropertyType } from '@/types';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { PoundSterling, MapPin, BedDouble, Bath, Ruler, Check, AlertTriangle, Heart, ArrowRight, Building2, Globe } from 'lucide-react';
import { getPlatformLogo, getPlatformColor } from '@/lib/platform-logo';

interface PropertyListItemProps {
  property: PropertyType;
  compareMode: boolean;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function PropertyListItem({
  property,
  compareMode,
  isSelected,
  onToggleSelect,
  isFavorited = false,
  onToggleFavorite,
}: PropertyListItemProps) {
  const { status } = useSession();
  const [favLoading, setFavLoading] = useState(false);

  const handleFav = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // if there is not handle for toggling favorite, do nothing
    if (!onToggleFavorite) return;
    setFavLoading(true);
    await onToggleFavorite(property.id);
    setFavLoading(false);
  };

  const inner = (
    <div className="flex flex-col md:flex-row relative">
      { /* Platform logo */}
      {property?.platform && (
        <div className="absolute top-3 right-3 z-10 bg-card rounded-lg px-2 py-1.5 shadow-md border border-border flex items-center gap-1.5"
          title={`Source: ${property.platform}`}>
          <Image
            src={getPlatformLogo(property.platform)}
            alt={property.platform}
            width={24}
            height={24}
            className="object-cover w-8 h-8"
          />
          <span
            className="text-[24px] font-semibold uppercase tracking-wide"
            style={{ color: getPlatformColor(property.platform) }}
          >
            {property.platform}
          </span>
        </div>
      )}
      {/* Image */}
      <div className="relative w-full md:w-[320px] lg:w-[360px] shrink-0 aspect-[16/10] md:aspect-auto md:min-h-[240px] bg-muted">
        <Image
          src={property?.imageUrl ?? ''}
          alt={property?.address ?? 'Property'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 360px"
          onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
        />
        {/* Compare checkbox (only in compare mode) */}
        {compareMode && (
          <div
            className={`absolute top-3 left-3 w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold transition-all shadow-sm ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-white/90 text-primary border border-primary/40'
              }`}
          >
            {isSelected ? <Check className="w-5 h-5" /> : ''}
          </div>
        )}
        {/* Fav button */}
        <button
          onClick={handleFav}
          disabled={favLoading}
          className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-all shadow-sm"
          title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-primary text-primary' : 'text-primary'}`} />
        </button>
      </div>

      {/* Details */}
      <div className="flex-1 p-4 md:p-5 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display font-bold text-2xl text-foreground flex items-center gap-1">
            {/* Price */}
            <PoundSterling className="w-5 h-5 text-primary" />
            {property?.price?.toLocaleString('en-GB') ?? 'Price on request'}
          </p>
        </div>

        <p className="text-base text-foreground font-semibold mt-1">
          {property?.address ?? ''}
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="w-4 h-4 text-primary" /> {property?.city ?? ''}, {property?.postcode ?? ''}
        </p>
        {/* Agency */}
        <div className="flex flex-wrap items-center gap-3 mt-1.5">
          {/* property?.agency - Does a property (and its agency) exist? */}
          {/*  property.agency !== 'Unknown' - Is the agency value a real agency */}
          {/* meaning - If property exists AND property.agency exists AND it's not the string 'Unknown' → show the agency block */}
          {property?.agency && property.agency !== 'Unknown' && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              Listed by <span className="font-bold text-[14px]">{property.agency}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-foreground mt-3">
          <span className="flex items-center gap-1"><BedDouble className="w-4 h-4 text-primary" /> {property?.bedrooms ?? 0} bed</span>
          <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-primary" /> {property?.bathrooms ?? 0} bath</span>
          <span className="flex items-center gap-1"><Ruler className="w-4 h-4 text-primary" /> {property?.sqft ? `${property.sqft.toLocaleString('en-GB')} sqft`: 'Ask agent'}</span>
        </div>

        {/* Pros and cons */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {(property?.pros ?? []).slice(0, 3).map((pro: string, i: number) => (
            <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" /> {pro}
            </span>
          ))}
          {(property?.cons ?? []).slice(0, 1).map((con: string, i: number) => (
            <span key={i} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> {con}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-auto pt-4">
          {/* if compareMode is true, show the comparison text, otherwise show the listing link */}
          {compareMode ? (
            <span className="text-sm font-medium text-primary flex items-center gap-1">
              {isSelected ? 'Selected for comparison' : 'Tap to add to comparison'}
            </span>
          ) : (
            <span className="text-sm font-medium text-primary flex items-center gap-1">
              View on {property.platform || 'Listing'} <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const baseClass = "block bg-card rounded-[var(--radius)] border transition-all duration-200 overflow-hidden cursor-pointer";

  // Compare mode: whole card toggles selection
  if (compareMode) {
    return (
      <div
        onClick={() => onToggleSelect(property.id)}
        className={`${baseClass} ${isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:shadow-lg'}`}
      >
        {inner}
      </div>
    );
  }

  // Default mode: whole card is a link to the listing
  return (
    <a
      href={property?.listingUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} border-border hover:shadow-lg`}
    >
      {inner}
    </a>
  );
}
