import Link from 'next/link';
import AnimeCard from '@/components/anime/AnimeCard';
import { animeList } from '@/lib/data';

// Demo user data
const user = {
  id: 1,
  username: 'anime_fan',
  email: 'anime_fan@example.com',
  avatar: null,
  joinDate: '2024-01-15',
  stats: {
    watched: 45,
    watching: 8,
    planToWatch: 23,
    favorites: 12,
  },
};

// Demo data
const watchingAnime = animeList.filter((a) => a.status === 'Ongoing').slice(0, 4);
const recentlyWatched = animeList.slice(0, 6);

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Profile Header */}
        <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-1">{user.username}</h1>
              <p className="text-muted mb-4">{user.email}</p>
              <p className="text-sm text-muted">
                A'zo bo'lgan: {new Date(user.joinDate).toLocaleDateString('uz-UZ')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{user.stats.watched}</div>
                  <div className="text-sm text-muted">Ko'rilgan</div>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">{user.stats.watching}</div>
                  <div className="text-sm text-muted">Ko'rilmoqda</div>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">{user.stats.planToWatch}</div>
                  <div className="text-sm text-muted">Rejada</div>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">{user.stats.favorites}</div>
                  <div className="text-sm text-muted">Sevimli</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Link
                href="/profile/settings"
                className="btn btn-secondary text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                  <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Sozlamalar
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/profile/favorites"
            className="bg-card-bg border border-card-border rounded-xl p-6 hover:border-primary transition-all group"
          >
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="font-semibold group-hover:text-primary transition-colors">Sevimlilar</h3>
            <p className="text-sm text-muted">{user.stats.favorites} anime</p>
          </Link>
          <Link
            href="/profile/watchlist"
            className="bg-card-bg border border-card-border rounded-xl p-6 hover:border-primary transition-all group"
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold group-hover:text-primary transition-colors">Ko'rish ro'yxati</h3>
            <p className="text-sm text-muted">{user.stats.planToWatch} anime</p>
          </Link>
          <Link
            href="/profile/history"
            className="bg-card-bg border border-card-border rounded-xl p-6 hover:border-primary transition-all group"
          >
            <div className="text-3xl mb-3">🕐</div>
            <h3 className="font-semibold group-hover:text-primary transition-colors">Tarix</h3>
            <p className="text-sm text-muted">{user.stats.watched} anime</p>
          </Link>
          <Link
            href="/profile/settings"
            className="bg-card-bg border border-card-border rounded-xl p-6 hover:border-primary transition-all group"
          >
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="font-semibold group-hover:text-primary transition-colors">Sozlamalar</h3>
            <p className="text-sm text-muted">Profilni boshqarish</p>
          </Link>
        </div>

        {/* Currently Watching */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Hozir ko'rilmoqda</h2>
            <Link href="/profile/watching" className="text-primary hover:underline text-sm">
              Hammasini ko'rish →
            </Link>
          </div>
          {watchingAnime.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {watchingAnime.map((anime) => (
                <div key={anime.id} className="relative">
                  <AnimeCard {...anime} />
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 rounded-b-lg">
                    <div className="flex items-center justify-between text-xs text-white mb-1">
                      <span>Epizod 5/{anime.episodes}</span>
                      <span>{Math.round((5 / anime.episodes) * 100)}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(5 / anime.episodes) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card-bg border border-card-border rounded-xl">
              <div className="text-4xl mb-4">📺</div>
              <h3 className="font-semibold mb-2">Hozircha hech narsa ko'rilmayapti</h3>
              <p className="text-muted mb-4">Anime ko'rishni boshlang!</p>
              <Link href="/anime" className="btn btn-primary">
                Anime topish
              </Link>
            </div>
          )}
        </section>

        {/* Recently Watched */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">So'nggi ko'rilganlar</h2>
            <Link href="/profile/history" className="text-primary hover:underline text-sm">
              Hammasini ko'rish →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyWatched.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
