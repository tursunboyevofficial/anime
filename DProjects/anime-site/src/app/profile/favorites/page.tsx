import Link from 'next/link';
import AnimeCard from '@/components/anime/AnimeCard';
import { animeList } from '@/lib/data';

// Demo favorites
const favoriteAnime = animeList.slice(0, 12);

export default function FavoritesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/profile" className="hover:text-primary">Profil</Link>
          <span>/</span>
          <span className="text-foreground">Sevimlilar</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sevimli Animalar</h1>
            <p className="text-muted">{favoriteAnime.length} ta anime</p>
          </div>
        </div>

        {/* Grid */}
        {favoriteAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {favoriteAnime.map((anime) => (
              <div key={anime.id} className="relative group">
                <AnimeCard {...anime} />
                {/* Remove button */}
                <button
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title="Sevimlilardan o'chirish"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card-bg border border-card-border rounded-xl">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-2">Sevimlilar bo'sh</h3>
            <p className="text-muted mb-6">
              Animalarni sevimlilar ro'yxatiga qo'shing va ularni bu yerda ko'ring
            </p>
            <Link href="/anime" className="btn btn-primary">
              Anime topish
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
