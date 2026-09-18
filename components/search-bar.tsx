"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (params: { search: string }) => void;
  initialValues?: {
    search?: string;
  };
}

export function SearchBar({ onSearch, initialValues }: SearchBarProps) {
  const [search, setSearch] = useState(initialValues?.search ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ search });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2 bg-card rounded-[var(--radius)] p-2 shadow-lg border border-border">
        <Input
          placeholder="Enter a postcode, town or city..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="flex-1 border-0 shadow-none focus-visible:ring-0 text-base h-12"
        />
        <Button type="submit" className="px-8 h-12 text-base">
          Search
        </Button>
      </div>
    </form>
  );
}
