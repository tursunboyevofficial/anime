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
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${featuredAnime.banner || featuredAnime.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="container relative h-full flex items-center">
          <div className="max-w-2xl animate-slideUp">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg shadow-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                </svg>
                #1 Trending
              </span>
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80">
                {featuredAnime.type}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              {featuredAnime.title}
            </h1>

            <p className="text-white/70 text-lg mb-8 line-clamp-3 leading-relaxed">
              {featuredAnime.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-bold text-xl text-white">{featuredAnime.rating}</span>
                </div>
              </div>

              <div className="h-5 w-px bg-white/20" />

              <div className="flex items-center gap-2 text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0117.25 17H2.75A1.75 1.75 0 011 15.25V4.75z" />
                </svg>
                <span>{featuredAnime.episodes} qism</span>
              </div>

              <div className="h-5 w-px bg-white/20" />

              <div className="flex items-center gap-2 text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                </svg>
                <span>{featuredAnime.year}</span>
              </div>

              {featuredAnime.studio && (
                <>
                  <div className="h-5 w-px bg-white/20" />
                  <div className="flex items-center gap-2 text-white/70">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4 16.5v-13h-.25a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5H16v13h.25a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v2.5a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5H4zm3-11a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM7.5 9a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM11 5.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm.5 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1z" clipRule="evenodd" />
                    </svg>
                    <span>{featuredAnime.studio}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/anime/${featuredAnime.id}/watch/1`}
                className="btn btn-primary btn-lg group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
                Ko'rishni boshlash
              </Link>
              <Link
                href={`/anime/${featuredAnime.id}`}
                className="btn btn-lg bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                Batafsil ma'lumot
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-white/50">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-5 lg:py-6">
        <div className="container">
          <div className="flex items-center justify-between mb-3 mt-1">
            <h2 className="text-xs md:text-sm font-semibold">Yangi Epizodlar</h2>
            <Link
              href="/anime?sort=trending"
              className="text-primary hover:text-primary-hover text-[10px] font-medium transition-colors"
            >
              Hammasini ko'rish →
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-2 sm:gap-3">
            {trendingAnime.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Episodes Section */}
      <section className="py-5 lg:py-6 bg-background-secondary">
        <div className="container">
          <div className="flex items-center justify-between mb-3 mt-1">
            <h2 className="text-xs md:text-sm font-semibold">Yangi Epizodlar</h2>
            <Link
              href="/anime?sort=latest"
              className="text-primary hover:text-primary-hover text-[10px] font-medium transition-colors"
            >
              Hammasini ko'rish →
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-2 sm:gap-3">
            {latestEpisodes.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5 lg:py-6">
        <div className="container">
          <div className="flex items-center justify-between mb-3 mt-1">
            <h2 className="text-xs md:text-sm font-semibold">Mashhur Janrlar</h2>
            <Link
              href="/categories"
              className="text-primary hover:text-primary-hover text-[10px] font-medium transition-colors"
            >
              Hammasini ko'rish →
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2">
            {categories.slice(0, 6).map((genre) => (
              <Link
                key={genre.slug}
                href={`/categories/${genre.slug}`}
                className="group bg-card-bg border border-card-border rounded-md p-2 hover:border-primary/50 transition-all"
              >
                <div className="text-base mb-0.5">{genre.icon}</div>
                <h3 className="font-medium text-[10px] group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <p className="text-[8px] text-muted">{genre.count} anime</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 lg:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />

        <div className="container relative text-center">
          <h2 className="text-sm md:text-base font-semibold text-white mb-1.5">
            Hisob ochib, ko'proq imkoniyatlarga ega bo'ling!
          </h2>
          <p className="text-white/80 text-[10px] mb-3 max-w-sm mx-auto">
            Ro'yxatdan o'ting va sevimli animalaringizni saqlang.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-primary hover:bg-white/90 text-[10px] font-medium px-3 py-1.5 rounded transition-colors"
          >
            Bepul ro'yxatdan o'tish
          </Link>
        </div>
      </section>
    </div>
  );
}
