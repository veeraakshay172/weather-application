import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { MapPin, Droplets, Wind, Thermometer } from 'lucide-react';
import { format } from 'date-fns';

const CurrentWeather = () => {
    const { weatherData, error, loading } = useWeather();

    if (loading && !weatherData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
        );
    }

    if (!weatherData) return null;

    const {
        name,
        main: { temp, humidity, feels_like, pressure },
        sys: { country },
        weather,
        wind: { speed },
        dt,
    } = weatherData;

    const weatherInfo = weather[0].iconInfo;
    const WeatherIcon = weatherInfo?.icon || MapPin; // Fallback
    const weatherLabel = weatherInfo?.label || weather[0].description;
    const weatherColor = weatherInfo?.color || 'text-blue-500';

    const formattedDate = format(new Date(dt * 1000), 'EEEE, d MMMM, p');

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 p-6 md:p-8 transition-all">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 dark:text-slate-400 mb-2">
                        <MapPin className="w-5 h-5" />
                        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
                            {name}, {country}
                        </h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{formattedDate}</p>

                    <div className="flex items-center justify-center md:justify-start">
                        <span className="text-8xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                            {Math.round(temp)}°
                        </span>
                    </div>
                    <div className={`flex items-center gap-2 mt-4 text-xl font-medium ${weatherColor} justify-center md:justify-start`}>
                        <WeatherIcon className="w-8 h-8" />
                        <p className="capitalize">{weatherLabel}</p>
                    </div>
                </div>

                <div className="mt-8 md:mt-0 flex flex-col items-center">
                    {/* Using the same component icon for the large display */}
                    <div className={`p-6 rounded-full bg-slate-100 dark:bg-slate-700/50 ${weatherColor.replace('text-', 'text-opacity-100 text-')}`}>
                        <WeatherIcon className="w-32 h-32" />
                    </div>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500">
                        <Droplets className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Humidity</p>
                        <p className="text-lg font-semibold text-slate-800 dark:text-white">{humidity}%</p>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full text-teal-500">
                        <Wind className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Wind Speed</p>
                        <p className="text-lg font-semibold text-slate-800 dark:text-white">{parseFloat(speed).toFixed(1)} <span className="text-sm">m/s</span></p>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl flex items-center gap-4 col-span-2 md:col-span-1">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-500">
                        <Thermometer className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Feels Like</p>
                        <p className="text-lg font-semibold text-slate-800 dark:text-white">{Math.round(feels_like)}°</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
