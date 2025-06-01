import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../data/Context';

const Topbar = () =>
{
    const { user, setUser } = useContext(UserContext);

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark shadow-sm"
            style={{
                top: 0,
                zIndex: 100,
                background: "linear-gradient(135deg, #1C2D41, #18B38C)",
                borderBottom: '1px solid black'
            }}
        >
            <div
                className="container"
                style={{
                    maxWidth: "1140px",
                    paddingLeft: "16px",
                    paddingRight: "16px"
                }}
            >
                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/images/deneme3.png"
                        alt="Meyuco Logo"
                        style={{
                            height: "40px",
                            objectFit: "contain",
                            maxHeight: "64px",
                            marginRight: "8px"
                        }}
                    />
                </Link>

                {/* Hamburger Menü (Mobil) */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Menüyü Aç"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menü İçeriği */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Sol Menü */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/">Anasayfa</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/hakkimizda">Hakkımızda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/iletisim">İletişim</Link>
                        </li>
                    </ul>

                    {/* Arama Çubuğu */}
                    <form className="d-flex ms-3" style={{ minWidth: '330px', flex: 1, maxWidth: '357px' }}>
                        <input
                            className="form-control flex-grow-1 me-2"
                            type="search"
                            placeholder="Etkinlik, Sanatçı ya da Konser Arayın"
                            aria-label="Search"
                            style={{ minWidth: '250px', fontSize: "14px" }}
                        />
                        <button className="btn btn-outline-light d-flex align-items-center me-2" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                            </svg>
                        </button>
                    </form>

                    {/* Sağ Butonlar */}
                    <div className="d-flex align-items-center">
                        {user ? (
                            <>
                                <Link to="/profile" className="btn btn-outline-light me-2" style={{ fontSize: "14px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-circle me-1" viewBox="0 0 16 16">
                                        <path d="M13.468 12.37C12.758 11.226 11.482 10.5 10 10.5c-1.482 0-2.758.726-3.468 1.87A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                        <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 8A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    </svg>
                                    {user.name || user.username || user.email}
                                </Link>
                                <button className="btn btn-outline-light btn-danger me-2" style={{ fontSize: "14px" }} onClick={() => setUser(null)}>Çıkış</button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-outline-light me-2" style={{ fontSize: "14px" }}>Giriş Yap</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;
