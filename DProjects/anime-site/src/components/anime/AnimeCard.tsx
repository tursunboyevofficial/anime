import Link from 'next/link';

interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  rating?: number;
  episodes?: number;
  year?: number;
  type?: string;
}

export default function AnimeCard({
  id,
  title,
  image,
  rating,
  episodes,
  year,
  type,
}: AnimeCardProps) {
  return (
    <Link href={`/anime/${id}`} className="group block">
      {/* Card - faqat rasm uchun */}
      <div className="card">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Rating Badge */}
          {rating && (
            <div className="absolute top-1.5 left-1.5 bg-black/70 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white flex items-center gap-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-2.5 h-2.5 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clipRule="evenodd"
                />
              </svg>
              {rating.toFixed(1)}
            </div>
          )}

          {/* Type Badge */}
          {type && (
            <div className="absolute top-1.5 right-1.5 bg-primary px-1.5 py-0.5 rounded text-[9px] font-medium text-white">
              {type}
            </div>
          )}
        </div>
      </div>

      {/* Info - card tashqarisida */}
      <div className="mt-2 px-1">
        <h3 className="text-[11px] font-medium line-clamp-1 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-[10px] text-muted">
          {year && <span>{year}</span>}
          {year && episodes && <span>•</span>}
          {episodes && <span>{episodes} qism</span>}
        </div>
      </div>
    </Link>
  );
}
