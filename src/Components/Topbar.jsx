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
        <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-[#1C2D41] to-[#18B38C] text-white shadow-lg border-b border-teal-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/images/deneme3.png"
                                alt="Meyuco Logo"
                                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>

                        {/* Desktop Links */}
                        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                            <Link to="/hakkimizda" className="text-slate-200 hover:text-white transition-colors">
                                Hakkımızda
                            </Link>
                            <Link to="/iletisim" className="text-slate-200 hover:text-white transition-colors">
                                İletişim
                            </Link>
                        </nav>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <input
                                type="search"
                                placeholder="Etkinlik, Sanatçı ya da Konser Arayın"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/15 text-white placeholder-slate-300 text-sm rounded-full pl-4 pr-10 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white/25 transition-all"
                            />
                            <button
                                type="submit"
                                aria-label="Ara"
                                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-200 hover:text-white rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Desktop Auth / Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 transition-colors shadow-sm"
                                    >
                                        Admin Paneli
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>{user.name || user.username || user.email?.split('@')[0]}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors"
                                >
                                    Çıkış
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium rounded-full bg-white text-slate-900 hover:bg-teal-50 transition-all shadow-sm"
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
                            className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
                            aria-label="Menüyü Aç"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/10 flex flex-col gap-3">
                        <form onSubmit={handleSearch} className="w-full mb-2">
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Etkinlik, Sanatçı ya da Konser Arayın"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/15 text-white placeholder-slate-300 text-sm rounded-lg pl-3 pr-9 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        <Link
                            to="/hakkimizda"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white text-sm font-medium"
                        >
                            Hakkımızda
                        </Link>
                        <Link
                            to="/iletisim"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white text-sm font-medium"
                        >
                            İletişim
                        </Link>

                        {user ? (
                            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-3 py-2 rounded-lg bg-amber-500 text-slate-900 text-sm font-semibold text-center"
                                    >
                                        Admin Paneli
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-3 py-2 rounded-lg bg-white/10 text-white text-sm font-medium text-center"
                                >
                                    Profil ({user.name || user.username || user.email})
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="px-3 py-2 rounded-lg bg-rose-600/80 text-white text-sm font-medium text-center"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium text-center mt-2"
                            >
                                Giriş Yap
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Topbar;
