
import { LuggageInfo, Activity, ClothingItem } from '../types';

export const LUGGAGE_TYPES: LuggageInfo[] = [
  {
    type: 'backpack',
    name: 'Mochila',
    dimensions: {
      width: 30,
      height: 40,
      depth: 20
    },
    volume: 24000,
    image: 'backpack'
  },
  {
    type: 'small',
    name: 'Maleta Pequeña',
    dimensions: {
      width: 40,
      height: 55,
      depth: 20
    },
    volume: 44000,
    image: 'small-suitcase'
  },
  {
    type: 'medium',
    name: 'Maleta Mediana',
    dimensions: {
      width: 50,
      height: 65,
      depth: 25
    },
    volume: 81250,
    image: 'medium-suitcase'
  },
  {
    type: 'large',
    name: 'Maleta Grande',
    dimensions: {
      width: 70,
      height: 80,
      depth: 30
    },
    volume: 168000,
    image: 'large-suitcase'
  }
];

export const ACTIVITIES: Activity[] = [
  {
    type: 'beach',
    name: 'Playa',
    image: 'beach'
  },
  {
    type: 'city',
    name: 'Explorar la ciudad',
    image: 'hiking'
  },
  {
    type: 'sports',
    name: 'Deportes',
    image: 'sports'
  },
  {
    type: 'formal',
    name: 'Eventos Formales',
    image: 'formal'
  }
];

export const CLOTHING_ITEMS: ClothingItem[] = [
  {
    name: 'Boxers',
    forGender: ['male'],
    forWeather: 'neutral',
    forActivity: ['beach', 'city', 'sports', 'formal'],
    volume: 100,
    category: 'underwear'
  },
  {
    name: 'Bragas/Tangas',
    forGender: ['female'],
    forWeather: 'neutral',
    forActivity: ['beach', 'city', 'sports', 'formal'],
    volume: 80,
    category: 'underwear'
  },
  {
    name: 'Sujetador',
    forGender: ['female'],
    forWeather: 'neutral',
    forActivity: ['beach', 'city', 'sports', 'formal'],
    volume: 150,
    category: 'underwear'
  },
  {
    name: 'Calcetines',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['city', 'sports', 'formal'],
    volume: 100,
    category: 'socks'
  },
  {
    name: 'Pijama',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['beach', 'city', 'sports', 'formal'],
    volume: 500,
    category: 'sleepwear'
  },
  
  {
    name: 'Camiseta',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach', 'city', 'sports'],
    volume: 250,
    category: 'top'
  },
  {
    name: 'Camisa manga larga',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['city', 'formal'],
    volume: 350,
    category: 'top'
  },
  {
    name: 'Jersey/Sudadera',
    forGender: 'all',
    forWeather: 'cold',
    forActivity: ['beach', 'city', 'sports'],
    volume: 800,
    category: 'top'
  },
  
  {
    name: 'Chaqueta',
    forGender: 'all',
    forWeather: 'cold',
    forActivity: ['city', 'sports', 'formal'],
    volume: 1200,
    category: 'outerwear'
  },
  {
    name: 'Abrigo',
    forGender: 'all',
    forWeather: 'cold',
    forActivity: ['formal', 'city'],
    volume: 2000,
    category: 'outerwear'
  },
  {
    name: 'Impermeable',
    forGender: 'all',
    forWeather: 'cold',
    forActivity: ['city'],
    volume: 1000,
    category: 'outerwear'
  },
  
  {
    name: 'Pantalones',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['city', 'formal'],
    volume: 600,
    category: 'bottom'
  },
  {
    name: 'Vaqueros',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['beach', 'city', 'sports'],
    volume: 800,
    category: 'bottom'
  },
  {
    name: 'Falda',
    forGender: ['female'],
    forWeather: 'warm',
    forActivity: ['beach', 'formal'],
    volume: 500,
    category: 'bottom'
  },
  {
    name: 'Pantalones cortos',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['sports', 'beach', 'city'],
    volume: 300,
    category: 'bottom'
  },
  
  {
    name: 'Zapatos formales',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['formal'],
    volume: 1200,
    category: 'footwear'
  },
  {
    name: 'Zapatillas deportivas',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['sports', 'city'],
    volume: 1500,
    category: 'footwear'
  },
  {
    name: 'Chanclas',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach'],
    volume: 600,
    category: 'footwear'
  },
  {
    name: 'Botas de montaña',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['city'],
    volume: 2000,
    category: 'footwear'
  },
  
  {
    name: 'Sombrero/Gorra',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach', 'city', 'sports'],
    volume: 300,
    category: 'accessory'
  },
  {
    name: 'Cinturón',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['formal'],
    volume: 200,
    category: 'accessory'
  },
  {
    name: 'Guantes',
    forGender: 'all',
    forWeather: 'cold',
    forActivity: ['city'],
    volume: 200,
    category: 'accessory'
  },
  {
    name: 'Bufanda',
    forGender: 'all',
    forWeather: 'cold',
    forActivity: ['city', 'formal'],
    volume: 300,
    category: 'accessory'
  },
  {
    name: 'Corbata',
    forGender: ['male'],
    forWeather: 'neutral',
    forActivity: ['formal'],
    volume: 100,
    category: 'accessory'
  },
  
  {
    name: 'Bañador/Bikini',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach'],
    volume: 300,
    category: 'swimwear'
  },
  {
    name: 'Toalla de playa',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach'],
    volume: 1000,
    category: 'beach'
  },
  {
    name: 'Gafas de sol',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach', 'city', 'sports'],
    volume: 200,
    category: 'accessory'
  },
  {
    name: 'Crema solar',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach', 'city', 'sports'],
    volume: 200,
    category: 'toiletry'
  },
];

export const POPULAR_CITIES = [
  // Spain
  "Madrid, España",
  "Barcelona, España",
  "Valencia, España",
  "Sevilla, España",
  "Málaga, España",
  "Bilbao, España",
  "Zaragoza, España",
  "Palma de Mallorca, España",
  "Las Palmas, España",
  "Murcia, España",
  "Alicante, España",
  "Córdoba, España",
  "Granada, España",
  "Vigo, España",
  "Gijón, España",
  "A Coruña, España",
  
  // Europe
  "París, Francia",
  "Lyon, Francia",
  "Marsella, Francia",
  "Niza, Francia",
  "Londres, Reino Unido",
  "Manchester, Reino Unido",
  "Liverpool, Reino Unido",
  "Birmingham, Reino Unido",
  "Roma, Italia",
  "Milán, Italia",
  "Nápoles, Italia",
  "Florencia, Italia",
  "Venecia, Italia",
  "Berlín, Alemania",
  "Múnich, Alemania",
  "Hamburgo, Alemania",
  "Frankfurt, Alemania",
  "Colonia, Alemania",
  "Ámsterdam, Países Bajos",
  "Róterdam, Países Bajos",
  "Lisboa, Portugal",
  "Oporto, Portugal",
  "Viena, Austria",
  "Praga, República Checa",
  "Budapest, Hungría",
  "Dublín, Irlanda",
  "Atenas, Grecia",
  "Santorini, Grecia",
  "Estocolmo, Suecia",
  "Copenhague, Dinamarca",
  "Bruselas, Bélgica",
  "Oslo, Noruega",
  "Helsinki, Finlandia",
  "Zúrich, Suiza",
  "Ginebra, Suiza",
  "Varsovia, Polonia",
  "Cracovia, Polonia",
  
  // North America
  "Nueva York, Estados Unidos",
  "Los Ángeles, Estados Unidos",
  "Chicago, Estados Unidos",
  "Miami, Estados Unidos",
  "San Francisco, Estados Unidos",
  "Las Vegas, Estados Unidos",
  "Boston, Estados Unidos",
  "Washington D.C., Estados Unidos",
  "Seattle, Estados Unidos",
  "Toronto, Canadá",
  "Vancouver, Canadá",
  "Montreal, Canadá",
  "Ciudad de México, México",
  "Cancún, México",
  "La Habana, Cuba",
  
  // South America
  "Río de Janeiro, Brasil",
  "São Paulo, Brasil",
  "Buenos Aires, Argentina",
  "Santiago, Chile",
  "Lima, Perú",
  "Bogotá, Colombia",
  "Medellín, Colombia",
  "Cartagena, Colombia",
  "Quito, Ecuador",
  "Caracas, Venezuela",
  
  // Asia
  "Tokio, Japón",
  "Kioto, Japón",
  "Osaka, Japón",
  "Pekín, China",
  "Shanghái, China",
  "Hong Kong, China",
  "Seúl, Corea del Sur",
  "Bangkok, Tailandia",
  "Phuket, Tailandia",
  "Singapur, Singapur",
  "Kuala Lumpur, Malasia",
  "Ho Chi Minh, Vietnam",
  "Hanói, Vietnam",
  "Bali, Indonesia",
  "Bombay, India",
  "Nueva Delhi, India",
  "Dubái, Emiratos Árabes Unidos",
  "Abu Dabi, Emiratos Árabes Unidos",
  "Estambul, Turquía",
  "Jerusalén, Israel",
  "Tel Aviv, Israel",
  
  // Oceania
  "Sídney, Australia",
  "Melbourne, Australia",
  "Brisbane, Australia",
  "Perth, Australia",
  "Auckland, Nueva Zelanda",
  "Wellington, Nueva Zelanda",
  
  // Africa
  "El Cairo, Egipto",
  "Ciudad del Cabo, Sudáfrica",
  "Johannesburgo, Sudáfrica",
  "Marrakech, Marruecos",
  "Casablanca, Marruecos",
  "Nairobi, Kenia",
  "Lagos, Nigeria",
  "Túnez, Túnez",
  "Dakar, Senegal"
];

