import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Topbar from "./Components/Topbar";
import { etkinlikler, fetchEtkinlikler } from "./data/etkinlikler";
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
import { useEffect } from "react";
import { useState } from "react";


function App()
{
  const location = useLocation();

  const hideTopbarPaths = ["/login", "/register"];
  const showTopBar = !hideTopbarPaths.includes(location.pathname);

  const [etkinlikler, setEtkinlikler] = useState([]);

  useEffect(() => {
    fetchEtkinlikler().then(setEtkinlikler);
  }, []);

  return (
    <div className="d-flex flex-column" style={{backgroundColor:"whitesmoke"}}>
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
          <Route
            path="/konserler"
            element={
              <EtkinlikGrupPage baslik={"Konserler"} etkinlikler={etkinlikler.filter((e) => e.kategori === "konserler")} />
            }
          />
          <Route
            path="/tiyatrolar"
            element={
              <EtkinlikGrupPage
                baslik={"Tiyatrolar"}
                etkinlikler={etkinlikler.filter((e) => e.kategori === "tiyatrolar")}
              />
            }
          />
          <Route
            path="/sporlar"
            element={
              <EtkinlikGrupPage baslik={"Sporlar"} etkinlikler={etkinlikler.filter((e) => e.kategori === "sporlar")} />
            }
          />
          <Route
            path="/sinemalar"
            element={
              <EtkinlikGrupPage baslik={"Sinemalar"} etkinlikler={etkinlikler.filter((e) => e.kategori === "sinemalar")} />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
