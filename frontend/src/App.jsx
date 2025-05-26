import { useState } from 'react'
import Topbar from './Components/Topbar'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Topbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/konserler" element={<Konserler />} />
        </Routes>
      </div>
      <Footer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>

    </div>
  );
}

export default App;
