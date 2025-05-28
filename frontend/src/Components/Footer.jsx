import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () =>
{
  return (
    <footer
      style={{
        backgroundColor: '#0F68FF',
        bottom: 0,
        width: '100%',
        zIndex: 999
      }}
      className="py-3 shadow-sm"
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-white">
        {/* Sol Telif */}
        <span>&copy; {new Date().getFullYear()} Meyuco.com | Tüm hakları saklıdır.</span>

        {/* Orta Sosyal İkonlar */}
        <div className="my-2 my-md-0 d-flex align-items-center gap-3">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" title="Instagram">
            <img src="/images/instagram.ico" alt="Instagram" style={{ height: "24px", width: "24px" }} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter">
            <img src="/images/twitter.ico" alt="Twitter" style={{ height: "24px", width: "24px" }} />
          </a>
          <Link to="/" title="Anasayfa">
            <img src="/images/logo2.png" alt="Meyuco Logo" style={{ height: "50px" }} />
          </Link>
        </div>

        {/* Sayfa Linkleri */}
        <div>
          <Link to="/hakkimizda" className="text-white me-3 text-decoration-none">Hakkımızda</Link>
          <Link to="/iletisim" className="text-white text-decoration-none">İletişim</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
