import React from 'react';

// Temel pulse kutusu
export const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-slate-200 animate-pulse rounded-xl ${className}`} />
);

// Etkinlik Kartı İskeleti (HomePage ve EtkinlikGrupPage için)
export const EventCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 p-3 flex flex-col justify-between animate-pulse">
    <div className="aspect-[3/4] w-full bg-slate-200 rounded-xl mb-3" />
    <div className="space-y-2">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-200 rounded w-1/2" />
    </div>
    <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-slate-100">
      <div className="h-7 bg-slate-200 rounded-xl" />
      <div className="h-7 bg-slate-200 rounded-xl" />
    </div>
  </div>
);

// Ana Sayfa Kategori Grubu İskeleti
export const CategoryGroupSkeleton = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between animate-pulse">
    <div>
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
        <div className="h-5 bg-slate-200 rounded w-28" />
        <div className="h-3 bg-slate-200 rounded w-14" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center p-2">
            <div className="w-24 h-32 bg-slate-200 rounded-lg mb-2" />
            <div className="h-3 bg-slate-200 rounded w-20 mb-1" />
            <div className="h-3 bg-slate-200 rounded w-12" />
          </div>
        ))}
      </div>
    </div>
    <div className="mt-4 h-9 bg-slate-200 rounded-xl w-full" />
  </div>
);

// Ana Sayfa Carousel İskeleti
export const CarouselSkeleton = () => (
  <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl bg-slate-200 animate-pulse overflow-hidden">
    <div className="absolute bottom-6 left-6 right-6 space-y-3">
      <div className="h-5 bg-slate-300 rounded-full w-24" />
      <div className="h-8 bg-slate-300 rounded w-2/3" />
      <div className="h-4 bg-slate-300 rounded w-1/3" />
    </div>
  </div>
);

// Koltuk Planı İskeleti (Bilet Satın Al Sayfası için)
export const SeatMapSkeleton = () => (
  <div className="flex flex-col items-center my-4 animate-pulse space-y-4">
    <div className="w-48 h-2.5 bg-slate-300 rounded-full mb-4" />
    <div className="space-y-2 w-full max-w-md">
      {Array.from({ length: 6 }).map((_, r) => (
        <div key={r} className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 bg-slate-200 rounded" />
          {Array.from({ length: 10 }).map((_, c) => (
            <div key={c} className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-200 rounded-lg" />
          ))}
        </div>
      ))}
    </div>
    <div className="flex justify-center gap-6 mt-6">
      <div className="w-16 h-4 bg-slate-200 rounded" />
      <div className="w-16 h-4 bg-slate-200 rounded" />
      <div className="w-16 h-4 bg-slate-200 rounded" />
    </div>
  </div>
);

// Profil Bilet İskeleti
export const TicketSkeleton = () => (
  <div className="p-5 rounded-2xl border border-slate-200 bg-white animate-pulse flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div className="space-y-2 w-full sm:w-2/3">
      <div className="h-5 bg-slate-200 rounded w-3/4" />
      <div className="h-3.5 bg-slate-200 rounded w-1/2" />
    </div>
    <div className="flex gap-2 w-full sm:w-auto">
      <div className="h-7 bg-slate-200 rounded-lg w-16" />
      <div className="h-7 bg-slate-200 rounded-lg w-24" />
    </div>
  </div>
);

// Arama Listesi İskeleti
export const SearchItemSkeleton = () => (
  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 animate-pulse flex flex-col sm:flex-row gap-5 items-start sm:items-center">
    <div className="w-full sm:w-36 h-44 sm:h-32 bg-slate-200 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2 w-full">
      <div className="h-4 bg-slate-200 rounded w-20" />
      <div className="h-5 bg-slate-200 rounded w-3/4" />
      <div className="h-3.5 bg-slate-200 rounded w-full" />
      <div className="h-3.5 bg-slate-200 rounded w-1/2" />
    </div>
    <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end gap-3 pt-3 sm:pt-0">
      <div className="h-6 bg-slate-200 rounded w-16" />
      <div className="h-8 bg-slate-200 rounded-xl w-20" />
    </div>
  </div>
);
