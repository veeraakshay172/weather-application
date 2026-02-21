import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const { getCityWeather, getWeather, loading } = useWeather();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            getCityWeather(query);
            setQuery('');
        }
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to retrieve your location. Please check browser permissions.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mb-8 flex gap-2">
            <form onSubmit={handleSubmit} className="flex-1 relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    disabled={loading}
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="absolute right-2 top-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? '...' : 'Search'}
                </button>
            </form>
            <button
                onClick={handleLocationClick}
                disabled={loading}
                className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors shadow-sm"
                title="Use my location"
            >
                <MapPin className="w-6 h-6" />
            </button>
        </div>
    );
};

export default SearchBar;
