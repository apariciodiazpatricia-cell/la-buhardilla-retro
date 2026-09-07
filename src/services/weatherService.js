import axios from 'axios';

export const getWeatherData = async (lat = 37.3881, lon = -5.9823) => {
    try {
        const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );

        const temp = response.data.current.temperature_2m;
        const code = response.data.current.weather_code;

        const getWeatherDescription = (wCode) => {
            if (wCode === 0) return 'Despejado ☀️';
            if (wCode >= 1 && wCode <= 3) return 'Parcialmente Nublado ⛅';
            if (wCode >= 51 && wCode <= 67) return 'Lluvia 🌧️';
            return 'Estable 🌤️';
        };

        return {
            temp: Math.round(temp),
            condition: getWeatherDescription(code),
            location: 'Sevilla'
        };
    } catch (error) {
        console.error("Error al obtener el clima:", error);
        return { temp: '--', condition: 'No disponible', location: 'Sevilla' };
    }
};