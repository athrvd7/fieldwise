export type SoilType = 'Loamy' | 'Clay' | 'Sandy' | 'Black Soil';

export interface WeatherData {
  date: string;
  temp: number; // Celsius
  humidity: number; // Percentage
  rainfallChance: number; // Percentage
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
}

export interface Crop {
  id: string;
  name: string;
  suitableSoils: SoilType[];
  minTemp: number;
  maxTemp: number;
  waterRequirement: 'Low' | 'Medium' | 'High';
  yieldPotential: 'High' | 'Medium' | 'Low';
  description: string;
  reasonForRecommendation?: string;
  sowingWindow: string;
  harvestWindow: string;
  firstIrrigation: string;
}

export const SOIL_TYPES: SoilType[] = ['Loamy', 'Clay', 'Sandy', 'Black Soil'];

export const MOCK_WEATHER: WeatherData[] = [
  { date: 'Today', temp: 28, humidity: 65, rainfallChance: 10, condition: 'Sunny' },
  { date: 'Tomorrow', temp: 27, humidity: 70, rainfallChance: 30, condition: 'Cloudy' },
  { date: 'Day 3', temp: 25, humidity: 80, rainfallChance: 80, condition: 'Rainy' },
  { date: 'Day 4', temp: 24, humidity: 85, rainfallChance: 90, condition: 'Rainy' },
  { date: 'Day 5', temp: 26, humidity: 75, rainfallChance: 40, condition: 'Cloudy' },
];

export const MOCK_CROPS: Crop[] = [
  {
    id: '1',
    name: 'Mustard',
    suitableSoils: ['Loamy', 'Sandy'],
    minTemp: 15,
    maxTemp: 30,
    waterRequirement: 'Medium',
    yieldPotential: 'High',
    description: 'A popular oilseed crop suitable for the current season.',
    sowingWindow: 'Nov 25 - Dec 1',
    harvestWindow: 'Mar 10 - Mar 20',
    firstIrrigation: 'Dec 15 - Check for rain',
  },
  {
    id: '2',
    name: 'Wheat',
    suitableSoils: ['Loamy', 'Clay', 'Black Soil'],
    minTemp: 10,
    maxTemp: 25,
    waterRequirement: 'High',
    yieldPotential: 'High',
    description: 'Staple food crop, requires good moisture.',
    sowingWindow: 'Nov 20 - Nov 30',
    harvestWindow: 'Apr 1 - Apr 15',
    firstIrrigation: 'Dec 10 - Critical stage',
  },
  {
    id: '3',
    name: 'Chickpea (Gram)',
    suitableSoils: ['Loamy', 'Sandy', 'Black Soil'],
    minTemp: 15,
    maxTemp: 30,
    waterRequirement: 'Low',
    yieldPotential: 'Medium',
    description: 'Drought tolerant pulse crop.',
    sowingWindow: 'Nov 15 - Nov 25',
    harvestWindow: 'Mar 1 - Mar 10',
    firstIrrigation: 'Dec 20 - Only if dry',
  },
  {
    id: '4',
    name: 'Cotton',
    suitableSoils: ['Black Soil', 'Clay'],
    minTemp: 20,
    maxTemp: 35,
    waterRequirement: 'Medium',
    yieldPotential: 'High',
    description: 'Major cash crop, needs black soil.',
    sowingWindow: 'May 15 - Jun 15',
    harvestWindow: 'Oct 15 - Nov 15',
    firstIrrigation: 'Jun 30',
  },
  {
    id: '5',
    name: 'Groundnut',
    suitableSoils: ['Sandy', 'Loamy'],
    minTemp: 20,
    maxTemp: 30,
    waterRequirement: 'Medium',
    yieldPotential: 'Medium',
    description: 'Oilseed crop, prefers light soils.',
    sowingWindow: 'Jun 15 - Jul 15',
    harvestWindow: 'Oct 1 - Oct 15',
    firstIrrigation: 'Jul 10',
  },
  {
    id: '6',
    name: 'Rice',
    suitableSoils: ['Clay', 'Loamy'],
    minTemp: 20,
    maxTemp: 35,
    waterRequirement: 'High',
    yieldPotential: 'High',
    description: 'Staple crop, needs standing water.',
    sowingWindow: 'Jun 20 - Jul 10',
    harvestWindow: 'Oct 20 - Nov 10',
    firstIrrigation: 'Jul 5',
  },
];

export function getRecommendedCrops(soilType: SoilType): Crop[] {
  // Filter by soil type
  const soilSuitable = MOCK_CROPS.filter(crop => crop.suitableSoils.includes(soilType));
  
  // In a real app, we would filter by weather/season too.
  // For MVP, we'll just return the top 3 soil-suitable ones.
  // We can add some "reason" logic here.
  
  return soilSuitable.slice(0, 3).map(crop => {
    let reason = `Good match for ${soilType} soil.`;
    if (crop.waterRequirement === 'Low' && MOCK_WEATHER[0].rainfallChance < 30) {
      reason += ' Suitable for current dry spell.';
    } else if (crop.waterRequirement === 'High' && MOCK_WEATHER[0].rainfallChance > 50) {
      reason += ' Can utilize expected rainfall.';
    }
    return { ...crop, reasonForRecommendation: reason };
  });
}
