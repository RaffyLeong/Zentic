"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : session?.user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-primary">
          Zentic
        </Link>

        {/* Desktop avatar / sign-in */}
        <div className="hidden md:flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <ThemeToggle />
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors bg-primary/20 text-primary hover:bg-primary/70"
              aria-label="Account menu"
            >
              {status === 'authenticated' ? initials : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              )}
            </button>

            {dropdownOpen && (
              <div className="animate-dropdown absolute right-0 mt-2 w-56 bg-card rounded-[var(--radius)] shadow-lg border border-border py-1 z-50">
                {status === 'authenticated' ? (
                  <>
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground truncate">{session?.user?.name ?? 'User'}</p>
                      <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
                    </div>
                    <Link href="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                      <User className="w-4 h-4 text-primary" /> Profile
                    </Link>
                    
                    <button
                      onClick={() => { signOut({ redirectTo: '/' }); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-primary" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-2">
          {/* Mobile - Dark Mode Toggle */}
          <div className="flex items-center justify-between px-3 py-2">
            <span className='text-sm text-[10px]'>D</span>
          </div>
          {status === 'authenticated' && (
            <>
              <Link href="/profile" onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start"><User className="w-4 h-4 mr-1" /> Profile</Button>
              </Link>
            </>
          )}
          {status === 'authenticated' ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => { signOut({ redirectTo: '/' }); setMenuOpen(false); }}
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <Button size="sm" className="w-full">Sign In</Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
