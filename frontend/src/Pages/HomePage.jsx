import React from 'react'
import { Link } from "react-router-dom";
// Örnek popüler etkinlikler (görselleri kendi projene göre değiştir)
const populerEtkinlikler = [
  { id: 1, ad: "Konser A", img: "https://placehold.co/300x200?text=Konser+A" },
  { id: 2, ad: "Tiyatro B", img: "https://placehold.co/300x200?text=Tiyatro+B" },
  { id: 3, ad: "Spor C", img: "https://placehold.co/300x200?text=Spor+C" },
]

// Her etkinliğe resim ekleyin
const konserler = [
  { id: 1, ad: "Konser X", img: "https://placehold.co/300x200?text=Konser+X" },
  { id: 2, ad: "Konser Y", img: "https://placehold.co/300x200?text=Konser+Y" },
]
const tiyatrolar = [
  { id: 1, ad: "Tiyatro X", img: "https://placehold.co/300x200?text=Tiyatro+X" },
  { id: 2, ad: "Tiyatro Y", img: "https://placehold.co/300x200?text=Tiyatro+Y" },
]
const sporlar = [
  { id: 1, ad: "Spor X", img: "https://placehold.co/300x200?text=Spor+X" },
  { id: 2, ad: "Spor Y", img: "https://placehold.co/300x200?text=Spor+Y" },
]
const sinemalar = [
  { id: 1, ad: "Sinema X", img: "https://placehold.co/300x200?text=Sinema+X" },
  { id: 2, ad: "Sinema Y", img: "https://placehold.co/300x200?text=Sinema+Y" },
]

const etkinlikKart = (etkinlik) => (
  <div key={etkinlik.id} className="col-6 col-md-4 col-lg-3 d-flex flex-column align-items-center mb-4">
    <img
      src={etkinlik.img}
      alt={etkinlik.ad}
      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee', background: '#fff' }}
    />
    <span className="mt-2 text-center">{etkinlik.ad}</span>
  </div>
)

const HomePage = () => {
  return (
    <div className='container'>
      <div className="my-4">
        <h1>Öne Çıkanlar</h1>
        {/* Bootstrap Carousel */}
        <div id="populerCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {populerEtkinlikler.map((etkinlik, idx) => (
              <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={etkinlik.id}>
                <img src={etkinlik.img} className="d-block w-100 rounded" alt={etkinlik.ad} style={{maxHeight: 350, objectFit: 'cover'}} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{etkinlik.ad}</h5>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#populerCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Önceki</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#populerCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Sonraki</span>
          </button>
        </div>
      </div>

      {/* 2x2 Grid: Konserler, Tiyatro, Spor, Sinema */}
      <div className="row g-4 my-4">
        <div className="col-12 col-md-6">
          <Link to="/Konserler" className="text-decoration-none text-dark">
            <div className="border rounded p-3 h-100 d-flex flex-column">
              <h2 className="mb-3">Konserler</h2>
              <div className="row">
                {konserler.map(etkinlikKart)}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12 col-md-6">
          <div className="border rounded p-3 h-100 d-flex flex-column">
            <h2 className="mb-3">Tiyatro</h2>
            <div className="row">
              {tiyatrolar.map(etkinlikKart)}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="border rounded p-3 h-100 d-flex flex-column">
            <h2 className="mb-3">Spor</h2>
            <div className="row">
              {sporlar.map(etkinlikKart)}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="border rounded p-3 h-100 d-flex flex-column">
            <h2 className="mb-3">Sinema</h2>
            <div className="row">
              {sinemalar.map(etkinlikKart)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage