import { Suspense } from 'react';
import { SearchClient } from './_components/search-client';

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-[1200px] mx-auto px-4 py-16 text-center text-muted-foreground">Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
}
