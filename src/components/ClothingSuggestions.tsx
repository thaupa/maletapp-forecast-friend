
import React, { useState } from 'react';
import { ClothingItem, Gender, ActivityType, WeatherForecast, ClothingCategory, ClothingRecommendation } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertCircle, BookOpenCheck, PackageCheck } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CLOTHING_ITEMS } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState<string>("recommended");
  
  if (!forecasts.length) {
    return null;
  }

  // Determinar si el clima general es cálido o frío
  const averageTemp = forecasts.reduce((sum, forecast) => sum + (forecast.min + forecast.max) / 2, 0) / forecasts.length;
  const isWarm = averageTemp > 22;
  const isCold = averageTemp < 15;
  const weatherType = isWarm ? 'warm' : (isCold ? 'cold' : 'neutral');
  
  // Duración del viaje (en días)
  const duration = forecasts.length;
  
  // Si no se seleccionaron actividades, usar todas para recomendaciones básicas
  const effectiveActivities = activities.length > 0 ? activities : ['beach', 'city', 'sports', 'formal'];

  // Filtrar ropa adecuada para el género, actividades y clima
  const suitableClothing = CLOTHING_ITEMS.filter(item => {
    // Verificar si el artículo es adecuado para el género
    const isGenderSuitable = item.forGender === 'all' || 
      (Array.isArray(item.forGender) && item.forGender.includes(gender));
    
    // Verificar si el artículo es adecuado para al menos una de las actividades seleccionadas
    const isActivitySuitable = item.forActivity.some(activity => effectiveActivities.includes(activity));
    
    // Verificar si el artículo es adecuado para el clima
    const isWeatherSuitable = item.forWeather === 'neutral' || item.forWeather === weatherType;
    
    return isGenderSuitable && isActivitySuitable && isWeatherSuitable;
  });

  // Calcular las cantidades recomendadas según la duración del viaje y tipo de prenda
  const calculateRecommendedQuantity = (item: ClothingItem): number => {
    switch (item.category) {
      case 'underwear':
        return duration; // Un cambio por día
      case 'socks':
        // Menos calcetines si hay actividades de playa
        return activities.includes('beach') ? Math.ceil(duration * 0.7) : duration;
      case 'top':
        // Más camisetas para climas cálidos, menos para fríos
        return isWarm ? Math.ceil(duration * 0.7) : Math.ceil(duration * 0.5);
      case 'bottom':
        // Menos pantalones/faldas que camisetas
        return Math.ceil(duration / 3) + 1;
      case 'outerwear':
        // Menos chaquetas/abrigos
        return isCold ? 2 : 1;
      case 'footwear':
        // 2-3 pares de zapatos según duración
        return duration > 7 ? 3 : 2;
      case 'sleepwear':
        return 1; // Un pijama
      case 'accessory':
      case 'swimwear':
      case 'beach':
      case 'toiletry':
        return 1; // Generalmente uno de cada
      default:
        return 1;
    }
  };

  // Factor de compresión mejorado para ropa doblada (volumen real ocupado)
  const getFoldedVolumeFactor = (category: ClothingCategory): number => {
    switch (category) {
      case 'underwear':
        return 0.4; // La ropa interior ocupa un 40% doblada (más comprimible)
      case 'socks':
        return 0.35; // Los calcetines ocupan un 35% cuando se doblan (muy comprimibles)
      case 'top':
        return 0.55; // Las prendas superiores ocupan un 55% dobladas
      case 'bottom':
        return 0.6; // Las prendas inferiores ocupan un 60% dobladas
      case 'outerwear':
        return 0.75; // Las prendas de abrigo son más difíciles de comprimir
      case 'footwear':
        return 0.9; // El calzado apenas se puede comprimir
      case 'sleepwear':
        return 0.6;
      case 'accessory':
        return 0.7;
      case 'swimwear':
        return 0.5;
      case 'beach':
        return 0.7;
      case 'toiletry':
        return 0.8;
      default:
        return 0.7;
    }
  };

  // Calcular todas las recomendaciones ideales sin límite de volumen
  const calculateIdealRecommendations = (): ClothingRecommendation[] => {
    return suitableClothing.map(item => ({
      item,
      recommendedQuantity: calculateRecommendedQuantity(item),
      actualQuantity: calculateRecommendedQuantity(item)
    }));
  };

  // Algoritmo para empacar respetando el volumen de la maleta
  const packLuggage = (): ClothingRecommendation[] => {
    let remainingVolume = luggageVolume;
    const packingList: ClothingRecommendation[] = [];
    
    // Agrupar items por categoría
    const categorizedItems = suitableClothing.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<ClothingCategory, ClothingItem[]>);
    
    // Orden de prioridad para empacar
    const packingPriority: ClothingCategory[] = [
      'underwear',
      'socks',
      'sleepwear',
      'top',
      'bottom', 
      'footwear',
      'outerwear',
      'accessory',
      'swimwear',
      'beach',
      'toiletry'
    ];
    
    // Empacar por prioridad
    packingPriority.forEach(category => {
      if (!categorizedItems[category]) return;
      
      categorizedItems[category].forEach(item => {
        const recommendedQty = calculateRecommendedQuantity(item);
        let actualQty = 0;
        
        // Calculamos el volumen real de cada prenda doblada
        const foldedItemVolume = item.volume * getFoldedVolumeFactor(item.category);
        
        // Calcular cuántos podemos empacar según el volumen disponible
        for (let i = 0; i < recommendedQty; i++) {
          if (remainingVolume >= foldedItemVolume) {
            actualQty++;
            remainingVolume -= foldedItemVolume;
          } else {
            break;
          }
        }
        
        // Agregar a la lista de empaque
        if (actualQty > 0 || recommendedQty > 0) {
          packingList.push({
            item,
            recommendedQuantity: recommendedQty,
            actualQuantity: actualQty
          });
        }
      });
    });
    
    return packingList;
  };
  
  const idealPackingList = calculateIdealRecommendations();
  const packingList = packLuggage();
  
  // Agrupar por categoría las recomendaciones ideales
  const groupedIdealItems = idealPackingList.reduce((acc, item) => {
    const category = item.item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<ClothingCategory, ClothingRecommendation[]>);
  
  // Agrupar por categoría las recomendaciones que caben en la maleta
  const groupedPackingItems = packingList.reduce((acc, item) => {
    const category = item.item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<ClothingCategory, ClothingRecommendation[]>);
  
  // Calcular espacio usado y disponible (usando volumen de ropa doblada)
  const usedVolume = packingList.reduce((sum, item) => 
    sum + (item.item.volume * getFoldedVolumeFactor(item.item.category) * item.actualQuantity), 0);
  const volumePercentage = Math.round((usedVolume / luggageVolume) * 100);
  
  // Para obtener etiquetas legibles de categorías
  const getCategoryLabel = (category: ClothingCategory): string => {
    switch (category) {
      case 'underwear': return 'Ropa interior';
      case 'socks': return 'Calcetines';
      case 'top': return 'Parte superior';
      case 'bottom': return 'Parte inferior';
      case 'outerwear': return 'Abrigo/Chaqueta';
      case 'footwear': return 'Calzado';
      case 'accessory': return 'Accesorios';
      case 'swimwear': return 'Ropa de baño';
      case 'sleepwear': return 'Ropa de dormir';
      case 'beach': return 'Playa';
      case 'toiletry': return 'Aseo';
      default: return category;
    }
  };

  // Traducción detallada de cada prenda
  const getDetailedItemName = (item: ClothingItem): string => {
    return item.name;
  };

  const renderClothingList = (
    groupedItems: Record<ClothingCategory, ClothingRecommendation[]>,
    showLuggageCapacity: boolean = false
  ) => {
    return (
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {Object.entries(groupedItems).map(([category, items], index) => (
            <Collapsible key={category} defaultOpen={true} className="mb-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-1 hover:bg-gray-50 rounded">
                <h4 className="font-medium text-sm text-maletapp-blue">
                  {getCategoryLabel(category as ClothingCategory)}
                </h4>
                <Badge variant="outline">{items.length}</Badge>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <ul className="space-y-2 mt-2">
                  {items.map((recommendation, itemIndex) => (
                    <li key={`${category}-${itemIndex}`} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        {showLuggageCapacity ? (
                          recommendation.actualQuantity >= recommendation.recommendedQuantity ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                          )
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        )}
                        <span>{getDetailedItemName(recommendation.item)}</span>
                      </div>
                      {showLuggageCapacity ? (
                        <div className="flex items-center space-x-1 text-sm">
                          <span className={`font-medium ${recommendation.actualQuantity < recommendation.recommendedQuantity ? 'text-amber-500' : 'text-green-600'}`}>
                            {recommendation.actualQuantity}
                          </span>
                          <span className="text-gray-400">/</span>
                          <span className="text-gray-500">
                            {recommendation.recommendedQuantity}
                          </span>
                        </div>
                      ) : (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">
                            {recommendation.recommendedQuantity} {recommendation.recommendedQuantity > 1 ? 'unidades' : 'unidad'}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                
                {index < Object.keys(groupedItems).length - 1 && (
                  <Separator className="my-3" />
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="w-full">
      <h3 className="font-medium text-lg mb-3">Sugerencias de ropa para tu viaje</h3>
      
      <Card className="w-full">
        <CardContent className="p-4">
          <Tabs defaultValue="recommended" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="recommended" className="flex items-center gap-2">
                <BookOpenCheck className="h-4 w-4" />
                <span>Recomendación</span>
              </TabsTrigger>
              <TabsTrigger value="luggage" className="flex items-center gap-2">
                <PackageCheck className="h-4 w-4" />
                <span>Dentro de tu maleta</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended">
              <div className="mb-4 p-2 bg-blue-50 text-blue-800 rounded-lg text-sm">
                Esta es la cantidad ideal de ropa para tu viaje, sin tener en cuenta el espacio de tu maleta.
              </div>
              {renderClothingList(groupedIdealItems)}
            </TabsContent>
            
            <TabsContent value="luggage">
              <div className="mb-4 p-2 bg-blue-50 text-blue-800 rounded-lg text-sm">
                Esta es la ropa que realmente cabrá en tu maleta, teniendo en cuenta el espacio disponible.
              </div>
              {renderClothingList(groupedPackingItems, true)}
              
              <div className="mt-6 pt-3 border-t">
                <div className="text-sm mb-2">
                  <span className="font-medium">Espacio utilizado (ropa doblada):</span> {Math.round(usedVolume / 1000)} de {Math.round(luggageVolume / 1000)} litros ({volumePercentage}%)
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${volumePercentage > 85 ? 'bg-red-500' : volumePercentage > 70 ? 'bg-amber-500' : 'bg-green-500'}`} 
                    style={{ width: `${Math.min(volumePercentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {volumePercentage > 85 
                    ? 'Tu maleta está muy llena, considera quitar algunos artículos.' 
                    : volumePercentage > 70 
                      ? 'Tu maleta está bastante llena, pero aún tienes espacio.' 
                      : 'Tienes suficiente espacio en tu maleta.'}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClothingSuggestions;
