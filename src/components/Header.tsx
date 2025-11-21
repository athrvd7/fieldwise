import { Sprout, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Language } from "@/data/translations";

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    title: string;
}

export default function Header({ language, setLanguage, title }: HeaderProps) {
    return (
        <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sprout className="h-8 w-8" />
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                </div>

                <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                    <SelectTrigger className="w-[100px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground h-8">
                        <div className="flex items-center gap-2">
                            <Globe className="h-3 w-3" />
                            <SelectValue placeholder="Lang" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                        <SelectItem value="mr">मराठी</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </header>
    );
}
