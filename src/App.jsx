import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Topbar from "./Components/Topbar";
import TopbarKullanıcı from "./Components/TopbarKullanıcı";
import { EtkinliklerContext, UserContext } from "./data/Context";
import { etkinlikListesi } from "./data/etkinlikler";
import AdminPanel from "./Pages/AdminPanel";
import BiletSatinalPage from "./Pages/BiletSatinalPage";
import Detay from "./Pages/Detay";
import EtkinlikGrupPage from "./Pages/EtkinlikGrupPage";
import Hakkimizda from "./Pages/Hakkimizda";
import HomePage from "./Pages/HomePage";
import İletisim from "./Pages/İletisim";
import LoginPage from "./Pages/LoginPage";
import OdemeEkrani from "./Pages/OdemeEkrani";
import Profile from "./Pages/Profile";
import RegisterPage from "./Pages/RegisterPage";
import UnutmaPage from "./Pages/UnutmaPage";
import './style.css';

function App() {
  const location = useLocation();
  const [etkinlikler, setEtkinlikler] = useState([]);
  // User'ı localStorage'dan yükle
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const hideTopbarPaths = ["/login", "/register", "/unutma"];
  const isHidden = hideTopbarPaths.includes(location.pathname);

  // Navbar gösterimi
  const showTopBarKullanıcı = user && !isHidden;
  const showTopBar = !user && !isHidden;

  useEffect(() => {
    axios.get("/api/etkinlikler")
      .then(res => {
        console.log("API'dan etkinlikler alındı!");
        setEtkinlikler(res.data);
      })
      .catch(err => {
        console.error("API'dan etkinlikler alınamadı, local veri kullanılacak:", err);
        setEtkinlikler(etkinlikListesi);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <EtkinliklerContext.Provider value={{ etkinlikler, setEtkinlikler }}>
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "whitesmoke" }}>
          {showTopBar && <Topbar />}
          {showTopBarKullanıcı && <TopbarKullanıcı />}
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bilet-satin-al/:id" element={<BiletSatinalPage />} />
              <Route path="/odeme/:id" element={<OdemeEkrani />} />
              <Route path="/detay/:id" element={<Detay />} />
              <Route path="/hakkimizda" element={<Hakkimizda />} />
              <Route path="/iletisim" element={<İletisim />} />
              <Route path="/konserler" element={<EtkinlikGrupPage baslik="Konserler" kategori="konserler" />} />
              <Route path="/tiyatrolar" element={<EtkinlikGrupPage baslik="Tiyatrolar" kategori="tiyatrolar" />} />
              <Route path="/sporlar" element={<EtkinlikGrupPage baslik="Sporlar" kategori="sporlar" />} />
              <Route path="/sinemalar" element={<EtkinlikGrupPage baslik="Sinemalar" kategori="sinemalar" />} />
              <Route path="/unutma" element={<UnutmaPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </EtkinliklerContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
