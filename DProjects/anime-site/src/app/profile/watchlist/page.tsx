import Link from 'next/link';
import AnimeCard from '@/components/anime/AnimeCard';
import { animeList } from '@/lib/data';

// Demo watchlist
const watchlistAnime = animeList.slice(5, 17);

export default function WatchlistPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/profile" className="hover:text-primary">Profil</Link>
          <span>/</span>
          <span className="text-foreground">Ko'rish ro'yxati</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ko'rish Ro'yxati</h1>
            <p className="text-muted">{watchlistAnime.length} ta anime</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium whitespace-nowrap">
            Barchasi ({watchlistAnime.length})
          </button>
          <button className="px-4 py-2 bg-card-bg border border-card-border rounded-lg font-medium whitespace-nowrap hover:border-primary transition-colors">
            Ko'rmoqchiman (8)
          </button>
          <button className="px-4 py-2 bg-card-bg border border-card-border rounded-lg font-medium whitespace-nowrap hover:border-primary transition-colors">
            Ko'rayapman (4)
          </button>
          <button className="px-4 py-2 bg-card-bg border border-card-border rounded-lg font-medium whitespace-nowrap hover:border-primary transition-colors">
            To'xtatilgan (0)
          </button>
        </div>

        {/* Grid */}
        {watchlistAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlistAnime.map((anime) => (
              <div key={anime.id} className="relative group">
                <AnimeCard {...anime} />
                {/* Status dropdown trigger */}
                <button
                  className="absolute top-2 right-2 w-8 h-8 bg-secondary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title="Holatni o'zgartirish"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card-bg border border-card-border rounded-xl">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Ro'yxat bo'sh</h3>
            <p className="text-muted mb-6">
              Ko'rmoqchi bo'lgan animalaringizni ro'yxatga qo'shing
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
