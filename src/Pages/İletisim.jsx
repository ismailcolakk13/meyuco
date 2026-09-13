import Lottie from 'lottie-react';
import { useState } from 'react';
import saskinAnim from '../assets/saskin.json';
import yardımAnim from '../assets/yardim.json';

const Iletisim = () => {
  const [form, setForm] = useState({ ad: '', email: '', mesaj: '' });
  const [gonderildi, setGonderildi] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGonderildi(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Sol Kolon: Animasyon ve İletişim Bilgileri */}
        <div className="lg:col-span-5 flex flex-col items-center text-center lg:text-left lg:items-start space-y-6">
          <div className="w-full max-w-sm mx-auto">
            <Lottie animationData={yardımAnim} loop={true} />
          </div>

          <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Bize Ulaşın</h3>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">✉</span>
              <span>info@meyuco.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">📞</span>
              <span>0 (555) 123 45 67</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">📍</span>
              <span>İstanbul, Türkiye</span>
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Bir Sorun Mu Var?
            </h1>
            <div className="w-12 h-12 flex-shrink-0">
              <Lottie animationData={saskinAnim} loop={true} />
            </div>
          </div>

          {gonderildi ? (
            <div className="p-8 text-center rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <span className="text-4xl block">✨</span>
              <h3 className="text-lg font-bold text-emerald-800">Mesajınız Alındı!</h3>
              <p className="text-sm text-emerald-700 max-w-sm mx-auto">
                Mesajınız ekibimize başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
              </p>
              <button
                type="button"
                onClick={() => {
                  setGonderildi(false);
                  setForm({ ad: '', email: '', mesaj: '' });
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="ad" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  id="ad"
                  name="ad"
                  placeholder="Adınız Soyadınız"
                  value={form.ad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  E-posta Adresi
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  id="email"
                  name="email"
                  placeholder="ornek@mail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="mesaj" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Mesajınız
                </label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  id="mesaj"
                  name="mesaj"
                  rows={4}
                  placeholder="Bize iletmek istediğiniz mesajı buraya yazın..."
                  value={form.mesaj}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-slate-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 shadow-md hover:shadow-lg transition-all active:scale-[0.99] mt-2"
              >
                Mesajı Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Iletisim;
