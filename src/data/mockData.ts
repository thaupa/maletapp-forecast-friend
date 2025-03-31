
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
    type: 'hiking',
    name: 'Senderismo',
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
  // Ropa para playa
  {
    name: 'Bañador/Bikini',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach'],
    volume: 300
  },
  {
    name: 'Toalla de playa',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach'],
    volume: 1000
  },
  {
    name: 'Gafas de sol',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach', 'hiking', 'sports'],
    volume: 200
  },
  {
    name: 'Chanclas',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach'],
    volume: 600
  },
  {
    name: 'Crema solar',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['beach', 'hiking', 'sports'],
    volume: 200
  },
  
  // Ropa para senderismo
  {
    name: 'Botas de montaña',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['hiking'],
    volume: 2000
  },
  {
    name: 'Chaqueta impermeable',
    forGender: 'all',
    forWeather: 'cold',
    forActivity: ['hiking'],
    volume: 1000
  },
  {
    name: 'Pantalones de senderismo',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['hiking'],
    volume: 800
  },
  {
    name: 'Mochila pequeña',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['hiking', 'sports'],
    volume: 500
  },
  
  // Ropa para deportes
  {
    name: 'Zapatillas deportivas',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['sports', 'hiking'],
    volume: 1500
  },
  {
    name: 'Camisetas deportivas',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['sports', 'hiking'],
    volume: 300
  },
  {
    name: 'Pantalones cortos',
    forGender: 'all',
    forWeather: 'warm',
    forActivity: ['sports', 'beach'],
    volume: 300
  },
  
  // Ropa para eventos formales
  {
    name: 'Traje',
    forGender: ['male'],
    forWeather: 'neutral',
    forActivity: ['formal'],
    volume: 2500
  },
  {
    name: 'Vestido',
    forGender: ['female'],
    forWeather: 'neutral',
    forActivity: ['formal'],
    volume: 1500
  },
  {
    name: 'Camisa formal',
    forGender: ['male'],
    forWeather: 'neutral',
    forActivity: ['formal'],
    volume: 500
  },
  {
    name: 'Blusa',
    forGender: ['female'],
    forWeather: 'neutral',
    forActivity: ['formal'],
    volume: 400
  },
  {
    name: 'Zapatos formales',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['formal'],
    volume: 1200
  },
  {
    name: 'Corbata',
    forGender: ['male'],
    forWeather: 'neutral',
    forActivity: ['formal'],
    volume: 100
  },
  
  // Ropa general
  {
    name: 'Ropa interior (por día)',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['beach', 'hiking', 'sports', 'formal'],
    volume: 100
  },
  {
    name: 'Calcetines (por día)',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['hiking', 'sports', 'formal'],
    volume: 100
  },
  {
    name: 'Pijama',
    forGender: 'all',
    forWeather: 'neutral',
    forActivity: ['beach', 'hiking', 'sports', 'formal'],
    volume: 500
  },
  {
    name: 'Jersey/Sudadera',
    forGender: 'all',
    forWeather: 'cold',
    forActivity: ['beach', 'hiking', 'sports'],
    volume: 1000
  },
  {
    name: 'Chaqueta abrigada',
    forGender: 'all',
    forWeather: 'cold',
    forActivity: ['beach', 'hiking', 'sports', 'formal'],
    volume: 2000
  }
];

// Ciudades populares para autocompletado
export const POPULAR_CITIES = [
  "Madrid, España",
  "Barcelona, España",
  "Valencia, España",
  "Sevilla, España",
  "Málaga, España",
  "Bilbao, España",
  "París, Francia",
  "Londres, Reino Unido",
  "Roma, Italia",
  "Berlín, Alemania",
  "Ámsterdam, Países Bajos",
  "Lisboa, Portugal",
  "Viena, Austria",
  "Praga, República Checa",
  "Budapest, Hungría",
  "Dublín, Irlanda",
  "Atenas, Grecia",
  "Estocolmo, Suecia",
  "Copenhague, Dinamarca",
  "Bruselas, Bélgica",
  "Nueva York, Estados Unidos",
  "Tokio, Japón",
  "Bangkok, Tailandia",
  "Sídney, Australia",
  "Río de Janeiro, Brasil",
  "Ciudad del Cabo, Sudáfrica",
  "Moscú, Rusia",
  "Dubái, Emiratos Árabes Unidos",
  "Cancún, México",
  "Toronto, Canadá"
];

