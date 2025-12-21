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
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-[300px] md:h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${anime.banner || anime.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative -mt-32 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-48 md:w-64 rounded-lg shadow-2xl mx-auto md:mx-0"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                anime.status === 'Ongoing' ? 'bg-green-500' :
                anime.status === 'Completed' ? 'bg-blue-500' : 'bg-yellow-500'
              } text-white`}>
                {anime.status === 'Ongoing' ? 'Davom etmoqda' :
                 anime.status === 'Completed' ? 'Tugallangan' : 'Tez kunda'}
              </span>
              <span className="px-3 py-1 rounded text-sm font-medium bg-secondary text-foreground">
                {anime.type}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">{anime.title}</h1>
            {anime.titleOriginal && (
              <p className="text-muted mb-4">{anime.titleOriginal}</p>
            )}

            {/* Rating & Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                  <span className="text-2xl font-bold">{anime.rating}</span>
                </div>
              </div>
              <div className="text-muted">
                <span className="font-medium text-foreground">{anime.episodes}</span> qism
              </div>
              <div className="text-muted">
                <span className="font-medium text-foreground">{anime.year}</span>
              </div>
              {anime.duration && (
                <div className="text-muted">
                  <span className="font-medium text-foreground">{anime.duration}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href={`/anime/${anime.id}/watch/1`}
                className="btn btn-primary text-base px-8 py-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
                Ko'rishni boshlash
              </Link>
              <button className="btn btn-secondary text-base px-6 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                Sevimlilarga
              </button>
              <button className="btn btn-secondary text-base px-6 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Ro'yxatga
              </button>
            </div>

            {/* Genres */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted mb-2">Janrlar</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <Link
                    key={genre}
                    href={`/categories/${genre.toLowerCase()}`}
                    className="px-3 py-1 bg-secondary hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {anime.studio && (
                <div>
                  <h3 className="text-sm font-medium text-muted">Studiya</h3>
                  <p className="font-medium">{anime.studio}</p>
                </div>
              )}
              {anime.season && (
                <div>
                  <h3 className="text-sm font-medium text-muted">Mavsum</h3>
                  <p className="font-medium">{anime.season}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-muted">Turi</h3>
                <p className="font-medium">{anime.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted">Epizodlar</h3>
                <p className="font-medium">{anime.currentEpisode || anime.episodes} / {anime.episodes}</p>
              </div>
            </div>

            {/* Description */}
            {anime.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tavsif</h3>
                <p className="text-muted leading-relaxed">{anime.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Episodes */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Epizodlar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/anime/${anime.id}/watch/${episode.number}`}
                className="bg-card-bg border border-card-border rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-all text-center group"
              >
                <div className="text-2xl font-bold text-primary mb-1">{episode.number}</div>
                <div className="text-xs text-muted">Epizod</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Anime */}
        {relatedAnime.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">O'xshash Animalar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
