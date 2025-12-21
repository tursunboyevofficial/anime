import Link from 'next/link';

const footerLinks = {
  navigation: [
    { href: '/', label: 'Bosh sahifa' },
    { href: '/anime', label: 'Anime' },
    { href: '/categories', label: 'Kategoriyalar' },
    { href: '/top', label: 'Top reytinglar' },
  ],
  genres: [
    { href: '/categories/action', label: 'Action' },
    { href: '/categories/romance', label: 'Romance' },
    { href: '/categories/comedy', label: 'Comedy' },
    { href: '/categories/fantasy', label: 'Fantasy' },
  ],
  support: [
    { href: '/about', label: 'Biz haqimizda' },
    { href: '/contact', label: "Bog'lanish" },
    { href: '/faq', label: 'FAQ' },
    { href: '/privacy', label: 'Maxfiylik siyosati' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text mt-auto">
      {/* Main Footer */}
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-primary/30 transition-shadow duration-300">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">YumeKai</span>
            </Link>
            <p className="text-xs leading-relaxed text-footer-text/80 mb-4 max-w-xs">
              Eng yaxshi anime streaming platformasi. Sevimli animalaringizni
              yuqori sifatda tomosha qiling.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href="#"
                className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300"
                aria-label="Telegram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.14.121.099.154.232.17.33.015.096.034.315.019.485z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Navigatsiya
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-footer-text/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Janrlar
            </h3>
            <ul className="space-y-2">
              {footerLinks.genres.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-footer-text/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Yordam
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-footer-text/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-footer-text/60">
              &copy; {new Date().getFullYear()} YumeKai. Barcha huquqlar himoyalangan.
            </p>
            <p className="text-xs text-footer-text/60 flex items-center gap-1">
              Made with <span className="text-primary text-sm">♥</span> in Uzbekistan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
