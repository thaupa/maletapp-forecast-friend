
import React from 'react';
import { ClothingItem, Gender, ActivityType, WeatherForecast } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CLOTHING_ITEMS } from '@/data/mockData';

interface ClothingSuggestionsProps {
  gender: Gender;
  activities: ActivityType[];
  forecasts: WeatherForecast[];
  luggageVolume: number;
}

const ClothingSuggestions: React.FC<ClothingSuggestionsProps> = ({ 
  gender, 
  activities, 
  forecasts, 
  luggageVolume 
}) => {
  if (!activities.length || !forecasts.length) {
    return null;
  }

  // Determinar si el clima general es cálido o frío
  const averageTemp = forecasts.reduce((sum, forecast) => sum + (forecast.min + forecast.max) / 2, 0) / forecasts.length;
  const isWarm = averageTemp > 22;
  const isCold = averageTemp < 15;
  const weatherType = isWarm ? 'warm' : (isCold ? 'cold' : 'neutral');

  // Filtrar ropa adecuada para el género, actividades y clima
  const suitableClothing = CLOTHING_ITEMS.filter(item => {
    // Verificar si el artículo es adecuado para el género
    const isGenderSuitable = item.forGender === 'all' || 
      (Array.isArray(item.forGender) && item.forGender.includes(gender));
    
    // Verificar si el artículo es adecuado para al menos una de las actividades seleccionadas
    const isActivitySuitable = item.forActivity.some(activity => activities.includes(activity));
    
    // Verificar si el artículo es adecuado para el clima
    const isWeatherSuitable = item.forWeather === 'neutral' || item.forWeather === weatherType;
    
    return isGenderSuitable && isActivitySuitable && isWeatherSuitable;
  });

  // Calcular cuántas unidades de cada artículo se pueden empacar
  const duration = forecasts.length;
  
  // Limitar la cantidad de artículos según el volumen de la maleta
  let remainingVolume = luggageVolume;
  const packedItems: { item: ClothingItem; quantity: number }[] = [];

  // Preparamos una lista prioritaria por categorías
  const essentialItems = suitableClothing.filter(item => 
    item.name.includes('Ropa interior') || 
    item.name.includes('Calcetines') || 
    item.name.includes('Pijama')
  );
  
  const activitySpecificItems = suitableClothing.filter(item => 
    !essentialItems.includes(item) && 
    activities.some(activity => item.forActivity.includes(activity) && item.forActivity.length <= 2)
  );
  
  const generalItems = suitableClothing.filter(item => 
    !essentialItems.includes(item) && 
    !activitySpecificItems.includes(item)
  );

  // Primero empacamos los esenciales
  essentialItems.forEach(item => {
    let quantity = 0;
    if (item.name.includes('Ropa interior') || item.name.includes('Calcetines')) {
      quantity = Math.min(duration, Math.floor(remainingVolume / item.volume));
    } else {
      quantity = Math.min(1, Math.floor(remainingVolume / item.volume));
    }
    
    if (quantity > 0) {
      packedItems.push({ item, quantity });
      remainingVolume -= item.volume * quantity;
    }
  });

  // Luego los específicos para actividades
  activitySpecificItems.forEach(item => {
    const quantity = Math.min(1, Math.floor(remainingVolume / item.volume));
    if (quantity > 0) {
      packedItems.push({ item, quantity });
      remainingVolume -= item.volume * quantity;
    }
  });

  // Finalmente los generales
  generalItems.forEach(item => {
    const quantity = Math.min(1, Math.floor(remainingVolume / item.volume));
    if (quantity > 0) {
      packedItems.push({ item, quantity });
      remainingVolume -= item.volume * quantity;
    }
  });

  return (
    <div className="w-full">
      <h3 className="font-medium text-lg mb-3">Sugerencias de ropa para tu viaje</h3>
      
      <Card className="w-full">
        <CardContent className="p-4">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {activities.map((activity, index) => {
                const activityName = activity === 'beach' 
                  ? 'Playa' 
                  : activity === 'hiking' 
                    ? 'Senderismo' 
                    : activity === 'sports' 
                      ? 'Deportes' 
                      : 'Eventos Formales';
                
                const activityItems = packedItems.filter(
                  ({ item }) => item.forActivity.includes(activity)
                );
                
                return activityItems.length > 0 ? (
                  <div key={activity}>
                    <h4 className="font-medium text-sm text-maletapp-blue mb-2">{activityName}</h4>
                    <ul className="space-y-2">
                      {activityItems.map(({ item, quantity }, itemIndex) => (
                        <li key={`${activity}-${itemIndex}`} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{item.name}</span>
                          {quantity > 1 && (
                            <span className="ml-1 text-gray-500">x{quantity}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {index < activities.length - 1 && (
                      <Separator className="my-3" />
                    )}
                  </div>
                ) : null;
              })}
              
              <div>
                <h4 className="font-medium text-sm text-maletapp-blue mb-2">Elementos generales</h4>
                <ul className="space-y-2">
                  {packedItems
                    .filter(({ item }) => item.forActivity.length > 2)
                    .map(({ item, quantity }, index) => (
                      <li key={`general-${index}`} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item.name}</span>
                        {quantity > 1 && (
                          <span className="ml-1 text-gray-500">x{quantity}</span>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
          
          <div className="mt-4 pt-3 border-t text-xs text-gray-500">
            Espacio disponible: {Math.round(remainingVolume / 1000)} de {Math.round(luggageVolume / 1000)} litros
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClothingSuggestions;
