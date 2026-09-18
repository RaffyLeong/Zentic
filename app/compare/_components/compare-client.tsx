"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PropertyType } from '@/types';
import { ComparisonTable } from '@/components/comparison-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/ui/animate';
import { toast } from 'sonner';
import Link from 'next/link';
import { BarChart3, Search, Bookmark } from 'lucide-react';

export function CompareClient() {
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveName, setSaveName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const idsParam = searchParams?.get('ids') ?? '';
    let ids = idsParam ? idsParam.split(',').filter(Boolean) : [];

    // Fallback to localStorage
    if (!ids.length) {
      try {
        const saved = localStorage.getItem('zentic-compare');
        if (saved) ids = JSON.parse(saved);
      } catch {}
    }

    if (ids.length < 2) {
      setLoading(false);
      return;
    }

    Promise.all(
      ids.map((id: string) =>
        fetch(`/api/properties/${id}`)
          .then((r) => r.json())
          .then((d: any) => (d?.error ? null : d))
          .catch(() => null)
      )
    ).then((results: any[]) => {
      setProperties(results.filter(Boolean));
      setLoading(false);
    });
  }, [searchParams]);

  const handleRemove = (id: string) => {
    setProperties((prev) => prev.filter((p: PropertyType) => p.id !== id));
    // Also update localStorage
    try {
      const saved = localStorage.getItem('zentic-compare');
      if (saved) {
        const ids = JSON.parse(saved).filter((x: string) => x !== id);
        localStorage.setItem('zentic-compare', JSON.stringify(ids));
      }
    } catch {}
  };

  const handleSave = async () => {
    if (!saveName.trim()) {
      toast.error('Enter a name for this comparison');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/user/comparisons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: saveName,
          propertyIds: properties.map((p: PropertyType) => p.id),
        }),
      });
      if (res.ok) {
        toast.success('Comparison saved!');
        setSaveName('');
      } else {
        toast.error('Failed to save comparison');
      }
    } catch {
      toast.error('Failed to save comparison');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <FadeIn>
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-primary" /> Property Comparison
          </h1>
          <p className="text-muted-foreground">
            Compare selected properties side-by-side to find the best match.
          </p>
        </div>
      </FadeIn>

      {/* save comparison - searching bar and save button */}
      {status === 'authenticated' && properties.length >= 2 && (
        <FadeIn delay={0.3}>
          <div className="mt-8 p-4 bg-muted rounded-[var(--radius-lg)] flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Save this comparison</label>
                <Input
                  placeholder="e.g. London vs Manchester homes"
                  value={saveName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveName(e.target.value)}
                />
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : (<><Bookmark className="w-4 h-4 mr-1" /> Save Comparison</>)}
            </Button>
          </div>
        </FadeIn>
        )}

      {loading ? (
        <div className="text-center py-16">
          <BarChart3 className="w-9 h-9 text-primary mx-auto animate-bounce" />
          <p className="text-muted-foreground mt-2">Loading comparison...</p>
        </div>
      ) : properties.length < 2 ? (
        <div className="text-center py-16">
          <BarChart3 className="w-10 h-10 text-primary mx-auto mb-4" />
          <p className="font-display text-lg mb-2">Not enough properties to compare</p>
          <p className="text-muted-foreground text-sm mb-6">You need at least 2 properties selected.</p>
          <Link href="/">
            <Button><Search className="w-4 h-4 mr-1" /> Go to Search</Button>
          </Link>
        </div>
      ) : (
        <>
          <ComparisonTable properties={properties} onRemove={handleRemove} />
            <div className="mt-6 text-center">
              <Link href="/">
                <Button variant="outline">← Back to Search</Button>
              </Link>
            </div>
          </>
          )}
    </div>
  );
}
