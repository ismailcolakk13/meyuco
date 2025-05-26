import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border text-secondary py-3 mt-auto shadow-sm h-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span>&copy; {new Date().getFullYear()} Meyuco.com | Tüm hakları saklıdır.</span>
        <div>
          <Link to="/hakkimizda" className="text-secondary me-3 text-decoration-none">Hakkımızda</Link>
          <Link to="/iletisim" className="text-secondary text-decoration-none">İletişim</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer