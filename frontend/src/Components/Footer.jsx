import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () =>
{
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1C2D41, #18B38C)",
        bottom: 0,
        width: '100%',
        zIndex: 999,
        borderTop: '1px solid black',
        borderBottom: '1px solid black'
      }}
      className="py-1 shadow-sm"
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-white">
        {/* Sol Telif */}
        <span style={{ color: "#7D969B" }}>&copy; {new Date().getFullYear()} Meyuco.com | Tüm hakları saklıdır.</span>

        {/* Orta Sosyal İkonlar */}
        <div className="my-2 my-md-0 d-flex align-items-center gap-3">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" title="Instagram">
            <img src="/images/instagram.ico" alt="Instagram" style={{ height: "24px", width: "24px" }} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter">
            <img src="/images/twitter.ico" alt="Twitter" style={{ height: "24px", width: "24px" }} />
          </a>
          <Link to="/" title="Anasayfa">
            <img src="/images/deneme3.png" alt="Meyuco Logo" style={{ height: "40px" }} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
