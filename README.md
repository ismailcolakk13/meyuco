<div align="center">

  <img src="public/images/logo2-removebg-preview.png" alt="Meyuco Logo" width="130" />

  # 🎟️ Meyuco — Etkinlik & Bilet Satış Platformu

  **Konser, tiyatro, sinema ve spor etkinliklerini keşfedin, interaktif olarak koltuğunuzu seçin ve biletinizi anında ayırtın!**

  <p align="center">
    <a href="https://meyuco.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Canlı%20Demo-meyuco.vercel.app-00C7B7?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
    <a href="https://github.com/ismailcolakk13/meyuco-backend" target="_blank">
      <img src="https://img.shields.io/badge/Backend%20Deposu-meyuco--backend-6366F1?style=for-the-badge&logo=github&logoColor=white" alt="Backend Repo" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-6.3-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/React%20Router-v7-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white" alt="Bootstrap" />
    <img src="https://img.shields.io/badge/Axios-1.9-5A29E4?style=flat-square&logo=axios&logoColor=white" alt="Axios" />
    <img src="https://img.shields.io/badge/Lisans-ISC-green?style=flat-square" alt="License" />
  </p>

  <p align="center">
    <a href="#-proje-bağlantıları">Proje Bağlantıları</a> •
    <a href="#-özellikler">Özellikler</a> •
    <a href="#-teknoloji-yığını">Teknolojiler</a> •
    <a href="#-ekranlar--sayfa-mimarisi">Sayfalar</a> •
    <a href="#-proje-dizin-yapısı">Dizin Yapısı</a> •
    <a href="#-kurulum-ve-çalıştırma">Kurulum</a> •
    <a href="#-demo-hesapları">Demo Hesaplar</a>
  </p>

</div>

---

## 🔗 Proje Bağlantıları

Bu proje iki ana depodan ve canlı bir dağıtımdan oluşmaktadır:

