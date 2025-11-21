// OpenWeatherMap API Service
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export interface WeatherResponse {
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
    }>;
    dt: number;
    dt_txt?: string;
}

export interface ForecastResponse {
    list: WeatherResponse[];
}

export interface GeocodingResponse {
    name: string;
    local_names?: { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

// Fetch current weather by city name
export async function getCurrentWeather(city: string) {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data: WeatherResponse = await response.json();
        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching current weather:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch weather',
        };
    }
}

// Fetch 5-day forecast
export async function getForecast(city: string) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status}`);
        }

        const data: ForecastResponse = await response.json();
        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching forecast:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch forecast',
        };
    }
}

// Reverse geocoding - get city name from coordinates
export async function reverseGeocode(lat: number, lon: number) {
    try {
        const response = await fetch(
            `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Geocoding API error: ${response.status}`);
        }

        const data: GeocodingResponse[] = await response.json();

        if (data.length === 0) {
            throw new Error('No location found');
        }

        return {
            success: true,
            data: data[0],
        };
    } catch (error) {
        console.error('Error reverse geocoding:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get location',
        };
    }
}

// Convert OpenWeather condition to our app's condition types
export function mapWeatherCondition(weatherMain: string): 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy' {
    const condition = weatherMain.toLowerCase();

    if (condition.includes('clear')) return 'Sunny';
    if (condition.includes('cloud')) return 'Cloudy';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'Rainy';
    if (condition.includes('thunder') || condition.includes('storm')) return 'Stormy';

    return 'Cloudy'; // default
}

// Format forecast data for our app
export function formatForecastData(forecastData: ForecastResponse) {
    // Get one forecast per day (around noon)
    const dailyForecasts = forecastData.list.filter((item) => {
        const date = new Date(item.dt * 1000);
        return date.getHours() >= 11 && date.getHours() <= 13;
    });

    return dailyForecasts.slice(0, 5).map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        }),
        temp: Math.round(item.main.temp),
        humidity: item.main.humidity,
        condition: mapWeatherCondition(item.weather[0].main),
        rainfallChance: item.weather[0].main.toLowerCase().includes('rain') ? 70 : 20,
    }));
}
