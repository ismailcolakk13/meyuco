import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Topbar from "./Components/Topbar";
import { EtkinliklerContext } from "./data/Context";
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
import { useState, useEffect } from "react";
import axios from "axios";
import { etkinlikListesi } from "./data/etkinlikler";

function App() {
  const location = useLocation();

  const hideTopbarPaths = ["/login", "/register"];
  const showTopBar = !hideTopbarPaths.includes(location.pathname);

  const [etkinlikler, setEtkinlikler] = useState([]);

  useEffect(() => {
    axios.get("/api/etkinlikler")
      .then(res => setEtkinlikler(res.data))
      .catch(err => {
        console.error("API'dan etkinlikler alınamadı, local veri kullanılacak:", err);
        setEtkinlikler(etkinlikListesi);
      });
  }, []);

  return (
    <EtkinliklerContext.Provider value={{ etkinlikler, setEtkinlikler }}>
      <div className="d-flex flex-column" style={{ backgroundColor: "whitesmoke" }}>
        {showTopBar && <Topbar />}
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
          </Routes>
        </div>
        <Footer />
      </div>
    </EtkinliklerContext.Provider>
  );
}

export default App;
