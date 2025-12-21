import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAnimeById, getEpisodes } from '@/lib/data';

interface Props {
  params: Promise<{ id: string; episode: string }>;
}

export default async function WatchPage({ params }: Props) {
  const { id, episode } = await params;
  const anime = getAnimeById(parseInt(id));
  const episodeNum = parseInt(episode);

  if (!anime || episodeNum < 1 || episodeNum > (anime.currentEpisode || anime.episodes)) {
    notFound();
  }

  const episodes = getEpisodes(anime.id);
  const hasPrev = episodeNum > 1;
  const hasNext = episodeNum < (anime.currentEpisode || anime.episodes);

  return (
    <div className="min-h-screen bg-black">
      {/* Video Player Section */}
      <div className="w-full">
        {/* Video Container */}
        <div className="relative aspect-video bg-gray-900 flex items-center justify-center max-w-6xl mx-auto">
          {/* Placeholder Video */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 cursor-pointer hover:bg-primary/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-primary ml-1">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-lg font-medium">{anime.title}</p>
            <p className="text-gray-400">Epizod {episodeNum}</p>
            <p className="text-sm text-gray-500 mt-4">Video player bu yerda bo'ladi</p>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-700 rounded-full mb-4 cursor-pointer group">
              <div className="h-full w-1/3 bg-primary rounded-full relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="text-white hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <button className="text-white hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                      <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                    </svg>
                  </button>
                  <div className="w-20 h-1 bg-gray-700 rounded-full">
                    <div className="h-full w-2/3 bg-white rounded-full" />
                  </div>
                </div>
                <span className="text-sm text-gray-400">08:24 / 24:00</span>
              </div>

              <div className="flex items-center gap-4">
                <button className="text-white hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 7.5H3v9h18v-9z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-white hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-white hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-3.97 3.97a.75.75 0 11-1.06-1.06l3.97-3.97h-2.69a.75.75 0 01-.75-.75zm-12 0A.75.75 0 013.75 3h4.5a.75.75 0 010 1.5H5.56l3.97 3.97a.75.75 0 01-1.06 1.06L4.5 5.56v2.69a.75.75 0 01-1.5 0v-4.5zm11.47 11.78a.75.75 0 111.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h2.69l-3.97-3.97zm-4.94-1.06a.75.75 0 010 1.06L5.56 19.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Episode Navigation */}
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between bg-gray-900">
          {hasPrev ? (
            <Link
              href={`/anime/${anime.id}/watch/${episodeNum - 1}`}
              className="flex items-center gap-2 text-white hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
              Oldingi epizod
            </Link>
          ) : (
            <div />
          )}

          <Link
            href={`/anime/${anime.id}`}
            className="text-white hover:text-primary transition-colors"
          >
            Anime sahifasiga qaytish
          </Link>

          {hasNext ? (
            <Link
              href={`/anime/${anime.id}/watch/${episodeNum + 1}`}
              className="flex items-center gap-2 text-white hover:text-primary transition-colors"
            >
              Keyingi epizod
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-card-bg rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-24 h-36 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">{anime.title}</h1>
              <p className="text-primary font-medium mb-2">Epizod {episodeNum}</p>
              <p className="text-muted text-sm line-clamp-2">{anime.description}</p>
            </div>
          </div>
        </div>

        {/* Episode List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Barcha Epizodlar</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
            {episodes.map((ep) => (
              <Link
                key={ep.id}
                href={`/anime/${anime.id}/watch/${ep.number}`}
                className={`p-3 rounded-lg text-center font-medium transition-all ${
                  ep.number === episodeNum
                    ? 'bg-primary text-white'
                    : 'bg-card-bg border border-card-border hover:border-primary hover:text-primary'
                }`}
              >
                {ep.number}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
