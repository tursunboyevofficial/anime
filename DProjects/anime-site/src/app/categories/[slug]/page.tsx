import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimeCard from '@/components/anime/AnimeCard';
import { getCategoryBySlug, getAnimeByGenre, categories } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const animeInCategory = getAnimeByGenre(category.name);
  const otherCategories = categories.filter((c) => c.slug !== slug).slice(0, 6);

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
              <p className="text-muted">{category.count} ta anime</p>
            </div>
          </div>
          {category.description && (
            <p className="text-muted max-w-2xl">{category.description}</p>
          )}
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-primary">Bosh sahifa</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-primary">Kategoriyalar</Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        {/* Anime Grid */}
        {animeInCategory.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12">
            {animeInCategory.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-12">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold mb-2">Hozircha anime yo'q</h3>
            <p className="text-muted">Bu kategoriyada animalar tez orada qo'shiladi</p>
          </div>
        )}

        {/* Other Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Boshqa Kategoriyalar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="bg-card-bg border border-card-border rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-all text-center group"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted">{cat.count} anime</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
