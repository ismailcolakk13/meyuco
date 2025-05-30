import axios from 'axios';

// Login fonksiyonu
export const login = async (email, password) => {
    try {
        const response = await axios.post('/api/user/login', { email, password }, { withCredentials: true });
        return response.data.user;
    } catch (error) {
        throw error.response?.data?.message || 'Giriş başarısız';
    }
};

// Register fonksiyonu
export const register = async (userData) => {
    try {
        const response = await axios.post('/api/user/register', userData, { withCredentials: true });
        return response.data.user;
    } catch (error) {
        throw error.response?.data?.message || 'Kayıt başarısız';
    }
};