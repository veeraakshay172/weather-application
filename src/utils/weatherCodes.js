import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning, CloudDrizzle, CloudFog } from 'lucide-react';

export const getWeatherInfo = (code) => {
    // WMO Weather interpretation codes (WW)
    // 0	Clear sky
    // 1, 2, 3	Mainly clear, partly cloudy, and overcast
    // 45, 48	Fog and depositing rime fog
    // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
    // 56, 57	Freezing Drizzle: Light and dense intensity
    // 61, 63, 65	Rain: Slight, moderate and heavy intensity
    // 66, 67	Freezing Rain: Light and heavy intensity
    // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
    // 77	Snow grains
    // 80, 81, 82	Rain showers: Slight, moderate, and violent
    // 85, 86	Snow showers slight and heavy
    // 95 *	Thunderstorm: Slight or moderate
    // 96, 99 *	Thunderstorm with slight and heavy hail

    const codes = {
        0: { label: 'Clear Sky', icon: Sun, color: 'text-yellow-500' },
        1: { label: 'Mainly Clear', icon: Sun, color: 'text-yellow-400' },
        2: { label: 'Partly Cloudy', icon: Cloud, color: 'text-slate-400' },
        3: { label: 'Overcast', icon: Cloud, color: 'text-slate-500' },
        45: { label: 'Foggy', icon: CloudFog, color: 'text-slate-400' },
        48: { label: 'Rime Fog', icon: CloudFog, color: 'text-slate-400' },
        51: { label: 'Light Drizzle', icon: CloudDrizzle, color: 'text-blue-300' },
        53: { label: 'Drizzle', icon: CloudDrizzle, color: 'text-blue-400' },
        55: { label: 'Heavy Drizzle', icon: CloudDrizzle, color: 'text-blue-500' },
        56: { label: 'Freezing Drizzle', icon: CloudRain, color: 'text-cyan-400' },
        57: { label: 'Heavy Freezing Drizzle', icon: CloudRain, color: 'text-cyan-500' },
        61: { label: 'Slight Rain', icon: CloudRain, color: 'text-blue-400' },
        63: { label: 'Moderate Rain', icon: CloudRain, color: 'text-blue-500' },
        65: { label: 'Heavy Rain', icon: CloudRain, color: 'text-blue-600' },
        66: { label: 'Freezing Rain', icon: CloudRain, color: 'text-cyan-500' },
        67: { label: 'Heavy Freezing Rain', icon: CloudRain, color: 'text-cyan-600' },
        71: { label: 'Slight Snow', icon: CloudSnow, color: 'text-white' },
        73: { label: 'Snow', icon: CloudSnow, color: 'text-white' },
        75: { label: 'Heavy Snow', icon: CloudSnow, color: 'text-white' },
        77: { label: 'Snow Grains', icon: CloudSnow, color: 'text-white' },
        80: { label: 'Rain Showers', icon: CloudRain, color: 'text-blue-400' },
        81: { label: 'Heavy Showers', icon: CloudRain, color: 'text-blue-600' },
        82: { label: 'Violent Showers', icon: CloudRain, color: 'text-blue-700' },
        85: { label: 'Snow Showers', icon: CloudSnow, color: 'text-white' },
        86: { label: 'Heavy Snow Showers', icon: CloudSnow, color: 'text-white' },
        95: { label: 'Thunderstorm', icon: CloudLightning, color: 'text-purple-500' },
        96: { label: 'Thunderstorm with Hail', icon: CloudLightning, color: 'text-purple-600' },
        99: { label: 'Heavy Thunderstorm', icon: CloudLightning, color: 'text-purple-700' },
    };

    return codes[code] || { label: 'Unknown', icon: Cloud, color: 'text-gray-400' };
};
