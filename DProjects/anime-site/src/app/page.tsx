import AnimeCard from '@/components/anime/AnimeCard';
import Link from 'next/link';
import { animeList, categories } from '@/lib/data';

// Get data from lib
const trendingAnime = animeList.slice(0, 6);
const latestEpisodes = animeList.slice(6, 12);
const featuredAnime = animeList.find((a) => a.id === 5) || animeList[0];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${featuredAnime.banner || featuredAnime.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="container relative h-full flex items-center">
          <div className="max-w-xl">
            <span className="inline-block bg-primary px-3 py-1 rounded text-sm font-medium text-white mb-4">
              #1 Trending
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {featuredAnime.title}
            </h1>
            <p className="text-white/80 text-lg mb-6 line-clamp-3">
              {featuredAnime.description}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-white">{featuredAnime.rating}</span>
              </div>
              <span className="text-white/60">|</span>
              <span className="text-white/80">{featuredAnime.episodes} qism</span>
              <span className="text-white/60">|</span>
              <span className="text-white/80">{featuredAnime.year}</span>
            </div>
            <div className="flex gap-4">
              <Link
                href={`/anime/${featuredAnime.id}/watch/1`}
                className="btn btn-primary text-base px-6 py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
                Ko'rish
              </Link>
              <Link
                href={`/anime/${featuredAnime.id}`}
                className="btn btn-secondary text-base px-6 py-3"
              >
                Batafsil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Trending Anime</h2>
            <Link
              href="/anime?sort=trending"
              className="text-primary hover:underline text-sm font-medium"
            >
              Hammasini ko'rish →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingAnime.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Episodes Section */}
      <section className="py-12 bg-card-bg/50">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Yangi Epizodlar</h2>
            <Link
              href="/anime?sort=latest"
              className="text-primary hover:underline text-sm font-medium"
            >
              Hammasini ko'rish →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {latestEpisodes.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Mashhur Janrlar</h2>
            <Link
              href="/categories"
              className="text-primary hover:underline text-sm font-medium"
            >
              Hammasini ko'rish →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((genre) => (
              <Link
                key={genre.slug}
                href={`/categories/${genre.slug}`}
                className="bg-card-bg border border-card-border rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="text-3xl mb-2 p-2">{genre.icon}</div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <p className="text-sm text-muted">{genre.count} anime</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hisob ochib, ko'proq imkoniyatlarga ega bo'ling!
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Ro'yxatdan o'ting va sevimli animalaringizni saqlang, izlash ro'yxati yarating,
            boshqa foydalanuvchilar bilan muloqot qiling.
          </p>
          <Link
            href="/register"
            className="btn bg-white text-primary hover:bg-white/90 text-base px-8 py-3"
          >
            Bepul ro'yxatdan o'tish
          </Link>
        </div>
      </section>
    </div>
  );
}
