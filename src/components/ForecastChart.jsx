import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWeather } from '../context/WeatherContext';
import { format } from 'date-fns';

const ForecastChart = () => {
    const { forecastData } = useWeather();

    if (!forecastData) return null;

    // Process data for chart: Take next 24 hours (8 data points, 3-hour intervals)
    const chartData = forecastData.list.slice(0, 8).map(item => ({
        time: format(new Date(item.dt * 1000), 'HH:mm'),
        temp: Math.round(item.main.temp),
        rain: item.rain ? item.rain['3h'] : 0,
    }));

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 p-6 transition-all mt-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Temperature Trend (24h)</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="time"
                            stroke="#64748b"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            stroke="#64748b"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                            unit="°"
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ForecastChart;
