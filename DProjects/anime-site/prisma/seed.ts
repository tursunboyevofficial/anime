import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const genres = [
  { name: 'Action', slug: 'action', icon: '⚔️', description: 'Janglar va qiziqarli harakatlar bilan to\'la animalar' },
  { name: 'Romance', slug: 'romance', icon: '💕', description: 'Sevgi va romantik munosabatlar haqida' },
  { name: 'Comedy', slug: 'comedy', icon: '😂', description: 'Kulgili va qiziqarli animalar' },
  { name: 'Fantasy', slug: 'fantasy', icon: '🧙', description: 'Sehrli dunyolar va fantastik voqealar' },
  { name: 'Horror', slug: 'horror', icon: '👻', description: 'Qo\'rqinchli va dahshatli animalar' },
  { name: 'Sci-Fi', slug: 'sci-fi', icon: '🚀', description: 'Ilmiy fantastika va kelajak haqida' },
  { name: 'Drama', slug: 'drama', icon: '🎭', description: 'Hayajonli va dramatik hikoyalar' },
  { name: 'Adventure', slug: 'adventure', icon: '🗺️', description: 'Sarguzashtlar va sayohatlar' },
  { name: 'Sports', slug: 'sports', icon: '⚽', description: 'Sport va raqobat haqida' },
  { name: 'Music', slug: 'music', icon: '🎵', description: 'Musiqa va san\'at haqida' },
  { name: 'Slice of Life', slug: 'slice-of-life', icon: '☕', description: 'Kundalik hayot va oddiy voqealar' },
  { name: 'Supernatural', slug: 'supernatural', icon: '👁️', description: 'G\'ayritabiiy hodisalar va kuchlar' },
  { name: 'School', slug: 'school', icon: '🏫', description: 'Maktab hayoti haqida' },
  { name: 'Historical', slug: 'historical', icon: '🏯', description: 'Tarixiy voqealar asosida' },
];

const animeData = [
  {
    title: 'Jujutsu Kaisen Season 2',
    titleOriginal: '呪術廻戦 懐玉・玉折/渋谷事変',
    slug: 'jujutsu-kaisen-season-2',
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
    rating: 8.9,
    episodes: 23,
    currentEpisode: 23,
    year: 2023,
    type: 'TV',
    status: 'COMPLETED',
    genres: ['Action', 'Fantasy', 'School'],
    description: 'Jujutsu Kaisen ikkinchi mavsum - Gojo Satoru va Geto Suguru ning o\'tmishi, hamda Shibuya hodisasi haqida.',
    studio: 'MAPPA',
    duration: '24 min',
    season: 'Summer 2023',
  },
  {
    title: 'Attack on Titan: The Final Season',
    titleOriginal: '進撃の巨人 The Final Season',
    slug: 'attack-on-titan-final-season',
    image: 'https://cdn.myanimelist.net/images/anime/1948/120625.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1948/120625l.jpg',
    rating: 9.1,
    episodes: 16,
    currentEpisode: 16,
    year: 2023,
    type: 'TV',
    status: 'COMPLETED',
    genres: ['Action', 'Drama', 'Fantasy'],
    description: 'Attack on Titan seriyasining yakuniy qismi. Eren va uning do\'stlari orasidagi so\'nggi jang.',
    studio: 'MAPPA',
    duration: '25 min',
    season: 'Fall 2023',
  },
  {
    title: 'Frieren: Beyond Journey\'s End',
    titleOriginal: '葬送のフリーレン',
    slug: 'frieren',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    rating: 9.2,
    episodes: 28,
    currentEpisode: 28,
    year: 2023,
    type: 'TV',
    status: 'COMPLETED',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    description: 'Demon Lord ni mag\'lub etganidan so\'ng, elf sehrgari Frieren o\'z do\'stlarini va o\'tmishini eslaydi.',
    studio: 'Madhouse',
    duration: '24 min',
    season: 'Fall 2023',
  },
  {
    title: 'Solo Leveling',
    titleOriginal: '俺だけレベルアップな件',
    slug: 'solo-leveling',
    image: 'https://cdn.myanimelist.net/images/anime/1929/142033.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1929/142033l.jpg',
    rating: 8.6,
    episodes: 12,
    currentEpisode: 12,
    year: 2024,
    type: 'TV',
    status: 'COMPLETED',
    genres: ['Action', 'Adventure', 'Fantasy'],
    description: 'Sung Jinwoo - eng zaif ovchi, maxfiy dungeon dan so\'ng kuchli bo\'lib qoladi.',
    studio: 'A-1 Pictures',
    duration: '24 min',
    season: 'Winter 2024',
  },
  {
    title: 'One Piece',
    titleOriginal: 'ワンピース',
    slug: 'one-piece',
    image: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
    rating: 8.7,
    episodes: 1100,
    currentEpisode: 1100,
    year: 1999,
    type: 'TV',
    status: 'ONGOING',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    description: 'Monkey D. Luffy va uning jamoasi Pirate King bo\'lish uchun sarguzashtga chiqadi.',
    studio: 'Toei Animation',
    duration: '24 min',
    season: 'Fall 1999',
  },
  {
    title: 'Demon Slayer: Swordsmith Village Arc',
    titleOriginal: '鬼滅の刃 刀鍛冶の里編',
    slug: 'demon-slayer-swordsmith',
    image: 'https://cdn.myanimelist.net/images/anime/1765/135099.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1765/135099l.jpg',
    rating: 8.5,
    episodes: 11,
    currentEpisode: 11,
    year: 2023,
    type: 'TV',
    status: 'COMPLETED',
    genres: ['Action', 'Fantasy', 'Historical'],
    description: 'Tanjiro qilichsozlar qishlog\'iga boradi va yangi dushmanlar bilan to\'qnash keladi.',
    studio: 'ufotable',
    duration: '24 min',
    season: 'Spring 2023',
  },
];

async function main() {
  console.log('Seeding started...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@yumekai.uz' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@yumekai.uz',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created');

  // Create genres
  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: {},
      create: genre,
    });
  }
  console.log('Genres created');

  // Create anime
  for (const anime of animeData) {
    const { genres: animeGenres, ...animeInfo } = anime;

    const createdAnime = await prisma.anime.upsert({
      where: { slug: anime.slug },
      update: {},
      create: {
        ...animeInfo,
        type: animeInfo.type as 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'SPECIAL',
        status: animeInfo.status as 'ONGOING' | 'COMPLETED' | 'UPCOMING',
      },
    });

    // Connect genres
    for (const genreName of animeGenres) {
      const genre = await prisma.genre.findFirst({
        where: { name: genreName },
      });

      if (genre) {
        await prisma.animeGenre.upsert({
          where: {
            animeId_genreId: {
              animeId: createdAnime.id,
              genreId: genre.id,
            },
          },
          update: {},
          create: {
            animeId: createdAnime.id,
            genreId: genre.id,
          },
        });
      }
    }

    // Create episodes
    const episodeCount = Math.min(anime.currentEpisode || anime.episodes, 28);
    for (let i = 1; i <= episodeCount; i++) {
      await prisma.episode.upsert({
        where: {
          animeId_number: {
            animeId: createdAnime.id,
            number: i,
          },
        },
        update: {},
        create: {
          animeId: createdAnime.id,
          number: i,
          title: `Episode ${i}`,
          duration: anime.duration,
        },
      });
    }
  }
  console.log('Anime and episodes created');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
