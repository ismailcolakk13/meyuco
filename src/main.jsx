import { createRoot } from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

if (import.meta.env.VITE_API_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
