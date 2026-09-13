import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-slate-900 via-[#1C2D41] to-[#18B38C] text-white">
      <span className="text-8xl sm:text-9xl font-black tracking-widest text-teal-400/80 drop-shadow-lg">
        404
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold mt-4">Sayfa Bulunamadı</h1>
      <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-md">
        Aradığınız sayfa mevcut değil, taşınmış veya kaldırılmış olabilir.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 rounded-2xl bg-white text-slate-900 font-bold text-sm hover:bg-teal-50 shadow-lg transition-all"
      >
        Anasayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
