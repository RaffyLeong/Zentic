"use client";

import { useMounted } from '@/components/client-only';

export function Footer() {
  const mounted = useMounted();
  const year = mounted ? new Date().getFullYear() : '2026';
  
  return (
    <footer className="border-t border-border bg-muted/50 py-8 mt-16">
      <div className="max-w-[1200px] mx-auto px-4 text-center text-sm text-muted-foreground">
        <p className="font-display font-semibold text-primary mb-1">Zentic</p>
        <p>Compare properties smarter, faster, and side-by-side.</p>
        <p className="mt-2">© {year} Zentic. All rights reserved.</p>
      </div>
    </footer>
  );
}
