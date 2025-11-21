import { Home, CloudSun, Sprout } from "lucide-react";
import { TRANSLATIONS, Language } from "@/data/translations";

interface BottomNavProps {
    activeTab: 'home' | 'weather' | 'crops';
    setActiveTab: (tab: 'home' | 'weather' | 'crops') => void;
    language: Language;
}

export default function BottomNav({ activeTab, setActiveTab, language }: BottomNavProps) {
    const t = TRANSLATIONS[language];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 flex justify-around items-center z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <Home className="h-6 w-6" />
                <span className="text-xs font-medium mt-1">{t.home}</span>
            </button>

            <button
                onClick={() => setActiveTab('weather')}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'weather' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <CloudSun className="h-6 w-6" />
                <span className="text-xs font-medium mt-1">{t.weather}</span>
            </button>

            <button
                onClick={() => setActiveTab('crops')}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'crops' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <Sprout className="h-6 w-6" />
                <span className="text-xs font-medium mt-1">{t.crops}</span>
            </button>
        </div>
    );
}
