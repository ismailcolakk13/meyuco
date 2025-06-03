import Lottie from 'lottie-react';
import { useState } from 'react';
import saskinAnim from '../assets/saskin.json';
import yardımAnim from '../assets/yardim.json';

const İletisim = () =>
{
  const [form, setForm] = useState({ ad: '', email: '', mesaj: '' });
  const [gonderildi, setGonderildi] = useState(false);


  const handleChange = e =>
  {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e =>
  {
    e.preventDefault();
    setGonderildi(true);
    // Burada backend'e gönderme işlemi eklenebilir
  };

  return (
    <div className="container" style={{ height: "100%" }}>
      <div className="row justify-content-center align-items-center">
        {/* Sol: Büyük yardım animasyonu */}
        <div className="col-12 col-lg-6 d-flex justify-content-center mb-4 mb-lg-0">
          <Lottie animationData={yardımAnim} loop={true} style={{ width: "100%", maxWidth: 400, height: "auto" }} />
        </div>
        {/* Sağ: İletişim kutusu */}
        <div className="col-12 col-lg-6">
          <h2 className="mb-4 text-center d-flex justify-content-center align-items-center gap-2" style={{ fontSize: "2rem" }}>
            Sorun Mu Var?
            <span style={{ display: "inline-flex", verticalAlign: "middle" }}>
              <Lottie animationData={saskinAnim} loop={true} style={{ width: "5em", height: "5em", marginLeft: -50 }} />
            </span>
          </h2>
          <div className="card shadow-sm p-4">
            {gonderildi ? (
              <div className="alert alert-success text-center">
                Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ad" className="form-label">Adınız</label>
                  <input type="text" className="form-control" id="ad" name="ad" value={form.ad} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-posta</label>
                  <input type="email" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="mesaj" className="form-label">Mesajınız</label>
                  <textarea className="form-control" id="mesaj" name="mesaj" rows={4} value={form.mesaj} onChange={handleChange} required />
                </div>
                <button
                  type="submit"
                  className="w-100 text-white border-0"
                  style={{
                    background: "linear-gradient(135deg, #1C2D41, #18B38C)",
                    padding: "10px",
                    borderRadius: "5px",
                    fontWeight: "bold"
                  }}
                >
                  Gönder
                </button>

              </form>
            )}
          </div>
          <div className="mt-4 text-center text-muted">
            <div><strong>E-posta:</strong> info@meyuco.com</div>
            <div><strong>Telefon:</strong> 0 (555) 123 45 67</div>
            <div><strong>Adres:</strong> İstanbul, Türkiye</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default İletisim;
