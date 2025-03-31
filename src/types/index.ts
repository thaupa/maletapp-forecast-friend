
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
  image: string;
}

export type ActivityType = 'beach' | 'hiking' | 'sports' | 'formal';

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

export interface ClothingItem {
  name: string;
  forGender: Gender[] | 'all';
  forWeather: 'cold' | 'warm' | 'neutral';
  forActivity: ActivityType[];
  volume: number;
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
