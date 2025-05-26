import { useState } from 'react'
import Topbar from './Components/Topbar'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Topbar />
      <HomePage />
      <Footer />
    </div>
  )
}

export default App
