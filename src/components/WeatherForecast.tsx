
import React from 'react';
import { WeatherForecast } from '@/types';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Cloud, 
  Sun, 
  CloudSun, 
  Snowflake,
  Thermometer 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface WeatherForecastProps {
  forecasts: WeatherForecast[];
}

const WeatherForecastComponent: React.FC<WeatherForecastProps> = ({ forecasts }) => {
  if (!forecasts || forecasts.length === 0) {
    return null;
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'soleado':
        return <Sun className="text-yellow-500" size={24} />;
      case 'despejado':
        return <Sun className="text-yellow-500" size={24} />;
      case 'parcialmente nublado':
        return <CloudSun className="text-gray-400" size={24} />;
      case 'nublado':
        return <Cloud className="text-gray-400" size={24} />;
      case 'frío':
        return <Snowflake className="text-blue-300" size={24} />;
      default:
        return <CloudSun className="text-gray-400" size={24} />;
    }
  };

  return (
    <div className="w-full">
      <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
        <Thermometer className="text-maletapp-orange" />
        Previsión del tiempo (datos históricos del año pasado)
      </h3>
      <ScrollArea className="w-full rounded-md">
        <div className="flex space-x-4 pb-4 px-1">
          {forecasts.map((forecast, index) => {
            // Use parseISO to correctly parse the ISO date string
            const date = parseISO(forecast.date);
            return (
              <Card key={index} className="min-w-[140px] shadow-sm flex-shrink-0">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium mb-2">
                      {format(date, 'EEEE', { locale: es })}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {format(date, 'd MMM', { locale: es })}
                    </p>
                    <div className="mb-2">{getWeatherIcon(forecast.conditions)}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-blue-500">{forecast.min}°</span>
                      <span className="text-xs text-gray-400">-</span>
                      <span className="text-sm font-bold text-red-500">{forecast.max}°</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{forecast.conditions}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default WeatherForecastComponent;
