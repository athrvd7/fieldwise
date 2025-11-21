"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import FarmSetup from "@/components/FarmSetup";
import WeatherDashboard from "@/components/WeatherDashboard";
import CropRecommender from "@/components/CropRecommender";
import { SoilType, getRecommendedCrops, Crop, WeatherData } from "@/data/mockData";
import { TRANSLATIONS, Language } from "@/data/translations";
import { getCurrentWeather, getForecast, formatForecastData, mapWeatherCondition } from "@/services/weatherService";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [location, setLocation] = useState("");
  const [soilType, setSoilType] = useState<SoilType>("Loamy");
  const [recommendedCrops, setRecommendedCrops] = useState<Crop[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'home' | 'weather' | 'crops'>('home');
  const [language, setLanguage] = useState<Language>('en');

  const t = TRANSLATIONS[language];

  // Update recommendations when soil type changes
  useEffect(() => {
    const crops = getRecommendedCrops(soilType);
    setRecommendedCrops(crops);
  }, [soilType]);

  // Fetch weather data when location changes
  useEffect(() => {
    if (location && location.trim()) {
      fetchWeatherData(location);
    }
  }, [location]);

  const fetchWeatherData = async (city: string) => {
    setIsLoadingWeather(true);
    setWeatherError(null);

    try {
      // Fetch current weather and forecast
      const [currentResult, forecastResult] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);

      if (!currentResult.success || !currentResult.data) {
        setWeatherError(t.invalidLocation);
        setIsLoadingWeather(false);
        return;
      }

      if (!forecastResult.success || !forecastResult.data) {
        setWeatherError(t.weatherError);
        setIsLoadingWeather(false);
        return;
      }

      // Format current weather
      const current = currentResult.data;
      const currentWeather: WeatherData = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        temp: Math.round(current.main.temp),
        humidity: current.main.humidity,
        condition: mapWeatherCondition(current.weather[0].main),
        rainfallChance: current.weather[0].main.toLowerCase().includes('rain') ? 70 : 20,
      };

      // Format forecast
      const forecast = formatForecastData(forecastResult.data);

      // Combine current + forecast
      setWeatherData([currentWeather, ...forecast]);
      setIsLoadingWeather(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeatherError(t.weatherError);
      setIsLoadingWeather(false);
    }
  };

  const handleEnter = () => {
    if (location && location.trim()) {
      setActiveTab('weather');
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <Header language={language} setLanguage={setLanguage} title={t.appTitle} />
      <div className="container mx-auto p-4 space-y-8 pb-24">

        {/* Tab Content */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold text-primary">{t.welcomeTitle}</h2>
              <p className="text-muted-foreground">{t.welcomeSubtitle}</p>
            </div>
            <FarmSetup
              location={location}
              setLocation={setLocation}
              soilType={soilType}
              setSoilType={setSoilType}
              onEnter={handleEnter}
              language={language}
            />
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <WeatherDashboard
              location={location}
              weatherData={weatherData}
              language={language}
              isLoading={isLoadingWeather}
              error={weatherError}
            />
          </div>
        )}

        {activeTab === 'crops' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CropRecommender crops={recommendedCrops} language={language} />
          </div>
        )}

      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} language={language} />
    </>
  );
}
