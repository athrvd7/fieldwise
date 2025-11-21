import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SoilType, SOIL_TYPES } from "@/data/mockData"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"
import { TRANSLATIONS, Language } from "@/data/translations"

interface FarmSetupProps {
    location: string;
    setLocation: (loc: string) => void;
    soilType: SoilType;
    setSoilType: (soil: SoilType) => void;
    onEnter: () => void;
    language: Language;
}

export default function FarmSetup({ location, setLocation, soilType, setSoilType, onEnter, language }: FarmSetupProps) {
    const t = TRANSLATIONS[language];
    const [isLocating, setIsLocating] = useState(false);

    const handleAutoLocation = async () => {
        if (navigator.geolocation) {
            setIsLocating(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        // Import reverseGeocode dynamically
                        const { reverseGeocode } = await import('@/services/weatherService');
                        const result = await reverseGeocode(position.coords.latitude, position.coords.longitude);

                        if (result.success && result.data) {
                            setLocation(result.data.name);
                        } else {
                            alert(t.locationError);
                        }
                    } catch (error) {
                        console.error('Reverse geocoding error:', error);
                        alert(t.locationError);
                    } finally {
                        setIsLocating(false);
                    }
                },
                (error) => {
                    alert(t.locationError);
                    console.error("Geolocation error:", error);
                    setIsLocating(false);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <section className="space-y-4 bg-card p-6 rounded-lg shadow-sm border border-border">
            <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                {t.farmSetup}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="location">{t.locationLabel}</Label>
                    <div className="flex gap-2">
                        <Input
                            id="location"
                            placeholder={t.locationPlaceholder}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="bg-background"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleAutoLocation}
                            title={t.useCurrentLocation}
                            type="button"
                            disabled={isLocating}
                        >
                            {isLocating ? (
                                <span className="h-4 w-4 animate-spin">⟳</span>
                            ) : (
                                <MapPin className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="soil">{t.soilLabel}</Label>
                    <Select value={soilType} onValueChange={(val) => setSoilType(val as SoilType)}>
                        <SelectTrigger id="soil" className="bg-background">
                            <SelectValue placeholder={t.soilPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {SOIL_TYPES.map((soil) => (
                                <SelectItem key={soil} value={soil}>
                                    {soil}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="pt-2">
                <Button
                    className="w-full"
                    onClick={onEnter}
                    disabled={!location || !location.trim()}
                >
                    {t.enterButton}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {(!location || !location.trim()) && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                        Please enter a location first
                    </p>
                )}
            </div>
        </section>
    )
}
