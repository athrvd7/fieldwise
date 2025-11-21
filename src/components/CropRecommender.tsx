import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crop } from "@/data/mockData"
import ActionScheduler from "./ActionScheduler"
import { ArrowRight, Leaf, Droplets } from "lucide-react"
import { TRANSLATIONS, Language } from "@/data/translations"

interface CropRecommenderProps {
    crops: Crop[];
    language?: Language;
}

export default function CropRecommender({ crops, language = 'en' }: CropRecommenderProps) {
    const [selectedCropId, setSelectedCropId] = useState<string | null>(null);
    const t = TRANSLATIONS[language];

    const handleSelectCrop = (id: string) => {
        setSelectedCropId(prev => prev === id ? null : id);
    };

    if (crops.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                Select a soil type to see recommendations.
            </div>
        );
    }

    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                <Leaf className="h-5 w-5" /> {t.recommendedCrops}
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
                {crops.map((crop) => (
                    <div key={crop.id} className="flex flex-col">
                        <Card
                            className={`flex-1 cursor-pointer transition-all hover:shadow-md ${selectedCropId === crop.id ? 'ring-2 ring-primary border-primary' : ''}`}
                            onClick={() => handleSelectCrop(crop.id)}
                        >
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{crop.name}</CardTitle>
                                    {crop.yieldPotential === 'High' && (
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                            {t.highYield}
                                        </span>
                                    )}
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {crop.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                                <div className="text-sm text-muted-foreground bg-secondary/50 p-2 rounded">
                                    <span className="font-semibold text-primary">{t.why}</span> {crop.reasonForRecommendation}
                                </div>
                                <div className="mt-2 flex gap-2 text-xs">
                                    <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                        <Droplets className="h-3 w-3" /> {crop.waterRequirement} Water
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2">
                                <Button variant={selectedCropId === crop.id ? "default" : "outline"} className="w-full text-xs h-8">
                                    {selectedCropId === crop.id ? t.hideSchedule : t.viewSchedule}
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Mobile: Show scheduler directly below the card if selected */}
                        <div className="md:hidden">
                            {selectedCropId === crop.id && (
                                <ActionScheduler crop={crop} onClose={() => setSelectedCropId(null)} language={language} />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop: Show scheduler below the grid if selected */}
            <div className="hidden md:block">
                {selectedCropId && (
                    <ActionScheduler
                        crop={crops.find(c => c.id === selectedCropId)!}
                        onClose={() => setSelectedCropId(null)}
                        language={language}
                    />
                )}
            </div>
        </section>
    )
}
