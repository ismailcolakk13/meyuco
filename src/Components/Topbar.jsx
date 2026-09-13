import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../data/Context';

const Topbar = () => {
    const { user, setUser } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/arama?query=${encodeURIComponent(searchTerm.trim())}`);
            setMobileMenuOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md text-slate-300 border-b border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/images/deneme3.png"
                                alt="Meyuco Logo"
                                className="h-7 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                        </Link>

                        {/* Desktop Links */}
                        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-400">
                            <Link to="/hakkimizda" className="hover:text-teal-400 transition-colors">
                                Hakkımızda
                            </Link>
                            <Link to="/iletisim" className="hover:text-teal-400 transition-colors">
                                İletişim
                            </Link>
                        </nav>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                placeholder="Etkinlik, sanatçı veya kategori arayın..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-900/90 text-slate-200 placeholder-slate-500 text-xs rounded-full pl-9 pr-4 py-2 border border-slate-800 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/60 transition-all"
                            />
                        </div>
                    </form>

                    {/* Desktop Auth / Actions */}
                    <div className="hidden md:flex items-center gap-2.5">
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 transition-colors"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 border border-slate-800 transition-all"
                                >
                                    <svg className="w-3.5 h-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>{user.name || user.username || user.email?.split('@')[0]}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                                >
                                    Çıkış
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-xs"
                            >
                                Giriş Yap
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none transition-colors"
                            aria-label="Menüyü Aç"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-800/80 flex flex-col gap-3">
                        <form onSubmit={handleSearch} className="w-full mb-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    placeholder="Etkinlik veya sanatçı arayın..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-900 text-slate-200 placeholder-slate-500 text-xs rounded-lg pl-8 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-teal-500/60"
                                />
                            </div>
                        </form>

                        <Link
                            to="/hakkimizda"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-slate-900 text-xs font-medium transition-colors"
                        >
                            Hakkımızda
                        </Link>
                        <Link
                            to="/iletisim"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-slate-900 text-xs font-medium transition-colors"
                        >
                            İletişim
                        </Link>

                        {user ? (
                            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-3 py-2 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold text-center"
                                    >
                                        Admin Paneli
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-3 py-2 rounded-lg bg-slate-900 text-slate-300 text-xs font-medium text-center border border-slate-800"
                                >
                                    Profil ({user.name || user.username || user.email})
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="px-3 py-2 rounded-lg bg-rose-950/40 text-rose-400 text-xs font-medium text-center"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 rounded-lg bg-teal-500 text-slate-950 text-xs font-semibold text-center mt-1"
                            >
                                Giriş Yap
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Sleek subtle bottom hairline accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-teal-500/25 to-transparent" />
        </header>
    );
};

export default Topbar;
