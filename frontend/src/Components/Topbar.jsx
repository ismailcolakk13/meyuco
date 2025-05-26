import React from 'react'
import { Link } from 'react-router-dom'

const Topbar = () =>
{
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
            <div className="container">
                <Link className="navbar-brand" to="/">Meyuco</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Menüyü Aç">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Sol Menü */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Anasayfa</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/hakkimizda">Hakkımızda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/iletisim">İletişim</Link>
                        </li>
                    </ul>

                    {/* Sağ Butonlar */}
                    <div className="d-flex">
                        <Link to="/login" className="btn btn-outline-light me-2">Giriş Yap</Link>
                        <Link to="/register" className="btn btn-outline-light">Kayıt Ol</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Topbar
