import Link from 'next/link';
import { animeList } from '@/lib/data';

export default function TopPage() {
  const topAnime = [...animeList].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Top Anime Reytinglari</h1>
          <p className="text-muted">Eng yuqori baholangan animalar ro'yxati</p>
        </div>

        {/* Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topAnime.slice(0, 3).map((anime, index) => (
            <Link
              key={anime.id}
              href={`/anime/${anime.id}`}
              className="group relative bg-card-bg border border-card-border rounded-xl overflow-hidden hover:border-primary transition-all"
            >
              {/* Medal */}
              <div className={`absolute top-4 left-4 z-10 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
                index === 0 ? 'bg-yellow-500' :
                index === 1 ? 'bg-gray-400' : 'bg-amber-700'
              } text-white shadow-lg`}>
                {index + 1}
              </div>

              {/* Image */}
              <div className="relative aspect-[3/4]">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xl font-bold text-white">{anime.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white line-clamp-2">
                    {anime.title}
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    {anime.year} • {anime.episodes} qism
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Rest of the list */}
        <div className="bg-card-bg border border-card-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Anime</th>
                <th className="px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">Turi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Epizodlar</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Reyting</th>
              </tr>
            </thead>
            <tbody>
              {topAnime.map((anime, index) => (
                <tr
                  key={anime.id}
                  className="border-t border-card-border hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className={`font-bold text-lg ${
                      index < 3 ? 'text-primary' : 'text-muted'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/anime/${anime.id}`}
                      className="flex items-center gap-4 group"
                    >
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                          {anime.title}
                        </h3>
                        <p className="text-sm text-muted">{anime.year}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="px-2 py-1 bg-secondary rounded text-sm">
                      {anime.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-muted">
                    {anime.episodes}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">{anime.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