| Servis | Bağlantı | Açıklama |
| :--- | :--- | :--- |
| 🌐 **Canlı Demo** | [meyuco.vercel.app](https://meyuco.vercel.app/) | Vercel üzerinde barındırılan güncel canlı uygulama |
| 🎨 **Frontend Deposu** | [ismailcolakk13/meyuco](https://github.com/ismailcolakk13/meyuco) | React 19 & Vite tabanlı tek sayfalı web uygulaması |
| 🖥️ **Backend Deposu** | [ismailcolakk13/meyuco-backend](https://github.com/ismailcolakk13/meyuco-backend) | Express.js, PostgreSQL ve Görsel Tarayıcı API servisi |

---

## 🚀 Proje Hakkında

**Meyuco**, kullanıcıların kültür-sanat ve spor aktivitelerine hızlı, şeffaf ve keyifli bir şekilde erişmesini sağlayan tam kapsamlı bir etkinlik biletleme platformudur. 

Kullanıcılar konserlerden tiyatro oyunlarına, sinema filmlerinden spor müsabakalarına kadar yüzlerce etkinliği inceleyebilir, arama yapabilir, interaktif salon krokisi üzerinden diledikleri koltuğu seçebilir ve güvenli ödeme simülasyonu ile biletlerini satın alabilirler. Yöneticiler ise gelişmiş Admin Paneli üzerinden etkinlikleri yönetebilir ve satış istatistiklerini takip edebilir.

---

## ✨ Özellikler

### 🎭 Kullanıcı Deneyimi
- **Kategori Bazlı Keşif:** Konserler, Tiyatrolar, Sinemalar ve Sporlar olmak üzere 4 ana kategoride etkinlikleri filtreleme ve listeleme.
- **Anlık Arama:** Başlık, mekan veya sanatçı adına göre hızlı ve canlı arama sonuçları.
- **Detaylı Etkinlik Sayfası:** Etkinlik tarihi, saati, mekanı, bilet fiyatı ve tanıtım bilgileri.
- **İnteraktif Koltuk Seçim Sistemi:** 
  - Salon krokisi üzerinden görsel koltuk seçimi.
  - Daha önce satın alınmış dolu koltukların otomatik kilitlenmesi ve seçilememesi.
  - Seçilen koltuk adedine göre anlık toplam fiyat hesaplama.
- **Ödeme & Bilet Onayı:** Kart bilgileriyle ödeme simülasyonu ve sipariş özeti.
- **Kullanıcı Profili:** Satın alınan tüm biletlerin listesi, koltuk numaraları ve etkinlik tarihleri.
- **Yetkilendirme:** Kayıt olma (Register), giriş yapma (Login) ve Şifremi Unuttum akışları.
- **Lottie Animasyonları:** Formlarda ve etkileşim anlarında modern JSON animasyon desteği.

### 🛡️ Yönetici (Admin) Yetenekleri
- **Korumalı Rota (AdminRoute):** Yalnızca `admin` rolüne sahip kullanıcıların erişebildiği panel.
- **Etkinlik CRUD:** Yeni etkinlik ekleme, mevcut etkinliği düzenleme veya sistemden silme.
- **Sayfalama (Pagination):** Çok sayıda etkinliğin yönetici panelinde sayfa sayfa listelenmesi.
- **Bilet & Katılımcı Takibi:** Hangi kullanıcının hangi etkinlikten hangi koltukları satın aldığını inceleyebilme.

---

## 🛠️ Teknoloji Yığını

| Teknoloji | Sürüm | Kullanım Alanı |
| :--- | :--- | :--- |
| **React** | `^19.1.0` | Modern bileşen tabanlı kullanıcı arayüzü kütüphanesi |
| **Vite** | `^6.3.5` | Ultra hızlı modül paketleyici ve geliştirme sunucusu |
| **React Router DOM** | `^7.6.1` | SPA istemci taraflı rota ve gezinme yönetimi |
| **Bootstrap** | `^5.3.6` | Duyarlı (responsive) grid sistemi ve UI bileşenleri |
| **Axios** | `^1.9.0` | Backend REST API istekleri için HTTP istemcisi |
| **Lottie React** | `^2.4.1` | Zengin vektörel etkileşim animasyonları |
| **Vercel** | Platform | Frontend barındırma ve sürekli dağıtım (CI/CD) |

---

## 📱 Ekranlar & Sayfa Mimarisi

- `HomePage.jsx`: Popüler etkinlikler, kategorilere göre öne çıkanlar ve afiş vitrini.
- `EtkinlikGrupPage.jsx`: Konser, Tiyatro, Spor ve Sinema kategorilerine özel sayfalar.
- `Detay.jsx`: Etkinlik mekanı, tarihi, açıklaması ve bilet satın alma butonu.
- `BiletSatinalPage.jsx`: İnteraktif koltuk krokisi ve canlı koltuk seçimi.
- `OdemeEkrani.jsx`: Kart bilgileri girişi, sipariş özeti ve bilet onaylama.
- `Profile.jsx`: Kullanıcının sahip olduğu geçmiş ve aktif biletlerin dökümü.
- `AdminPanel.jsx`: Yönetici için etkinlik oluşturma, düzenleme ve silme formu.
- `LoginPage.jsx` & `RegisterPage.jsx`: Kimlik doğrulama ekranları.
- `UnutmaPage.jsx`: Şifre sıfırlama ekranı.
- `AramaSonucları.jsx`: Arama motoru sonuç sayfası.

---

## 📂 Proje Dizin Yapısı

```bash
meyuco/
├── public/
│   └── images/               # Logo, ikonlar ve statik görseller
├── src/
│   ├── assets/               # Lottie animasyon JSON dosyaları
│   ├── Components/
│   │   ├── AdminRoute.jsx    # Admin yetki kontrol koruması
│   │   ├── Footer.jsx        # Alt bilgi bileşeni
│   │   ├── Spinner.jsx       # Yükleme göstergesi
│   │   ├── Topbar.jsx        # Misafir kullanıcı üst menüsü
│   │   └── TopbarKullanıcı.jsx # Oturum açmış kullanıcı üst menüsü
│   ├── data/
│   │   ├── Context.jsx       # UserContext & EtkinliklerContext
│   │   └── etkinlikler.js    # Statik yedek veri & yardımcı fonksiyonlar
│   ├── Pages/                # Uygulama sayfaları (Home, Detay, Bilet, Admin...)
│   ├── App.jsx               # Ana uygulama ve rota tanımları
│   ├── main.jsx              # React DOM giriş noktası
│   └── style.css             # Özel stil tanımlamaları
├── .env.example              # Ortam değişkeni şablonu
├── vercel.json               # SPA rota yönlendirme yapılandırması
├── vite.config.js            # Vite ve API proxy ayarları
└── package.json              # Paket bağımlılıkları ve betikler
```

---

## 💻 Kurulum ve Çalıştırma

### Gereksinimler
- [Node.js](https://nodejs.org/) (v18 veya üzeri önerilir)
- [npm](https://www.npmjs.com/) veya [yarn](https://yarnpkg.com/)
- Çalışan bir [meyuco-backend](https://github.com/ismailcolakk13/meyuco-backend) servisi *(isteğe bağlı, API kapalıysa yerel yedek veriler kullanılır)*

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/ismailcolakk13/meyuco.git
cd meyuco
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
`.env.example` dosyasını `.env` olarak kopyalayın:
```bash
cp .env.example .env
```

İçeriğini backend adresinize göre düzenleyin:
```env
VITE_API_URL=http://localhost:5001
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

### 5. Canlıya Alma (Production Build)
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Hesapları

Uygulamayı test etmek için veritabanında hazır bulunan hesapları kullanabilirsiniz:

| Rol | E-posta | Şifre | Yetkiler |
| :--- | :--- | :--- | :--- |
| **Yönetici (Admin)** | `admin@meyuco.com` | `admin123` | Etkinlik ekleme/düzenleme/silme, Admin Paneli erişimi |
| **Standart Kullanıcı** | `user@meyuco.com` | `user123` | Bilet satın alma, koltuk seçimi, profil görüntüleme |

---

## 🤝 Katkıda Bulunma

1. Depoyu forklayın (`Fork`)
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Yeni özellik eklendi'`)
4. Dalınıza push yapın (`git push origin feature/harika-ozellik`)
5. Bir **Pull Request (PR)** açın

---

<div align="center">
  <sub>Meyuco Projesi • Backend servisi için <a href="https://github.com/ismailcolakk13/meyuco-backend">meyuco-backend</a> deposunu ziyaret edebilirsiniz.</sub>
</div>
