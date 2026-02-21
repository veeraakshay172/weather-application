import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchWeatherData, fetchGeocoding } from '../api/weather';
import { getWeatherInfo } from '../utils/weatherCodes';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null); // Will store array of hourly data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [units, setUnits] = useState('metric'); // 'metric' or 'imperial'
    const [lastQuery, setLastQuery] = useState(null);

    // Function to adapt Open-Meteo response to our app's expected structure
    const adaptData = (apiResponse, cityInfo) => {
        const { current, hourly, current_units } = apiResponse;
        const weatherInfo = getWeatherInfo(current.weather_code);

        const adaptedCurrent = {
            name: cityInfo.name,
            sys: { country: cityInfo.country_code || '' }, // Open-Meteo Geocoding provides country_code
            main: {
                temp: current.temperature_2m,
                humidity: current.relative_humidity_2m,
                feels_like: current.apparent_temperature,
                pressure: 0, // Not requested in basic set, can add later
            },
            wind: {
                speed: current.wind_speed_10m
            },
            weather: [{
                description: weatherInfo.label,
                // We will pass the full weather info object or code to component to handle icon
                code: current.weather_code,
                iconInfo: weatherInfo
            }],
            dt: Math.floor(Date.now() / 1000), // Approximate for now or use current.time
        };

        // Adapt forecast: Open-Meteo gives arrays. We need to zip them.
        const adaptedForecast = {
            list: hourly.time.map((time, index) => ({
                dt: new Date(time).getTime() / 1000,
                main: {
                    temp: hourly.temperature_2m[index]
                },
                rain: {
                    '3h': hourly.precipitation_probability[index] // It's probability here, not amount
                },
                weather: [{
                    code: hourly.weather_code[index]
                }]
            }))
        };

        return { adaptedCurrent, adaptedForecast };
    };

    const getWeather = useCallback(async (lat, lon, cityInfo = { name: 'Your Location', country_code: '' }) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWeatherData(lat, lon, units);
            const { adaptedCurrent, adaptedForecast } = adaptData(data, cityInfo);

            setWeatherData(adaptedCurrent);
            setForecastData(adaptedForecast);
            setLastQuery({ type: 'coords', lat, lon, cityInfo });
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    }, [units]);

    const getCityWeather = useCallback(async (city) => {
        setLoading(true);
        setError(null);
        try {
            const location = await fetchGeocoding(city);
            // location object has name, latitude, longitude, country_code
            await getWeather(location.latitude, location.longitude, location);
            setLastQuery({ type: 'city', city });
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    }, [getWeather]);

    // Handle auto-refresh
    useEffect(() => {
        const interval = setInterval(() => {
            if (lastQuery) {
                if (lastQuery.type === 'coords') {
                    getWeather(lastQuery.lat, lastQuery.lon, lastQuery.cityInfo);
                } else if (lastQuery.type === 'city') {
                    getCityWeather(lastQuery.city);
                }
            }
        }, 300000);
        return () => clearInterval(interval);
    }, [lastQuery, getWeather, getCityWeather]);

    const toggleUnits = () => {
        setUnits(prev => prev === 'metric' ? 'imperial' : 'metric');
    };

    return (
        <WeatherContext.Provider
            value={{
                weatherData,
                forecastData,
                loading,
                error,
                units,
                toggleUnits,
                getWeather,
                getCityWeather,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};
