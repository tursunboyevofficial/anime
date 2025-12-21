'use client';

import { useState } from 'react';
import AnimeCard from '@/components/anime/AnimeCard';
import { animeList, categories } from '@/lib/data';

type SortOption = 'latest' | 'rating' | 'name' | 'year';
type StatusFilter = 'all' | 'Ongoing' | 'Completed' | 'Upcoming';

export default function AnimePage() {
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAnime = animeList
    .filter((anime) => {
      if (statusFilter !== 'all' && anime.status !== statusFilter) return false;
      if (genreFilter !== 'all' && !anime.genres.some((g) => g.toLowerCase() === genreFilter)) return false;
      if (typeFilter !== 'all' && anime.type !== typeFilter) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'year':
          return b.year - a.year;
        default:
          return b.id - a.id;
      }
    });

  const activeFiltersCount = [statusFilter, genreFilter, typeFilter].filter(f => f !== 'all').length;

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background border-b border-card-border">
        <div className="container py-12 lg:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Anime Kutubxonasi</h1>
            <p className="text-muted text-lg">
              Barcha animalarni ko'ring, filterlang va sevimlilaringizni toping
            </p>
          </div>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        {/* Filter Bar */}
        <div className="bg-card-bg border border-card-border rounded-2xl p-5 lg:p-6 mb-8 shadow-sm">
          {/* Desktop Filters */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-5">
            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-muted mb-2.5">Saralash</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full appearance-none px-4 py-3 bg-background-secondary text-foreground rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-all cursor-pointer pr-10"
                >
                  <option value="latest">Eng yangi</option>
                  <option value="rating">Reyting bo'yicha</option>
                  <option value="name">Nomi bo'yicha</option>
                  <option value="year">Yili bo'yicha</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-muted mb-2.5">Holat</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="w-full appearance-none px-4 py-3 bg-background-secondary text-foreground rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-all cursor-pointer pr-10"
                >
                  <option value="all">Barchasi</option>
                  <option value="Ongoing">Davom etmoqda</option>
                  <option value="Completed">Tugallangan</option>
                  <option value="Upcoming">Tez kunda</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-muted mb-2.5">Janr</label>
              <div className="relative">
                <select
                  value={genreFilter}
                  onChange={(e) => setGenreFilter(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-background-secondary text-foreground rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-all cursor-pointer pr-10"
                >
                  <option value="all">Barchasi</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-muted mb-2.5">Turi</label>
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-background-secondary text-foreground rounded-xl border-2 border-transparent focus:border-primary focus:outline-none transition-all cursor-pointer pr-10"
                >
                  <option value="all">Barchasi</option>
                  <option value="TV">TV</option>
                  <option value="Movie">Movie</option>
                  <option value="OVA">OVA</option>
                  <option value="ONA">ONA</option>
                  <option value="Special">Special</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Reset */}
            <div>
              <label className="block text-sm font-medium text-muted mb-2.5">&nbsp;</label>
              <button
                onClick={() => {
                  setSortBy('latest');
                  setStatusFilter('all');
                  setGenreFilter('all');
                  setTypeFilter('all');
                }}
                className="w-full px-4 py-3 bg-background-secondary hover:bg-primary-light hover:text-primary text-muted rounded-xl transition-all flex items-center justify-center gap-2 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0v2.43l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                </svg>
                Tozalash
              </button>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-background-secondary rounded-xl"
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-muted">
                  <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Filterlar</span>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-primary text-white rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 text-muted transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Mobile Filters */}
            {isFilterOpen && (
              <div className="grid grid-cols-2 gap-4 mt-4 animate-slideUp">
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">Saralash</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-3 py-2.5 bg-background-secondary text-foreground rounded-xl text-sm"
                  >
                    <option value="latest">Eng yangi</option>
                    <option value="rating">Reyting</option>
                    <option value="name">Nomi</option>
                    <option value="year">Yili</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">Holat</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    className="w-full px-3 py-2.5 bg-background-secondary text-foreground rounded-xl text-sm"
                  >
                    <option value="all">Barchasi</option>
                    <option value="Ongoing">Davom etmoqda</option>
                    <option value="Completed">Tugallangan</option>
                    <option value="Upcoming">Tez kunda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">Janr</label>
                  <select
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                    className="w-full px-3 py-2.5 bg-background-secondary text-foreground rounded-xl text-sm"
                  >
                    <option value="all">Barchasi</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">Turi</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2.5 bg-background-secondary text-foreground rounded-xl text-sm"
                  >
                    <option value="all">Barchasi</option>
                    <option value="TV">TV</option>
                    <option value="Movie">Movie</option>
                    <option value="OVA">OVA</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted">
            <span className="text-foreground font-semibold">{filteredAnime.length}</span> ta anime topildi
          </p>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted">Ko'rinish:</span>
            <div className="flex items-center bg-background-secondary rounded-lg p-1">
              <button className="p-2 rounded-md bg-card-bg shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 rounded-md text-muted hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Anime Grid */}
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 lg:gap-6">
            {filteredAnime.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card-bg rounded-2xl border border-card-border">
            <div className="w-20 h-20 bg-background-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-muted">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Hech narsa topilmadi</h3>
            <p className="text-muted mb-6">Boshqa filterlarni sinab ko'ring yoki qidiruv parametrlarini o'zgartiring</p>
            <button
              onClick={() => {
                setStatusFilter('all');
                setGenreFilter('all');
                setTypeFilter('all');
              }}
              className="btn btn-primary"
            >
              Filterlarni tozalash
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
