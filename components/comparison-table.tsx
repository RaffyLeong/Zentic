import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { PropertyType } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  PoundSterling,
  BedDouble,
  Ruler,
  Bath,
  MapPin,
  Check,
  AlertTriangle,
  X,
  ArrowRight,
} from 'lucide-react';

interface ComparisonTableProps {
  properties: PropertyType[];
  onRemove?: (id: string) => void;
}

type Badge = { label: string; icon: React.ReactNode; color: 'green' | 'red' };

export function ComparisonTable({ properties, onRemove }: ComparisonTableProps) {
  if (!properties?.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <BarChart3 className="w-10 h-10 text-primary mx-auto mb-4" />
        <p className="font-display text-lg">No properties to compare</p>
        <p className="text-sm">Select 2-5 properties from the search results</p>
      </div>
    );
  }



  const createBadge = (
    value: number,
    allValues: number[],
    higherIsBetter: boolean,
    winLabel: string,
    loseLabel: string,
    icon: React.ReactNode
  ): Badge | null => {
    const best = higherIsBetter ? Math.max(...allValues) : Math.min(...allValues);
    const isTie = allValues.filter((v) => v === value).length > 1;

    if (isTie) return null; // If it's a tie, show no badge
    if (value === best) return { label: winLabel, icon, color: 'green' }; // Winner = Green
    return null
  };



  // Price, Bedroom, bathroom, sqft --- 1. Calculate the best and worst values for each spec ---
  const lowestPrice = Math.min(...properties.map((x) => x.price));
  const highestPrice = Math.max(...properties.map((x) => x.price));
  const mostBeds = Math.max(...properties.map((x) => x.bedrooms));
  const fewestBeds = Math.min(...properties.map((x) => x.bedrooms));
  const mostBaths = Math.max(...properties.map((x) => x.bathrooms));
  const fewestBaths = Math.min(...properties.map((x) => x.bathrooms));
  const largestSqft = Math.max(...properties.map((x) => x.sqft));
  const smallestSqft = Math.min(...properties.map((x) => x.sqft));

  // --- 2. Helper to get the color class(expect the price section) ---
  const getColorClass = (value: number, best: number, worst: number, allValues: number[]) => {
    const isTie = allValues.filter((v) => v === value).length > 1;
    if (isTie) return 'text-foreground'; // If it's a tie, show no color
    if (value === best) return 'text-green-600';
    if (value === worst) return 'text-red-500';
    return 'text-foreground';
  };

  const getBadges = (p: PropertyType): Badge[] => {
    const prices = properties.map((x) => x.price);
    const beds = properties.map((x) => x.bedrooms);
    const baths = properties.map((x) => x.bathrooms);
    const sqfts = properties.map((x) => x.sqft);
    return [
      createBadge(p.price, prices, false, 'Lowest Price', 'Highest Price', <PoundSterling className="w-3 h-3" />),
      createBadge(p.bedrooms, beds, true, 'Most Bedrooms', 'Fewest Bedrooms', <BedDouble className="w-3 h-3" />),
      createBadge(p.bathrooms, baths, true, 'Most Bathrooms', 'Fewest Bathrooms', <Bath className="w-3 h-3" />),
      createBadge(p.sqft, sqfts, true, 'Largest', 'Smallest', <Ruler className="w-3 h-3" />),
    ].filter((b): b is Badge => b !== null); // Remove the nulls (ties)
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-flex items-stretch gap-4 min-w-full pb-4" style={{ minWidth: `${properties.length * 280}px` }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {properties.map((property: PropertyType) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 min-w-[260px] max-w-[340px] flex"
            >
              <Card className="w-full overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/10] bg-muted shrink-0">
                  <Image
                    src={property?.imageUrl ?? ''}
                    alt={property?.address ?? 'Property'}
                    fill
                    className="object-cover"
                    sizes="340px"
                    onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {onRemove && (
                    <button
                      onClick={() => onRemove(property.id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-white transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  {/* Badges — fixed height (fits up to 2 rows) so price aligns across all cards */}
                  <div className="flex flex-wrap content-start gap-1 min-h-[60px]">
                    {getBadges(property).map((badge: Badge, i: number) => (
                      <span key={i} className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 h-fit ${badge.color === 'green' ? 'bg-card text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {badge.icon} {badge.label}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <p className={`font-display font-bold text-xl flex items-center gap-1 mt-3 ${property.price === lowestPrice
                      ? 'text-green-700'
                      : property.price === highestPrice
                        ? 'text-red-500'
                        : 'text-foreground'
                    }`}>
                    <PoundSterling className="w-5 h-5 font-bold" />
                    {property?.price?.toLocaleString('en-GB') ?? '0'}
                  </p>

                  {/* Address — fixed height so specs row aligns across all cards */}
                  <div className="min-h-[52px] mt-2">
                    <p className="text-sm font-medium flex items-start gap-1">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {property?.address ?? ''}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{property?.city ?? ''}, {property?.postcode ?? ''}</p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 my-3 border-t border-b border-border text-center">
                    <div className="flex flex-col items-center">
                      <p className={`text-lg font-bold ${getColorClass(property.bedrooms, mostBeds, fewestBeds, properties.map(x => x.bedrooms))}`}>{property?.bedrooms ?? 0}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><BedDouble className="w-3 h-3 text-primary" /> Beds</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={`text-lg font-bold ${getColorClass(property.bathrooms, mostBaths, fewestBaths, properties.map(x => x.bathrooms))}`}>{property?.bathrooms ?? 0}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Bath className="w-3 h-3 text-primary" /> Baths</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={`text-lg font-bold ${getColorClass(property.sqft, largestSqft, smallestSqft, properties.map(x => x.sqft))}`}>{property?.sqft ? `${property.sqft.toLocaleString('en-GB')} sqft` : 'Size on request'}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Ruler className="w-3 h-3 text-primary" /> sqft</p>
                    </div>
                  </div>

                  {/* Pros */}
                  <div className="space-y-1">
                    {(property?.pros ?? []).map((pro: string, i: number) => (
                      <p key={i} className="text-xs flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5 " /> <span className='text-green-700'>{pro}</span>
                      </p>
                    ))}
                  </div>
                  {/* Cons */}
                  <div className="space-y-1 mt-1">
                    {(property?.cons ?? []).map((con: string, i: number) => (
                      <p key={i} className="text-xs flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" /> <span className='text-red-500'>{con}</span>
                      </p>
                    ))}
                  </div>

                  {/* View More — pinned to bottom, aligned across cards */}
                  <a href={property?.listingUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="mt-auto pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
