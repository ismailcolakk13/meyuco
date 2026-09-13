import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, EtkinliklerContext } from '../data/Context';
import { formatTarih } from '../data/etkinlikler';

const Topbar = () => {
    const { user, setUser } = useContext(UserContext);
    const { etkinlikler = [] } = useContext(EtkinliklerContext) || {};
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const searchContainerRef = useRef(null);
    const mobileSearchContainerRef = useRef(null);

    // Live search suggestions filtering
    const trimmed = searchTerm.trim().toLocaleLowerCase('tr-TR');
    const filteredSuggestions = trimmed
        ? etkinlikler.filter((e) => {
            const ad = (e.ad || '').toLocaleLowerCase('tr-TR');
            const mekan = (e.mekan || '').toLocaleLowerCase('tr-TR');
            const kategori = (e.kategori || '').toLocaleLowerCase('tr-TR');
            return ad.includes(trimmed) || mekan.includes(trimmed) || kategori.includes(trimmed);
        })
        : [];

    const suggestionsToShow = filteredSuggestions.slice(0, 5);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const outsideDesktop = searchContainerRef.current && !searchContainerRef.current.contains(event.target);
            const outsideMobile = mobileSearchContainerRef.current && !mobileSearchContainerRef.current.contains(event.target);
            if (outsideDesktop && outsideMobile) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectSuggestion = (etkinlik) => {
        navigate(`/detay/${etkinlik.id}`, { state: { etkinlik } });
        setShowSuggestions(false);
        setSearchTerm('');
        setMobileMenuOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/arama?query=${encodeURIComponent(searchTerm.trim())}`);
            setShowSuggestions(false);
            setMobileMenuOpen(false);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setShowSuggestions(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    // Render suggestions dropdown
    const renderSuggestionsDropdown = (isMobile = false) => {
        if (!showSuggestions || trimmed.length === 0) return null;

        return (
            <div
                className={`absolute left-0 right-0 top-full mt-2 bg-[#142334]/98 backdrop-blur-xl border border-teal-500/30 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                    isMobile ? 'max-h-72' : 'max-h-96'
                }`}
            >
                <div className="p-2 overflow-y-auto divide-y divide-slate-800/60">
                    {suggestionsToShow.length > 0 ? (
                        <>
                            <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                <span>Önerilen Etkinlikler</span>
                                <span className="text-teal-400">{filteredSuggestions.length} Sonuç</span>
                            </div>
                            {suggestionsToShow.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleSelectSuggestion(item)}
                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.ad}
                                        className="w-11 h-11 rounded-lg object-cover bg-slate-800 border border-white/10 shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4 className="text-xs font-bold text-white truncate group-hover:text-[#18B38C] transition-colors">
                                                {item.ad}
                                            </h4>
                                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-teal-500/20 text-[#18B38C] border border-teal-500/30 shrink-0">
                                                {item.kategori}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-0.5">
                                            <span className="truncate">{item.mekan} • {formatTarih(item.tarih)}</span>
                                            <span className="font-semibold text-teal-300 ml-2 shrink-0">{item.fiyat} ₺</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleSearch}
                                className="w-full mt-1 pt-2 pb-1 text-center text-xs font-semibold text-[#18B38C] hover:text-teal-200 transition-colors"
                            >
                                Tüm sonuçları gör ({filteredSuggestions.length} etkinlik) &rarr;
                            </button>
                        </>
                    ) : (
                        <div className="py-6 px-4 text-center">
                            <p className="text-xs text-slate-300 font-medium">
                                "{searchTerm}" ile ilgili etkinlik bulunamadı
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1">
                                Farklı bir etkinlik veya sanatçı adı deneyin.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-[#142334] via-[#1C2D41] to-[#124d49] text-slate-100 backdrop-blur-md border-b border-teal-500/20 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/images/deneme3.png"
                                alt="Meyuco Logo"
                                className="h-8 w-auto object-contain drop-shadow transition-transform group-hover:scale-105"
                            />
                        </Link>

                        {/* Desktop Links */}
                        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-200">
                            <Link to="/hakkimizda" className="hover:text-[#18B38C] transition-colors">
                                Hakkımızda
                            </Link>
                            <Link to="/iletisim" className="hover:text-[#18B38C] transition-colors">
                                İletişim
                            </Link>
                        </nav>
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div ref={searchContainerRef} className="hidden sm:flex flex-1 max-w-md mx-4 relative">
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-300">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    placeholder="Etkinlik, sanatçı veya kategori arayın..."
                                    value={searchTerm}
                                    onFocus={() => setShowSuggestions(true)}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') setShowSuggestions(false);
                                    }}
                                    className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-slate-300 text-xs rounded-full pl-9 pr-9 py-2 border border-white/20 focus:outline-none focus:border-[#18B38C] focus:ring-1 focus:ring-[#18B38C] transition-all"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                                        aria-label="Temizle"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </form>
                        {renderSuggestionsDropdown(false)}
                    </div>

                    {/* Desktop Auth / Actions */}
                    <div className="hidden md:flex items-center gap-2.5">
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 transition-colors"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
                                >
                                    <svg className="w-3.5 h-3.5 text-[#18B38C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>{user.name || user.username || user.email?.split('@')[0]}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 transition-colors"
                                >
                                    Çıkış
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#18B38C] hover:bg-[#159e7b] text-white transition-all shadow-sm"
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
                            className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
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
                    <div className="md:hidden py-4 border-t border-white/10 flex flex-col gap-3">
                        <div ref={mobileSearchContainerRef} className="w-full mb-1 relative">
                            <form onSubmit={handleSearch} className="w-full">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-300">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        placeholder="Etkinlik veya sanatçı arayın..."
                                        value={searchTerm}
                                        onFocus={() => setShowSuggestions(true)}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setShowSuggestions(true);
                                        }}
                                        className="w-full bg-white/10 text-white placeholder-slate-300 text-xs rounded-lg pl-8 pr-8 py-2 border border-white/20 focus:outline-none focus:border-[#18B38C]"
                                    />
                                    {searchTerm && (
                                        <button
                                            type="button"
                                            onClick={handleClearSearch}
                                            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white"
                                            aria-label="Temizle"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </form>
                            {renderSuggestionsDropdown(true)}
                        </div>

                        <Link
                            to="/hakkimizda"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors"
                        >
                            Hakkımızda
                        </Link>
                        <Link
                            to="/iletisim"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors"
                        >
                            İletişim
                        </Link>

                        {user ? (
                            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-3 py-2 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold text-center"
                                    >
                                        Admin Paneli
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-3 py-2 rounded-lg bg-white/10 text-white text-xs font-medium text-center border border-white/15"
                                >
                                    Profil ({user.name || user.username || user.email})
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="px-3 py-2 rounded-lg bg-rose-500/20 text-rose-200 text-xs font-medium text-center border border-rose-500/30"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 rounded-lg bg-[#18B38C] text-white text-xs font-semibold text-center mt-1"
                            >
                                Giriş Yap
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Sleek subtle bottom hairline accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#18B38C]/40 to-transparent" />
        </header>
    );
};

export default Topbar;
