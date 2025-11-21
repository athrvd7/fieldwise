import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherData } from "@/data/mockData"
import { Cloud, CloudRain, Sun, CloudLightning, Loader2, AlertCircle } from "lucide-react"
import { TRANSLATIONS, Language } from "@/data/translations"

interface WeatherDashboardProps {
    location: string;
    weatherData: WeatherData[];
    language?: Language;
    isLoading?: boolean;
    error?: string | null;
}

const WeatherIcon = ({ condition }: { condition: WeatherData['condition'] }) => {
    switch (condition) {
        case 'Sunny': return <Sun className="h-6 w-6 text-yellow-500" />;
        case 'Cloudy': return <Cloud className="h-6 w-6 text-gray-500" />;
        case 'Rainy': return <CloudRain className="h-6 w-6 text-blue-500" />;
        case 'Stormy': return <CloudLightning className="h-6 w-6 text-purple-500" />;
        default: return <Sun className="h-6 w-6 text-yellow-500" />;
    }
};

export default function WeatherDashboard({ location, weatherData, language = 'en', isLoading = false, error = null }: WeatherDashboardProps) {
    const t = TRANSLATIONS[language];

    // Loading state
    if (isLoading) {
        return (
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary">{t.weatherSnapshot}</h2>
                <Card className="p-8">
                    <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p>{t.loadingWeather}</p>
                    </div>
                </Card>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary">{t.weatherSnapshot}</h2>
                <Card className="p-8 border-destructive/50">
                    <div className="flex flex-col items-center justify-center gap-3 text-destructive">
                        <AlertCircle className="h-8 w-8" />
                        <p className="text-center">{error}</p>
                    </div>
                </Card>
            </section>
        );
    }

    // No data state
    if (!weatherData || weatherData.length === 0) {
        return (
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary">{t.weatherSnapshot}</h2>
                <Card className="p-8">
                    <p className="text-center text-muted-foreground">
                        {t.locationPlaceholder}
                    </p>
                </Card>
            </section>
        );
    }

    const current = weatherData[0];
    const forecast = weatherData.slice(1);

    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">{t.weatherSnapshot}</h2>

            {/* Current Weather Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-primary/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                        <span>{location || "Your Location"}</span>
                        <span className="text-sm font-normal text-muted-foreground">{current.date}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <WeatherIcon condition={current.condition} />
                            <div>
                                <div className="text-3xl font-bold">{current.temp}°C</div>
                                <div className="text-muted-foreground">{current.condition}</div>
                            </div>
                        </div>
                        <div className="text-right text-sm space-y-1">
                            <div>{t.humidity}: <span className="font-medium">{current.humidity}%</span></div>
                            <div>{t.rainChance}: <span className="font-medium">{current.rainfallChance}%</span></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs sm:text-sm">
                {forecast.map((day, idx) => (
                    <Card key={idx} className="py-2 px-1 flex flex-col items-center justify-center gap-1">
                        <div className="font-medium">{day.date}</div>
                        <WeatherIcon condition={day.condition} />
                        <div>{day.temp}°C</div>
                    </Card>
                ))}
            </div>
        </section>
    )
}
