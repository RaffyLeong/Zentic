"use client";

import { useRouter } from 'next/navigation';
import { SearchBar } from '@/components/search-bar';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { Search, Home, BarChart3, MapPin } from 'lucide-react';

export function HomeClient() {
  const router = useRouter();

  const handleSearch = (params: { search: string }) => {
    router.push(`/search?q=${encodeURIComponent(params.search)}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
                Find your next <span className="text-primary">Home</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Search thousands of properties. Discover homes that match what you’re looking for.
              </p>
            </div>
          </FadeIn>
          <SlideIn from="bottom" delay={0.2}>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <IntroContent />
      </section>
    </div>
  );
}

function IntroContent() {
  const steps = [
    { icon: Search, title: 'Search', desc: 'Enter a postcode, town or city to find homes available in that area.' },
    { icon: Home, title: 'Browse', desc: 'Explore detailed listings with prices, photos, bedrooms and key highlights.' },
    { icon: BarChart3, title: 'Compare', desc: 'Shortlist properties and compare them side-by-side to make the right choice.' },
  ];
  const popular = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Oxford'];
  return (
    <div className="py-6">
      <FadeIn>
        <h2 className="text-center font-display text-2xl font-bold text-foreground mb-2">How Zentic works</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Finding the right home starts with a simple search.
        </p>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-card rounded-[var(--radius)] border border-border p-6 text-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-3">Popular locations</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popular.map((p) => (
            <a key={p} href={`/search?q=${encodeURIComponent(p)}`} className="text-sm bg-secondary/15 text-primary px-3 py-1 rounded-full hover:bg-secondary/25 transition-colors flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {p}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
