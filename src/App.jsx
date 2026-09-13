import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminRoute from "./Components/AdminRoute";
import Footer from "./Components/Footer";
import Topbar from "./Components/Topbar";
import TopbarKullanıcı from "./Components/TopbarKullanıcı";
import { EtkinliklerContext, UserContext } from "./data/Context";
import LoadingScreen from "./Components/LoadingScreen";
import AdminPanel from "./Pages/AdminPanel";
import AramaSonuclari from "./Pages/AramaSonucları";
import BiletSatinalPage from "./Pages/BiletSatinalPage";
import Detay from "./Pages/Detay";
import EtkinlikGrupPage from "./Pages/EtkinlikGrupPage";
import Hakkimizda from "./Pages/Hakkimizda";
import HomePage from "./Pages/HomePage";
import Iletisim from "./Pages/İletisim";
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
  const [loadingEtkinlikler, setLoadingEtkinlikler] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
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
    const startTime = Date.now();
    setLoadingEtkinlikler(true);
    axios.get("/api/etkinlikler")
      .then(res =>
      {
        console.log("API'dan etkinlikler alındı!");   
        setEtkinlikler(res.data);
      })
      .catch(err =>
      {
        console.error("API'dan etkinlikler alınamadı:", err);
        setEtkinlikler([]);
      })
      .finally(() =>
      {
        setLoadingEtkinlikler(false);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 450 - elapsed);
        setTimeout(() =>
        {
          setIsFadingOut(true);
          setTimeout(() =>
          {
            setInitialLoading(false);
          }, 500);
        }, remaining);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <EtkinliklerContext.Provider value={{ etkinlikler, setEtkinlikler, loading: loadingEtkinlikler }}>
        {initialLoading && <LoadingScreen isFadingOut={isFadingOut} />}
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
          {showTopBar && <Topbar />}
          {showTopBarKullanıcı && <TopbarKullanıcı />}
          <main className="flex-1 w-full">
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
              <Route path="/iletisim" element={<Iletisim />} />
              <Route path="/konserler" element={<EtkinlikGrupPage baslik="Konserler" kategori="konserler" />} />
              <Route path="/tiyatrolar" element={<EtkinlikGrupPage baslik="Tiyatrolar" kategori="tiyatrolar" />} />
              <Route path="/sporlar" element={<EtkinlikGrupPage baslik="Sporlar" kategori="sporlar" />} />
              <Route path="/sinemalar" element={<EtkinlikGrupPage baslik="Sinemalar" kategori="sinemalar" />} />
              <Route path="/unutma" element={<UnutmaPage />} />
              <Route path="/arama" element={<AramaSonuclari />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </EtkinliklerContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
