import axios from 'axios';

export const buscarEndereco = async (endereco: string) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&addressdetails=1`);
        const data = response.data;
        return data
    } catch (error) {
        console.error(error);
    }
}