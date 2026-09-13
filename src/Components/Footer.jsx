import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-[#142334] via-[#1C2D41] to-[#124d49] text-slate-300 border-t border-teal-500/20 mt-auto">
      {/* Sleek subtle top accent hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#18B38C]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/deneme3.png"
              alt="Meyuco Logo"
              className="h-5 sm:h-5.5 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity drop-shadow"
            />
          </Link>
          <span className="hidden sm:inline text-slate-400 text-xs">|</span>
          <p className="text-[11px] sm:text-xs text-slate-300">
            &copy; {currentYear} <span className="text-white font-medium">Meyuco</span>. Tüm hakları saklıdır.
          </p>
        </div>

        {/* Minimalist Navigation */}
        <nav className="flex items-center gap-4 sm:gap-5 text-[11px] sm:text-xs font-medium text-slate-300">
          <Link to="/" className="hover:text-[#18B38C] transition-colors">
            Anasayfa
          </Link>
          <Link to="/hakkimizda" className="hover:text-[#18B38C] transition-colors">
            Hakkımızda
          </Link>
          <Link to="/iletisim" className="hover:text-[#18B38C] transition-colors">
            İletişim
          </Link>
        </nav>

        {/* Social Icons (Sleek SVGs) */}
        <div className="flex items-center gap-1.5">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            aria-label="Instagram"
            className="w-7 h-7 rounded-md flex items-center justify-center text-slate-300 hover:text-[#18B38C] hover:bg-white/10 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="X (Twitter)"
            aria-label="X"
            className="w-7 h-7 rounded-md flex items-center justify-center text-slate-300 hover:text-[#18B38C] hover:bg-white/10 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
