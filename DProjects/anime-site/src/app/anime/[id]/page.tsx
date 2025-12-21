import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimeCard from '@/components/anime/AnimeCard';
import { getAnimeById, getEpisodes, animeList } from '@/lib/data';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AnimeDetailPage({ params }: Props) {
  const { id } = await params;
  const anime = getAnimeById(parseInt(id));

  if (!anime) {
    notFound();
  }

  const episodes = getEpisodes(anime.id);
  const relatedAnime = animeList
    .filter((a) => a.id !== anime.id && a.genres.some((g) => anime.genres.includes(g)))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Section */}
      <div className="relative h-[350px] md:h-[450px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 blur-sm"
          style={{ backgroundImage: `url(${anime.banner || anime.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container relative -mt-56 md:-mt-64 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Poster & Quick Actions */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-6">
              {/* Poster */}
              <div className="relative mx-auto sm:mx-0 group">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-52 md:w-64 rounded-2xl shadow-2xl shadow-black/30 border-4 border-card-bg"
                />
                {/* Play overlay on hover */}
                <Link
                  href={`/anime/${anime.id}/watch/1`}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white ml-1">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* Quick Actions - Mobile/Tablet */}
              <div className="flex-1 sm:flex-initial w-full sm:w-auto lg:w-64">
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/anime/${anime.id}/watch/1`}
                    className="btn btn-primary w-full justify-center py-3.5 text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                    Ko'rishni boshlash
                  </Link>
                  <div className="flex gap-3">
                    <button className="btn btn-outline flex-1 py-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                      <span className="hidden sm:inline">Sevimli</span>
                    </button>
                    <button className="btn btn-outline flex-1 py-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span className="hidden sm:inline">Ro'yxat</span>
                    </button>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="hidden lg:block mt-6 bg-card-bg border border-card-border rounded-2xl p-5">
                  <h3 className="font-semibold mb-4 text-sm text-muted uppercase tracking-wider">Statistika</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted text-sm">Reyting</span>
                      <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-400">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold text-lg">{anime.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted text-sm">Ko'rishlar</span>
                      <span className="font-semibold">125.4K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted text-sm">Sevimlilar</span>
                      <span className="font-semibold">8.2K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-0">
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold ${
                anime.status === 'Ongoing'
                  ? 'bg-success/15 text-success'
                  : anime.status === 'Completed'
                    ? 'bg-primary/15 text-primary'
                    : 'bg-warning/15 text-warning'
              }`}>
                {anime.status === 'Ongoing' && <span className="w-2 h-2 bg-current rounded-full animate-pulse" />}
                {anime.status === 'Ongoing' ? 'Davom etmoqda' :
                 anime.status === 'Completed' ? 'Tugallangan' : 'Tez kunda'}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-sm font-medium bg-secondary text-foreground">
                {anime.type}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-sm font-medium bg-card-bg border border-card-border">
                {anime.year}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">{anime.title}</h1>
            {anime.titleOriginal && (
              <p className="text-lg text-muted mb-6">{anime.titleOriginal}</p>
            )}

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-400">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">{anime.rating}</p>
                  <p className="text-xs text-muted">Reyting</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                    <path d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0117.25 17H2.75A1.75 1.75 0 011 15.25V4.75z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">{anime.currentEpisode || anime.episodes}</p>
                  <p className="text-xs text-muted">/ {anime.episodes} qism</p>
                </div>
              </div>

              {anime.duration && (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-accent">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{anime.duration.replace(' min', '')}</p>
                    <p className="text-xs text-muted">daqiqa</p>
                  </div>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">Janrlar</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <Link
                    key={genre}
                    href={`/categories/${genre.toLowerCase()}`}
                    className="px-4 py-2 bg-card-bg border border-card-border hover:border-primary hover:text-primary hover:bg-primary/5 rounded-xl text-sm font-medium transition-all duration-200"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>

            {/* Description */}
            {anime.description && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">Tavsif</h3>
                <p className="text-foreground-secondary leading-relaxed text-base">
                  {anime.description}
                </p>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {anime.studio && (
                <div className="bg-card-bg border border-card-border rounded-xl p-4">
                  <h3 className="text-xs font-medium text-muted uppercase tracking-wider mb-1">Studiya</h3>
                  <p className="font-semibold">{anime.studio}</p>
                </div>
              )}
              {anime.season && (
                <div className="bg-card-bg border border-card-border rounded-xl p-4">
                  <h3 className="text-xs font-medium text-muted uppercase tracking-wider mb-1">Mavsum</h3>
                  <p className="font-semibold">{anime.season}</p>
                </div>
              )}
              <div className="bg-card-bg border border-card-border rounded-xl p-4">
                <h3 className="text-xs font-medium text-muted uppercase tracking-wider mb-1">Turi</h3>
                <p className="font-semibold">{anime.type}</p>
              </div>
              <div className="bg-card-bg border border-card-border rounded-xl p-4">
                <h3 className="text-xs font-medium text-muted uppercase tracking-wider mb-1">Yili</h3>
                <p className="font-semibold">{anime.year}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Epizodlar</h2>
                <p className="text-muted text-sm mt-1">{episodes.length} ta mavjud</p>
              </div>
            </div>
          </div>

          <div className="bg-card-bg border border-card-border rounded-2xl p-5 lg:p-6">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2.5">
              {episodes.map((episode) => (
                <Link
                  key={episode.id}
                  href={`/anime/${anime.id}/watch/${episode.number}`}
                  className="aspect-square bg-background-secondary hover:bg-primary hover:text-white rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                >
                  {episode.number}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Anime */}
        {relatedAnime.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">O'xshash Animalar</h2>
                  <p className="text-muted text-sm mt-1">Sizga yoqishi mumkin</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 lg:gap-6">
              {relatedAnime.map((anime) => (
                <AnimeCard key={anime.id} {...anime} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