export const generateWeatherForecast = (startDate: Date, endDate: Date, destination: string) => {
  const forecasts = [];
  const currentDate = new Date(startDate);
  const lastDay = new Date(endDate);
  
  // Ensure we're working with date-only comparison (no time)
  currentDate.setHours(0, 0, 0, 0);
  lastDay.setHours(0, 0, 0, 0);
  
  // We use <= to ensure we include the end date in our forecast
  while (currentDate <= lastDay) {
    const getRandomTemp = (city: string, date: Date) => {
      const month = date.getMonth();
      
      if (city.includes("Málaga") || city.includes("Sevilla") || city.includes("Valencia")) {
        return {
          min: month < 3 || month > 10 ? 8 + Math.floor(Math.random() * 4) : 18 + Math.floor(Math.random() * 6),
          max: month < 3 || month > 10 ? 16 + Math.floor(Math.random() * 4) : 28 + Math.floor(Math.random() * 6)
        };
      } else if (city.includes("Madrid") || city.includes("Barcelona")) {
        return {
          min: month < 3 || month > 10 ? 3 + Math.floor(Math.random() * 5) : 14 + Math.floor(Math.random() * 6),
          max: month < 3 || month > 10 ? 12 + Math.floor(Math.random() * 5) : 25 + Math.floor(Math.random() * 6)
        };
      } else if (city.includes("Bilbao")) {
        return {
          min: month < 3 || month > 10 ? 5 + Math.floor(Math.random() * 3) : 12 + Math.floor(Math.random() * 4),
          max: month < 3 || month > 10 ? 12 + Math.floor(Math.random() * 4) : 22 + Math.floor(Math.random() * 4)
        };
      } else if (city.includes("Londres") || city.includes("Dublín")) {
        return {
          min: month < 3 || month > 10 ? 2 + Math.floor(Math.random() * 3) : 10 + Math.floor(Math.random() * 4),
          max: month < 3 || month > 10 ? 8 + Math.floor(Math.random() * 4) : 18 + Math.floor(Math.random() * 5)
        };
      } else if (city.includes("París") || city.includes("Berlín")) {
        return {
          min: month < 3 || month > 10 ? 0 + Math.floor(Math.random() * 5) : 12 + Math.floor(Math.random() * 5),
          max: month < 3 || month > 10 ? 8 + Math.floor(Math.random() * 6) : 22 + Math.floor(Math.random() * 6)
        };
      } else if (city.includes("Roma") || city.includes("Atenas")) {
        return {
          min: month < 3 || month > 10 ? 5 + Math.floor(Math.random() * 5) : 15 + Math.floor(Math.random() * 5),
          max: month < 3 || month > 10 ? 15 + Math.floor(Math.random() * 5) : 28 + Math.floor(Math.random() * 6)
        };
      } else if (city.includes("Cancún") || city.includes("Bangkok")) {
        return {
          min: 20 + Math.floor(Math.random() * 5),
          max: 28 + Math.floor(Math.random() * 6)
        };
      } else {
        return {
          min: month < 3 || month > 10 ? 5 + Math.floor(Math.random() * 5) : 12 + Math.floor(Math.random() * 8),
          max: month < 3 || month > 10 ? 12 + Math.floor(Math.random() * 8) : 22 + Math.floor(Math.random() * 10)
        };
      }
    };
    
    const getWeatherCondition = (min: number, max: number) => {
      const avg = (min + max) / 2;
      if (avg > 25) return "Soleado";
      if (avg > 18) return "Despejado";
      if (avg > 12) return "Parcialmente nublado";
      if (avg > 5) return "Nublado";
      return "Frío";
    };
    
    const temps = getRandomTemp(destination, new Date(currentDate));
    const condition = getWeatherCondition(temps.min, temps.max);
    
    // Store the date in ISO format YYYY-MM-DD
    forecasts.push({
      date: currentDate.toISOString().split('T')[0],
      min: temps.min,
      max: temps.max,
      conditions: condition
    });
    
    // Increment date by one day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return forecasts;
};
