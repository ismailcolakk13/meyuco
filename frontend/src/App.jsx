import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Topbar from "./Components/Topbar";
import EtkinlikGrupPage from "./Pages/EtkinlikGrupPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { konserler, tiyatrolar, sporlar, sinemalar } from "./data/etkinlikler";
import AdminPanel from "./Pages/AdminPanel";


function App()
{
  const location = useLocation();

  const hideTopbarPaths = ["/login", "/register"];
  const showTopBar = !hideTopbarPaths.includes(location.pathname);

  return (
    <div className="d-flex flex-column">
      {showTopBar && <Topbar />}
      <div className="flex-grow-1">
        <Routes>
          {/* Diğer rotalar */}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/konserler"
            element={
              <EtkinlikGrupPage baslik={"Konserler"} etkinlikler={konserler} />
            }
          />
          <Route
            path="/tiyatrolar"
            element={
              <EtkinlikGrupPage
                baslik={"Tiyatrolar"}
                etkinlikler={tiyatrolar}
              />
            }
          />
          <Route
            path="/sporlar"
            element={
              <EtkinlikGrupPage baslik={"Sporlar"} etkinlikler={sporlar} />
            }
          />
          <Route
            path="/sinemalar"
            element={
              <EtkinlikGrupPage baslik={"Sinemalar"} etkinlikler={sinemalar} />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
