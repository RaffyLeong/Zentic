"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ComparisonType, FavoriteType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { toast } from 'sonner';
import { User, Heart, BarChart3, MapPin, BedDouble, Bath, Ruler, Mail } from 'lucide-react';
import type { ReactNode } from 'react';

export function ProfileClient() {
  const router = useRouter();
  const { data: session } = useSession() || {};
  const [favorites, setFavorites] = useState<FavoriteType[]>([]);
  const [comparisons, setComparisons] = useState<ComparisonType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/user/favorites').then((r) => r.json()).catch(() => []),
      fetch('/api/user/comparisons').then((r) => r.json()).catch(() => []),
    ]).then(([favs, comps]) => {
      setFavorites(Array.isArray(favs) ? favs : []);
      setComparisons(Array.isArray(comps) ? comps : []);
      setLoading(false);
    });
  }, []);

  const removeFavorite = async (favId: string) => {
    try {
      await fetch(`/api/user/favorites/${favId}`, { method: 'DELETE' });
      setFavorites((prev) => prev.filter((f: FavoriteType) => f.id !== favId));
      toast.success('Removed from favorites');
    } catch {
      toast.error('Failed to remove');
    }
  };

  const deleteComparison = async (compId: string) => {
    try {
      await fetch(`/api/user/comparisons/${compId}`, { method: 'DELETE' });
      setComparisons((prev) => prev.filter((c: ComparisonType) => c.id !== compId));
      toast.success('Comparison deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const openComparison = (comp: ComparisonType) => {
    const ids = (comp?.items ?? []).map((item: any) => item?.propertyId).filter(Boolean);
    localStorage.setItem('zentic-compare', JSON.stringify(ids));
    router.push(`/compare?ids=${ids.join(',')}`);
  };

  const name = session?.user?.name ?? 'User';
  const email = session?.user?.email ?? '';
  const initials = session?.user?.name
    ? session.user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : email?.[0]?.toUpperCase() ?? '?';

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-center">
        <User className="w-9 h-9 text-primary mx-auto animate-bounce" />
        <p className="text-muted-foreground mt-2">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Profile header */}
      <FadeIn>
        <Card className="mb-8">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold font-display shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
                <User className="w-6 h-6 text-primary" /> {name}
              </h1>
              {email && (
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Mail className="w-4 h-4 text-primary" /> {email}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-primary" /> {favorites.length} saved</span>
                <span className="flex items-center gap-1"><BarChart3 className="w-4 h-4 text-primary" /> {comparisons.length} comparisons</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Saved Favorites */}
      <FadeIn>
        <h2 className="font-display text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" /> Saved Favorites
        </h2>
      </FadeIn>
      {favorites.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-10 h-10 text-primary" />}
          title="No saved properties yet"
          description="Browse properties and click the heart to save them here."
          ctaText="Browse Properties"
          onCta={() => router.push('/')}
        />
      ) : (
        <Stagger staggerDelay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((fav: FavoriteType) => (
              <StaggerItem key={fav.id}>
                <Card className="overflow-hidden">
                  <div className="relative aspect-[16/10] bg-muted">
                    <Image
                      src={fav?.property?.imageUrl ?? ''}
                      alt={fav?.property?.address ?? 'Property'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-display font-bold">
                      £{fav?.property?.price?.toLocaleString('en-GB') ?? '0'}
                    </p>
                    <p className="text-sm truncate flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> {fav?.property?.address ?? ''}, {fav?.property?.city ?? ''}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-primary" /> {fav?.property?.bedrooms ?? 0}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-primary" /> {fav?.property?.bathrooms ?? 0}</span>
                      <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5 text-primary" /> {fav?.property?.sqft?.toLocaleString('en-GB') ?? 0} sqft</span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => removeFavorite(fav.id)}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      )}

      {/* Saved Comparisons */}
      <FadeIn>
        <h2 className="font-display text-xl font-bold tracking-tight mb-4 mt-10 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" /> Saved Comparisons
        </h2>
      </FadeIn>
      {comparisons.length === 0 ? (
        <EmptyState
          icon={<BarChart3 className="w-10 h-10 text-primary" />}
          title="No saved comparisons"
          description="Compare properties side-by-side and save the results here."
          ctaText="Search Properties"
          onCta={() => router.push('/')}
        />
      ) : (
        <Stagger staggerDelay={0.05}>
          <div className="space-y-4">
            {comparisons.map((comp: ComparisonType) => (
              <StaggerItem key={comp.id}>
                <Card>
                  <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-display font-semibold">{comp?.name ?? 'Comparison'}</p>
                      <p className="text-sm text-muted-foreground">
                        {(comp?.items ?? []).length} properties · {new Date(comp?.createdAt ?? '').toLocaleDateString('en-GB')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => openComparison(comp)}>Re-open</Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteComparison(comp.id)}>Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  ctaText,
  onCta,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  ctaText: string;
  onCta: () => void;
}) {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-3">{icon}</div>
      <p className="font-display text-lg font-semibold mb-1">{title}</p>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <Button onClick={onCta}>{ctaText}</Button>
    </div>
  );
}
