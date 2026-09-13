import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-slate-900 via-[#1C2D41] to-[#18B38C] text-white border-t border-teal-800/30 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        {/* Copyright */}
        <p className="text-slate-300 text-center sm:text-left">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Meyuco</span>. Tüm hakları saklıdır.
        </p>

        {/* Social / Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="p-1 rounded-full hover:bg-white/10 transition-transform hover:scale-110"
          >
            <img src="/images/instagram.ico" alt="Instagram" className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            className="p-1 rounded-full hover:bg-white/10 transition-transform hover:scale-110"
          >
            <img src="/images/twitter.ico" alt="Twitter" className="w-6 h-6" />
          </a>
          <Link to="/" title="Anasayfa" className="transition-transform hover:scale-105">
            <img src="/images/deneme3.png" alt="Meyuco Logo" className="h-8 w-auto object-contain" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
