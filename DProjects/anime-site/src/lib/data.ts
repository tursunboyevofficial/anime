// Demo data - keyinchalik database dan olinadi

export interface Anime {
  id: number;
  title: string;
  titleOriginal?: string;
  image: string;
  banner?: string;
  rating: number;
  episodes: number;
  currentEpisode?: number;
  year: number;
  type: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  genres: string[];
  description?: string;
  studio?: string;
  duration?: string;
  season?: string;
}

export interface Episode {
  id: number;
  number: number;
  title: string;
  thumbnail?: string;
  duration: string;
  aired?: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  count: number;
  description?: string;
}

export const animeList: Anime[] = [
  {
    id: 1,
    title: 'Jujutsu Kaisen Season 2',
    titleOriginal: '呪術廻戦 懐玉・玉折/渋谷事変',
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
    rating: 8.9,
    episodes: 23,
    currentEpisode: 23,
    year: 2023,
    type: 'TV',
    status: 'Completed',
    genres: ['Action', 'Fantasy', 'School'],
    description: 'Jujutsu Kaisen ikkinchi mavsum - Gojo Satoru va Geto Suguru ning o\'tmishi, hamda Shibuya hodisasi haqida.',
    studio: 'MAPPA',
    duration: '24 min',
    season: 'Summer 2023',
  },
  {
    id: 2,
    title: 'Attack on Titan: The Final Season',
    titleOriginal: '進撃の巨人 The Final Season',
    image: 'https://cdn.myanimelist.net/images/anime/1948/120625.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1948/120625l.jpg',
    rating: 9.1,
    episodes: 16,
    currentEpisode: 16,
    year: 2023,
    type: 'TV',
    status: 'Completed',
    genres: ['Action', 'Drama', 'Fantasy', 'Mystery'],
    description: 'Attack on Titan seriyasining yakuniy qismi. Eren va uning do\'stlari orasidagi so\'nggi jang.',
    studio: 'MAPPA',
    duration: '25 min',
    season: 'Fall 2023',
  },
  {
    id: 3,
    title: 'Demon Slayer: Swordsmith Village Arc',
    titleOriginal: '鬼滅の刃 刀鍛冶の里編',
    image: 'https://cdn.myanimelist.net/images/anime/1765/135099.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1765/135099l.jpg',
    rating: 8.5,
    episodes: 11,
    currentEpisode: 11,
    year: 2023,
    type: 'TV',
    status: 'Completed',
    genres: ['Action', 'Fantasy', 'Historical'],
    description: 'Tanjiro qilichsozlar qishlog\'iga boradi va yangi dushmanlar bilan to\'qnash keladi.',
    studio: 'ufotable',
    duration: '24 min',
    season: 'Spring 2023',
  },
  {
    id: 4,
    title: 'One Piece',
    titleOriginal: 'ワンピース',
    image: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
    rating: 8.7,
    episodes: 1100,
    currentEpisode: 1100,
    year: 1999,
    type: 'TV',
    status: 'Ongoing',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    description: 'Monkey D. Luffy va uning jamoasi Pirate King bo\'lish uchun sarguzashtga chiqadi.',
    studio: 'Toei Animation',
    duration: '24 min',
    season: 'Fall 1999',
  },
  {
    id: 5,
    title: 'Frieren: Beyond Journey\'s End',
    titleOriginal: '葬送のフリーレン',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    rating: 9.2,
    episodes: 28,
    currentEpisode: 28,
    year: 2023,
    type: 'TV',
    status: 'Completed',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    description: 'Demon Lord ni mag\'lub etganidan so\'ng, elf sehrgari Frieren o\'z do\'stlarini va o\'tmishini eslaydi.',
    studio: 'Madhouse',
    duration: '24 min',
    season: 'Fall 2023',
  },
  {
    id: 6,
    title: 'Solo Leveling',
    titleOriginal: '俺だけレベルアップな件',
    image: 'https://cdn.myanimelist.net/images/anime/1929/142033.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1929/142033l.jpg',
    rating: 8.6,
    episodes: 12,
    currentEpisode: 12,
    year: 2024,
    type: 'TV',
    status: 'Completed',
    genres: ['Action', 'Adventure', 'Fantasy'],
    description: 'Sung Jinwoo - eng zaif ovchi, maxfiy dungeon dan so\'ng kuchli bo\'lib qoladi.',
    studio: 'A-1 Pictures',
    duration: '24 min',
    season: 'Winter 2024',
  },
  {
    id: 7,
    title: 'Mashle: Magic and Muscles S2',
    titleOriginal: 'マッシュル-MASHLE- 神覚者候補選抜試験編',
    image: 'https://cdn.myanimelist.net/images/anime/1369/140379.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1369/140379l.jpg',
    rating: 8.0,
    episodes: 12,
    currentEpisode: 12,
    year: 2024,
    type: 'TV',
    status: 'Completed',
    genres: ['Action', 'Comedy', 'Fantasy'],
    description: 'Mash Burnedead sehrga ega bo\'lmagan dunyoda mushak kuchi bilan yashaydi.',
    studio: 'A-1 Pictures',
    duration: '23 min',
    season: 'Winter 2024',
  },
  {
    id: 8,
    title: 'Blue Lock',
    titleOriginal: 'ブルーロック',
    image: 'https://cdn.myanimelist.net/images/anime/1258/141195.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1258/141195l.jpg',
    rating: 8.2,
    episodes: 24,
    currentEpisode: 24,
    year: 2022,
    type: 'TV',
    status: 'Completed',
    genres: ['Sports', 'Drama'],
    description: 'Yaponiya futbol jamoasi uchun eng yaxshi hujumchini topish loyihasi.',
    studio: '8bit',
    duration: '24 min',
    season: 'Fall 2022',
  },
  {
    id: 9,
    title: 'Spy x Family Season 2',
    titleOriginal: 'SPY×FAMILY Season 2',
    image: 'https://cdn.myanimelist.net/images/anime/1506/138982.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1506/138982l.jpg',
    rating: 8.4,
    episodes: 12,
    currentEpisode: 12,
    year: 2023,
    type: 'TV',
    status: 'Completed',
    genres: ['Action', 'Comedy', 'Slice of Life'],
    description: 'Josus, suiqasdchi va telepat qizdan iborat Forger oilasining sarguzashtlari davom etadi.',
    studio: 'Wit Studio',
    duration: '24 min',
    season: 'Fall 2023',
  },
  {
    id: 10,
    title: 'Dr. Stone: New World',
    titleOriginal: 'Dr.STONE NEW WORLD',
    image: 'https://cdn.myanimelist.net/images/anime/1236/138696.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1236/138696l.jpg',
    rating: 8.3,
    episodes: 22,
    currentEpisode: 22,
    year: 2023,
    type: 'TV',
    status: 'Completed',
    genres: ['Adventure', 'Comedy', 'Sci-Fi'],
    description: 'Senku va uning jamoasi tosh asridan zamonaviy texnologiyani qayta yaratishda davom etadi.',
    studio: 'TMS Entertainment',
    duration: '24 min',
    season: 'Spring 2023',
  },
  {
    id: 11,
    title: 'Oshi no Ko',
    titleOriginal: '【推しの子】',
    image: 'https://cdn.myanimelist.net/images/anime/1812/134736.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg',
    rating: 8.8,
    episodes: 11,
    currentEpisode: 11,
    year: 2023,
    type: 'TV',
    status: 'Completed',
    genres: ['Drama', 'Supernatural'],
    description: 'Shirobako bilan idol industriyasi haqida dramatik hikoya.',
    studio: 'Doga Kobo',
    duration: '24 min',
    season: 'Spring 2023',
  },
  {
    id: 12,
    title: 'Vinland Saga Season 2',
    titleOriginal: 'ヴィンランド・サガ SEASON 2',
    image: 'https://cdn.myanimelist.net/images/anime/1170/124312.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1170/124312l.jpg',
    rating: 9.0,
    episodes: 24,
    currentEpisode: 24,
    year: 2023,
    type: 'TV',
    status: 'Completed',
    genres: ['Action', 'Adventure', 'Drama', 'Historical'],
    description: 'Thorfinn qul sifatida yangi hayot boshlaydi va tinchlik yo\'lini qidiradi.',
    studio: 'MAPPA',
    duration: '24 min',
    season: 'Winter 2023',
  },
  {
    id: 13,
    title: 'Chainsaw Man',
    titleOriginal: 'チェンソーマン',
    image: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
    rating: 8.5,
    episodes: 12,
    currentEpisode: 12,
    year: 2022,
    type: 'TV',
    status: 'Completed',
    genres: ['Action', 'Fantasy', 'Horror'],
    description: 'Denji - Chainsaw Devil bilan birlashgan yigit, endi devil hunter sifatida ishlaydi.',
    studio: 'MAPPA',
    duration: '24 min',
    season: 'Fall 2022',
  },
  {
    id: 14,
    title: 'My Hero Academia Season 7',
    titleOriginal: '僕のヒーローアカデミア 7期',
    image: 'https://cdn.myanimelist.net/images/anime/1071/142615.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1071/142615l.jpg',
    rating: 8.1,
    episodes: 21,
    currentEpisode: 21,
    year: 2024,
    type: 'TV',
    status: 'Ongoing',
    genres: ['Action', 'School', 'Superhero'],
    description: 'Izuku Midoriya va qahramonlar jamiyat uchun yakuniy jangga tayyorlanadi.',
    studio: 'Bones',
    duration: '24 min',
    season: 'Spring 2024',
  },
  {
    id: 15,
    title: 'Dandadan',
    titleOriginal: 'ダンダダン',
    image: 'https://cdn.myanimelist.net/images/anime/1032/142028.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1032/142028l.jpg',
    rating: 8.7,
    episodes: 12,
    currentEpisode: 8,
    year: 2024,
    type: 'TV',
    status: 'Ongoing',
    genres: ['Action', 'Comedy', 'Supernatural'],
    description: 'Okkult va UFO ga ishonuvchi ikki o\'quvchi g\'aroyib hodisalarga duch keladi.',
    studio: 'Science SARU',
    duration: '24 min',
    season: 'Fall 2024',
  },
  {
    id: 16,
    title: 'Bocchi the Rock!',
    titleOriginal: 'ぼっち・ざ・ろっく！',
    image: 'https://cdn.myanimelist.net/images/anime/1448/127956.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1448/127956l.jpg',
    rating: 8.8,
    episodes: 12,
    currentEpisode: 12,
    year: 2022,
    type: 'TV',
    status: 'Completed',
    genres: ['Comedy', 'Music', 'Slice of Life'],
    description: 'Ijtimoiy qo\'rquvga ega gitarachi qiz rok guruhiga qo\'shiladi.',
    studio: 'CloverWorks',
    duration: '24 min',
    season: 'Fall 2022',
  },
  {
    id: 17,
    title: 'Kaguya-sama: Love Is War',
    titleOriginal: 'かぐや様は告らせたい',
    image: 'https://cdn.myanimelist.net/images/anime/1295/106551.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
    rating: 8.7,
    episodes: 12,
    currentEpisode: 12,
    year: 2019,
    type: 'TV',
    status: 'Completed',
    genres: ['Comedy', 'Romance', 'School'],
    description: 'Ikki daho o\'quvchi bir-birini sevishini tan olmaslik uchun kurashadi.',
    studio: 'A-1 Pictures',
    duration: '24 min',
    season: 'Winter 2019',
  },
  {
    id: 18,
    title: 'Mob Psycho 100',
    titleOriginal: 'モブサイコ100',
    image: 'https://cdn.myanimelist.net/images/anime/1286/110271.jpg',
    banner: 'https://cdn.myanimelist.net/images/anime/1286/110271l.jpg',
    rating: 8.6,
    episodes: 12,
    currentEpisode: 12,
    year: 2016,
    type: 'TV',
    status: 'Completed',
    genres: ['Action', 'Comedy', 'Supernatural'],
    description: 'Kuchli telekinetik qobiliyatga ega oddiy o\'quvchi Mob hayoti.',
    studio: 'Bones',
    duration: '24 min',
    season: 'Summer 2016',
  },
];

export const categories: Category[] = [
  { slug: 'action', name: 'Action', icon: '⚔️', count: 1250, description: 'Janglar va qiziqarli harakatlar bilan to\'la animalar' },
  { slug: 'romance', name: 'Romance', icon: '💕', count: 890, description: 'Sevgi va romantik munosabatlar haqida' },
  { slug: 'comedy', name: 'Comedy', icon: '😂', count: 1100, description: 'Kulgili va qiziqarli animalar' },
  { slug: 'fantasy', name: 'Fantasy', icon: '🧙', count: 950, description: 'Sehrli dunyolar va fantastik voqealar' },
  { slug: 'horror', name: 'Horror', icon: '👻', count: 320, description: 'Qo\'rqinchli va dahshatli animalar' },
  { slug: 'sci-fi', name: 'Sci-Fi', icon: '🚀', count: 480, description: 'Ilmiy fantastika va kelajak haqida' },
  { slug: 'drama', name: 'Drama', icon: '🎭', count: 750, description: 'Hayajonli va dramatik hikoyalar' },
  { slug: 'adventure', name: 'Adventure', icon: '🗺️', count: 680, description: 'Sarguzashtlar va sayohatlar' },
  { slug: 'sports', name: 'Sports', icon: '⚽', count: 290, description: 'Sport va raqobat haqida' },
  { slug: 'music', name: 'Music', icon: '🎵', count: 180, description: 'Musiqa va san\'at haqida' },
  { slug: 'slice-of-life', name: 'Slice of Life', icon: '☕', count: 520, description: 'Kundalik hayot va oddiy voqealar' },
  { slug: 'supernatural', name: 'Supernatural', icon: '👁️', count: 410, description: 'G\'ayritabiiy hodisalar va kuchlar' },
];

export const getAnimeById = (id: number): Anime | undefined => {
  return animeList.find((anime) => anime.id === id);
};

export const getAnimeByGenre = (genre: string): Anime[] => {
  return animeList.filter((anime) =>
    anime.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
  );
};

export const getEpisodes = (animeId: number): Episode[] => {
  const anime = getAnimeById(animeId);
  if (!anime) return [];

  return Array.from({ length: anime.currentEpisode || anime.episodes }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: anime.duration || '24 min',
    aired: '2023-10-01',
  }));
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};
