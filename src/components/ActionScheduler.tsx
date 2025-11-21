import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crop } from "@/data/mockData"
import { Calendar, Droplets, Sprout } from "lucide-react"
import { TRANSLATIONS, Language } from "@/data/translations"

interface ActionSchedulerProps {
    crop: Crop;
    onClose?: () => void;
    language?: Language;
}

export default function ActionScheduler({ crop, onClose, language = 'en' }: ActionSchedulerProps) {
    const t = TRANSLATIONS[language];

    return (
        <Card className="mt-4 border-primary/50 bg-primary/5 animate-in fade-in slide-in-from-top-4">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-primary">
                    Action Schedule for {crop.name}
                </CardTitle>
                {onClose && (
                    <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
                        Close
                    </button>
                )}
            </CardHeader>
            <CardContent>
                <div className="relative border-l-2 border-primary/30 ml-3 space-y-6 py-2">

                    {/* Sowing */}
                    <div className="ml-6 relative">
                        <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-primary border-2 border-background" />
                        <h4 className="font-semibold flex items-center gap-2 text-foreground">
                            <Sprout className="h-4 w-4 text-primary" /> {t.sowingWindow}
                        </h4>
                        <p className="text-sm text-muted-foreground">{crop.sowingWindow}</p>
                    </div>

                    {/* Irrigation */}
                    <div className="ml-6 relative">
                        <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-blue-500 border-2 border-background" />
                        <h4 className="font-semibold flex items-center gap-2 text-foreground">
                            <Droplets className="h-4 w-4 text-blue-500" /> {t.firstIrrigation}
                        </h4>
                        <p className="text-sm text-muted-foreground">{crop.firstIrrigation}</p>
                        <p className="text-xs text-amber-600 mt-1">
                            ⚠️ Check soil moisture before irrigating.
                        </p>
                    </div>

                    {/* Harvest */}
                    <div className="ml-6 relative">
                        <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-green-600 border-2 border-background" />
                        <h4 className="font-semibold flex items-center gap-2 text-foreground">
                            <Calendar className="h-4 w-4 text-green-600" /> {t.expectedHarvest}
                        </h4>
                        <p className="text-sm text-muted-foreground">{crop.harvestWindow}</p>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
