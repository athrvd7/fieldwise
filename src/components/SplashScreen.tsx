import { useEffect, useState } from "react";
import { Sprout } from "lucide-react";

interface SplashScreenProps {
    onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinish, 500); // Wait for fade out animation
        }, 2000); // Show splash for 2 seconds

        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary text-primary-foreground transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="animate-bounce">
                <Sprout className="h-16 w-16 mb-4" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight animate-pulse">FieldWise</h1>
            <p className="text-sm mt-2 text-primary-foreground/80">Your Crop Planning Assistant</p>
        </div>
    );
}
