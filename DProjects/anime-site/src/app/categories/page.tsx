import Link from 'next/link';
import { categories } from '@/lib/data';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kategoriyalar</h1>
          <p className="text-muted">Sevimli janringizni tanlang va animalarni kashf eting</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative bg-card-bg border border-card-border rounded-xl p-6 hover:border-primary transition-all overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute -right-4 -top-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
                {category.icon}
              </div>

              {/* Content */}
              <div className="relative">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted text-sm mb-3 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    <span className="font-medium text-foreground">{category.count}</span> anime
                  </span>
                  <span className="text-primary group-hover:translate-x-1 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
