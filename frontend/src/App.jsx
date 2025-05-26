import { useState } from 'react'
import Topbar from './Components/Topbar'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer'
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";


function App()
{
  const [count, setCount] = useState(0)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Topbar />
      <HomePage />
      <Footer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>

    </div>
  )
}

export default App
