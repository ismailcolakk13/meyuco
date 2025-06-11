import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminRoute from "./Components/AdminRoute";
import Footer from "./Components/Footer";
import Topbar from "./Components/Topbar";
import TopbarKullanıcı from "./Components/TopbarKullanıcı";
import { EtkinliklerContext, UserContext } from "./data/Context";
import { etkinlikListesi } from "./data/etkinlikler";
import AdminPanel from "./Pages/AdminPanel";
import AramaSonuclari from "./Pages/AramaSonucları";
import BiletSatinalPage from "./Pages/BiletSatinalPage";
import Detay from "./Pages/Detay";
import EtkinlikGrupPage from "./Pages/EtkinlikGrupPage";
import Hakkimizda from "./Pages/Hakkimizda";
import HomePage from "./Pages/HomePage";
import İletisim from "./Pages/İletisim";
import LoginPage from "./Pages/LoginPage";
import NotFound from "./Pages/NotFound";
import OdemeEkrani from "./Pages/OdemeEkrani";
import Profile from "./Pages/Profile";
import RegisterPage from "./Pages/RegisterPage";
import UnutmaPage from "./Pages/UnutmaPage";
import './style.css';
function App()
{
  const location = useLocation();
  const [etkinlikler, setEtkinlikler] = useState([]);
  // User'ı localStorage'dan yükle
  const [user, setUser] = useState(() =>
  {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // User ve token bilgisini localStorage'dan güncel tut
  useEffect(() =>
  {
    const handleStorage = () =>
    {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const hideTopbarPaths = ["/register", "/unutma"]; // login çıkarıldı
  const isHidden = hideTopbarPaths.includes(location.pathname);

  // Navbar gösterimi
  const showTopBarKullanıcı = user && !isHidden;
  const showTopBar = !user && !isHidden;

  useEffect(() =>
  {
    axios.get("/api/etkinlikler")
      .then(res =>
      {
        console.log("API'dan etkinlikler alındı!");   
        setEtkinlikler(res.data);
      })
      .catch(err =>
      {
        console.error("API'dan etkinlikler alınamadı, local veri kullanılacak:", err);
        setEtkinlikler(etkinlikListesi);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <EtkinliklerContext.Provider value={{ etkinlikler, setEtkinlikler }}>
        <div className="d-flex flex-column" style={{ backgroundColor: "whitesmoke", height: "100dvh" }}>
          {showTopBar && <Topbar />}
          {showTopBarKullanıcı && <TopbarKullanıcı />}
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              } />
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
              <Route path="/arama" element={<AramaSonuclari />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </EtkinliklerContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
