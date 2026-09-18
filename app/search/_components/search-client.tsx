"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PropertyType } from '@/types';
import { PropertyListItem } from '@/components/property-list-item';
import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { Stagger, StaggerItem } from '@/components/ui/animate';
import { toast } from 'sonner';
import { BarChart3, Home, Search, X } from 'lucide-react';
import { FilterPanel } from '@/components/filter-panel';

export function SearchClient() {
  const router = useRouter();
  const params = useSearchParams();
  const query = params?.get('q') ?? '';
  const { status } = useSession();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: 'Any',
    radius: 'This area only',
    addedTime: 'Anytime',
    minPrice: 0,
    maxPrice: 10000000,
    beds: 0,
    baths: 0,
  })

  // update the filters in the URL when they change
  useEffect(() => {
    let active = true;
    setLoading(true);
    const sp = new URLSearchParams();
    // If query isn't empty, add search=<query> to the API request URL.
    if(query) sp.set('search', query);
    if (filters.propertyType !== 'Any') sp.set('type', filters.propertyType);
    if (filters.minPrice > 0) sp.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice < 10000000) sp.set('maxPrice', String(filters.maxPrice));
    if (filters.beds > 0) sp.set('bedrooms', String(filters.beds));
    if (filters.baths > 0) sp.set('bathrooms', String(filters.baths));
    
    fetch(`/api/properties?${sp.toString()}`)
    .then((r) => r.json())
    .then((data: any) => {
      if (active) setProperties(Array.isArray(data) ? data : []);
    })
    .catch(() => { if (active) toast.error('Failed to load properties'); })
    .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query, filters]);

    
  // Load favorites
  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/user/favorites')
        .then((r) => r.json())
        .then((data: any) => {
          if (Array.isArray(data)) {
            setFavorites(data.map((f: any) => f?.propertyId).filter(Boolean));
          }
        })
        .catch(() => { });
    }
  }, [status]);

  // Load selected from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zentic-compare');
      if (saved) setSelected(JSON.parse(saved));
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('zentic-compare', JSON.stringify(selected));
    } catch { }
  }, [selected]);

  const handleSearch = (p: { search: string }) => {
    router.push(`/search?q=${encodeURIComponent(p.search)}`);
  };

  // Select toggle
  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 5) {
        toast.error('You can compare up to 5 properties');
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  // Favorite toggle
  const toggleFavorite = async (propertyId: string) => {
    if (status !== 'authenticated') {
      toast.error('You need to log in to save favorites', {
        action: {
          label: 'Log In',
          onClick: () => router.push('/login?callbackUrl=/search'),
        },
      });
      return;
    }
    if (favorites.includes(propertyId)) {
      try {
        const res = await fetch('/api/user/favorites');
        const favs = await res.json();
        const fav = (favs ?? []).find((f: any) => f?.propertyId === propertyId);
        if (fav) {
          await fetch(`/api/user/favorites/${fav.id}`, { method: 'DELETE' });
          setFavorites((prev) => prev.filter((x) => x !== propertyId));
          toast.success('Removed from favorites');
        }
      } catch {
        toast.error('Failed to remove favorite');
      }
    } else {
      try {
        await fetch('/api/user/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ propertyId }),
        });
        setFavorites((prev) => [...prev, propertyId]);
        toast.success('Saved to favorites');
      } catch {
        toast.error('Failed to save favorite');
      }
    }
  };

  const goCompare = () => {
    router.push(`/compare?ids=${selected.join(',')}`);
  };

  return (
    <div>
      {/* Search bar strip */}
      <section className="bg-card border-b border-border mt-4">
        <div className="max-w-[1200px] mx-auto px-4">
          <SearchBar onSearch={handleSearch} initialValues={{ search: query }} />
          <div className="mt-6 bg-card rounded-lg">
            <FilterPanel onApply={(newFilters) => setFilters(newFilters)} />
          </div>
        </div>
      </section>

      {/* Compare bar */}
      {selected.length >= 2 && (
        <div className="sticky top-16 z-40 bg-primary text-primary-foreground py-3 shadow-md">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
            <p className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> {selected.length} properties selected for comparison
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={goCompare}
              className="bg-card text-primary hover:bg-card/90"
            >
              Compare Selected →
            </Button>
          </div>
        </div>
      )}

      <section className="max-w-[1200px] mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-16">
            <Home className="w-9 h-9 text-primary mx-auto animate-bounce" />
            <p className="text-muted-foreground mt-2">Searching properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-9 h-9 text-primary mx-auto mb-3" />
            <p className="text-muted-foreground">No properties found for “{query}”. Try a different location.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push('/')}>← Back to home</Button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-lg font-display font-bold text-foreground">
                  {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
                </p>
                {query && <p className="text-sm text-muted-foreground">in “{query}”</p>}
              </div>
              <div className="flex items-center gap-2">
                {compareMode && selected.length > 0 && selected.length < 2 && (
                  <p className="text-sm text-muted-foreground">Select at least 2 to compare</p>
                )}
                <Button
                  variant={compareMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCompareMode((v) => !v)}
                  className={!compareMode ? ' text-primary hover:bg-primary hover:text-white hover:border-primary' : ''}
                >
                  {compareMode ? (
                    <><X className="w-4 h-4 mr-1" /> Done comparing</>
                  ) : (
                    <><BarChart3 className="w-4 h-4 mr-1" /> Compare</>
                  )}
                </Button>
              </div>
            </div>
            <Stagger staggerDelay={0.05}>
              <div className="flex flex-col gap-4">
                {properties.map((property: PropertyType) => (
                  <StaggerItem key={property.id}>
                    <PropertyListItem
                      property={property}
                      compareMode={compareMode}
                      isSelected={selected.includes(property.id)}
                      onToggleSelect={toggleSelect}
                      isFavorited={favorites.includes(property.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </>
        )}
      </section>
    </div>
  );
}