// Función para generar datos meteorológicos simulados
export const generateWeatherForecast = (startDate: Date, endDate: Date, destination: string) => {
  const forecasts = [];
  const currentDate = new Date(startDate);
  const lastDay = new Date(endDate);
  
  // Ensure we include the end date in our forecast
  while (currentDate <= lastDay) {
    // Simplemente elegimos temperaturas aleatorias basadas en el destino y las fechas
    const getRandomTemp = (city: string, date: Date) => {
      // Temperaturas base por temporada para simplificar
      const month = date.getMonth(); // 0-11
      
      // Simulamos diferentes zonas climáticas
      if (city.includes("Málaga") || city.includes("Sevilla") || city.includes("Valencia")) {
        // Clima cálido del sur de España
        return {
          min: month < 3 || month > 10 ? 8 + Math.floor(Math.random() * 4) : 18 + Math.floor(Math.random() * 6),
          max: month < 3 || month > 10 ? 16 + Math.floor(Math.random() * 4) : 28 + Math.floor(Math.random() * 6)
        };
      } else if (city.includes("Madrid") || city.includes("Barcelona")) {
        // Clima continental/mediterráneo
        return {
          min: month < 3 || month > 10 ? 3 + Math.floor(Math.random() * 5) : 14 + Math.floor(Math.random() * 6),
          max: month < 3 || month > 10 ? 12 + Math.floor(Math.random() * 5) : 25 + Math.floor(Math.random() * 6)
        };
      } else if (city.includes("Bilbao")) {
        // Clima del norte de España
        return {
          min: month < 3 || month > 10 ? 5 + Math.floor(Math.random() * 3) : 12 + Math.floor(Math.random() * 4),
          max: month < 3 || month > 10 ? 12 + Math.floor(Math.random() * 4) : 22 + Math.floor(Math.random() * 4)
        };
      } else if (city.includes("Londres") || city.includes("Dublín")) {
        // Clima del norte de Europa
        return {
          min: month < 3 || month > 10 ? 2 + Math.floor(Math.random() * 3) : 10 + Math.floor(Math.random() * 4),
          max: month < 3 || month > 10 ? 8 + Math.floor(Math.random() * 4) : 18 + Math.floor(Math.random() * 5)
        };
      } else if (city.includes("París") || city.includes("Berlín")) {
        // Clima de Europa central
        return {
          min: month < 3 || month > 10 ? 0 + Math.floor(Math.random() * 5) : 12 + Math.floor(Math.random() * 5),
          max: month < 3 || month > 10 ? 8 + Math.floor(Math.random() * 6) : 22 + Math.floor(Math.random() * 6)
        };
      } else if (city.includes("Roma") || city.includes("Atenas")) {
        // Clima mediterráneo
        return {
          min: month < 3 || month > 10 ? 5 + Math.floor(Math.random() * 5) : 15 + Math.floor(Math.random() * 5),
          max: month < 3 || month > 10 ? 15 + Math.floor(Math.random() * 5) : 28 + Math.floor(Math.random() * 6)
        };
      } else if (city.includes("Cancún") || city.includes("Bangkok")) {
        // Clima tropical
        return {
          min: 20 + Math.floor(Math.random() * 5),
          max: 28 + Math.floor(Math.random() * 6)
        };
      } else {
        // Clima genérico
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
    
    forecasts.push({
      date: currentDate.toISOString().split('T')[0],
      min: temps.min,
      max: temps.max,
      conditions: condition
    });
    
    // Increment the date by one day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return forecasts;
};
