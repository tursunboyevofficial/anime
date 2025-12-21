'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Bosh sahifa' },
  { href: '/anime', label: 'Anime' },
  { href: '/categories', label: 'Kategoriyalar' },
  { href: '/top', label: 'Top' },
];

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-header-bg text-header-text shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Y</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">YumeKai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-card-bg border border-card-border rounded-lg shadow-xl p-4">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Anime qidirish..."
                      className="w-full px-4 py-2 bg-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                  </form>
                  <Link
                    href="/search"
                    className="block mt-2 text-sm text-center text-muted hover:text-primary"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    Kengaytirilgan qidiruv →
                  </Link>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Kirish
              </Link>
              <Link
                href="/register"
                className="btn btn-primary text-sm"
              >
                Ro'yxatdan o'tish
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/search"
                className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Qidirish
              </Link>
              <hr className="my-2 border-white/10" />
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kirish
              </Link>
              <Link
                href="/register"
                className="mx-4 btn btn-primary text-sm text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Ro'yxatdan o'tish
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
