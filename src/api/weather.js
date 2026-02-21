import axios from 'axios';

// Open-Meteo doesn't mandate an API key for free tier, but we keep the structure flexible.
const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1';

const weatherApi = axios.create({ baseURL: WEATHER_BASE_URL });
const geocodingApi = axios.create({ baseURL: GEOCODING_BASE_URL });

export const fetchWeatherData = async (lat, lon, units = 'metric') => {
    // Open-Meteo requires specific params
    // temperature_unit: 'celsius' | 'fahrenheit'
    // wind_speed_unit: 'kmh' | 'ms' | 'mph' | 'kn'

    const tempUnit = units === 'metric' ? 'celsius' : 'fahrenheit';
    const windUnit = units === 'metric' ? 'ms' : 'mph';

    try {
        const response = await weatherApi.get('/forecast', {
            params: {
                latitude: lat,
                longitude: lon,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
                hourly: 'temperature_2m,precipitation_probability,weather_code',
                temperature_unit: tempUnit,
                wind_speed_unit: windUnit,
                timezone: 'auto' // Important for mapping hourly data correctly
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchGeocoding = async (city) => {
    try {
        const response = await geocodingApi.get('/search', {
            params: {
                name: city,
                count: 1,
                language: 'en',
                format: 'json'
            }
        });

        if (!response.data.results || response.data.results.length === 0) {
            throw new Error('City not found');
        }

        return response.data.results[0];
    } catch (error) {
        throw error;
    }
};
