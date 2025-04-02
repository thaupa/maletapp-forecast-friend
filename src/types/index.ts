
export type Gender = 'male' | 'female' | 'other';

export type LuggageType = 'backpack' | 'small' | 'medium' | 'large';

export interface LuggageInfo {
  type: LuggageType;
  name: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  volume: number;
  usableVolume: number; // Capacidad útil (85% del volumen total)
  maxWeight: number; // Peso máximo en kg
  image: string;
}

export type ActivityType = 'beach' | 'city' | 'sports' | 'formal';

export interface Activity {
  type: ActivityType;
  name: string;
  image: string;
}

export interface WeatherForecast {
  date: string;
  min: number;
  max: number;
  conditions: string;
}

export type ClothingCategory = 
  | 'underwear' 
  | 'socks' 
  | 'top' 
  | 'bottom' 
  | 'outerwear' 
  | 'footwear' 
  | 'accessory' 
  | 'swimwear' 
  | 'sleepwear'
  | 'beach'
  | 'toiletry';

export interface ClothingItem {
  name: string;
  forGender: Gender[] | 'all';
  forWeather: 'cold' | 'warm' | 'neutral';
  forActivity: ActivityType[];
  volume: number; // Volumen sin comprimir en cm³
  compressedVolume: number; // Volumen comprimido en cm³
  weight: number; // Peso en kg
  priority: number; // 1-10, siendo 10 la máxima prioridad
  category: ClothingCategory;
}

export interface TripInfo {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  gender: Gender;
  luggage: LuggageType | null;
  activities: ActivityType[];
  weatherForecasts: WeatherForecast[];
}

export interface ClothingRecommendation {
  item: ClothingItem;
  recommendedQuantity: number;
  actualQuantity: number;
}
