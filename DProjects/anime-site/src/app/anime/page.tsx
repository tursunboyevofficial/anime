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

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Anime Ro'yxati</h1>
          <p className="text-muted">Barcha animalarni ko'ring va filterlang</p>
        </div>

        {/* Filters */}
        <div className="bg-card-bg border border-card-border rounded-lg p-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Sort */}
            <div>
              <label className="block text-sm font-medium mb-2">Saralash</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="latest">Eng yangi</option>
                <option value="rating">Reyting bo'yicha</option>
                <option value="name">Nomi bo'yicha</option>
                <option value="year">Yili bo'yicha</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Holat</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Barchasi</option>
                <option value="Ongoing">Davom etmoqda</option>
                <option value="Completed">Tugallangan</option>
                <option value="Upcoming">Tez kunda</option>
              </select>
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Janr</label>
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Barchasi</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Turi</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Barchasi</option>
                <option value="TV">TV</option>
                <option value="Movie">Movie</option>
                <option value="OVA">OVA</option>
                <option value="ONA">ONA</option>
                <option value="Special">Special</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-muted">
          {filteredAnime.length} ta anime topildi
        </div>

        {/* Anime Grid */}
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredAnime.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Hech narsa topilmadi</h3>
            <p className="text-muted">Boshqa filterlarni sinab ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
}
