import React from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import ForecastChart from './ForecastChart';
import { useWeather } from '../context/WeatherContext';

const Dashboard = () => {
    const { weatherData, loading } = useWeather();

    return (
        <div className="space-y-6">
            <SearchBar />
            {!weatherData && !loading && (
                <div className="text-center text-slate-500 dark:text-slate-400 mt-10">
                    <p className="text-lg">Please search for a city or use your location.</p>
                </div>
            )}
            <CurrentWeather />
            <ForecastChart />
        </div>
    );
};

export default Dashboard;
