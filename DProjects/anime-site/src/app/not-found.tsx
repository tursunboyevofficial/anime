import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Sahifa topilmadi</h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Bosh sahifaga qaytish
          </Link>
          <Link href="/anime" className="btn btn-secondary">
            Anime ko'rish
          </Link>
        </div>
      </div>
    </div>
  );
}
