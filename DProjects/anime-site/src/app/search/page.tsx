'use client';

import { useState, useMemo } from 'react';
import AnimeCard from '@/components/anime/AnimeCard';
import { animeList } from '@/lib/data';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return animeList.filter(
      (anime) =>
        anime.title.toLowerCase().includes(searchTerm) ||
        anime.titleOriginal?.toLowerCase().includes(searchTerm) ||
        anime.genres.some((g) => g.toLowerCase().includes(searchTerm)) ||
        anime.studio?.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-center mb-6">Anime Qidirish</h1>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Anime nomi, janr yoki studiya..."
              className="w-full px-6 py-4 pl-14 text-lg bg-card-bg border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {query.trim() ? (
          <>
            <div className="mb-6">
              <p className="text-muted">
                <span className="font-medium text-foreground">{searchResults.length}</span> ta natija
                &quot;<span className="text-primary">{query}</span>&quot; uchun
              </p>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map((anime) => (
                  <AnimeCard key={anime.id} {...anime} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Hech narsa topilmadi</h3>
                <p className="text-muted">Boshqa so'z bilan qidirib ko'ring</p>
              </div>
            )}
          </>
        ) : (
          /* Popular Searches */
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6">Mashhur qidiruvlar</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Action', 'Romance', 'Fantasy', 'Comedy', 'MAPPA', 'ufotable', 'One Piece', 'Jujutsu'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-card-bg border border-card-border rounded-full hover:border-primary hover:text-primary transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>

            {/* Recent Anime */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6">So'nggi qo'shilgan</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {animeList.slice(0, 6).map((anime) => (
                  <AnimeCard key={anime.id} {...anime} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
