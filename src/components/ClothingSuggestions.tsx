
import React, { useState } from 'react';
import { ClothingItem, Gender, ActivityType, WeatherForecast, ClothingCategory, ClothingRecommendation } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertCircle, BookOpenCheck, PackageCheck, Umbrella, Sun, CloudRain, Weight, Box } from 'lucide-react';
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
  const [optimizationMethod, setOptimizationMethod] = useState<string>("volume"); // 'volume' o 'weight'
  
  if (!forecasts.length) {
    return null;
  }

  // Determinar si el clima general es cálido o frío
  const averageTemp = forecasts.reduce((sum, forecast) => sum + (forecast.min + forecast.max) / 2, 0) / forecasts.length;
  const isWarm = averageTemp > 22;
  const isCold = averageTemp < 15;
  const weatherType = isWarm ? 'warm' : (isCold ? 'cold' : 'neutral');
  
  // Comprobar si es probable que llueva (condiciones nubladas)
  const mightRain = forecasts.some(f => 
    f.conditions.toLowerCase().includes('nublado') || 
    f.conditions.toLowerCase().includes('frío')
  );
  
  // Comprobar si hace mucho sol
  const isSunny = forecasts.some(f => 
    f.conditions.toLowerCase().includes('soleado') || 
    f.conditions.toLowerCase().includes('despejado')
  );
  
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
    
    // Casos especiales
    const isSpecialItem = 
      // Paraguas si hay posibilidad de lluvia
      (item.name === 'Paraguas' && mightRain) ||
      // Gorra/Sombrero si hay mucho sol
      ((item.name === 'Gorra' || item.name === 'Sombrero') && isSunny) ||
      // Bañador/Bikini si hay actividades de playa
      ((item.name === 'Bañador' || item.name === 'Bikini' || item.name === 'Toalla de playa') && activities.includes('beach'));
    
    return (isGenderSuitable && isActivitySuitable && isWeatherSuitable) || isSpecialItem;
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
        if (item.name === 'Paraguas' && mightRain) return 1;
        if ((item.name === 'Gorra' || item.name === 'Sombrero') && isSunny) return 1;
        if (item.name === 'Gafas de sol' && isSunny) return 1;
        return 1;
      case 'swimwear':
      case 'beach':
        if (activities.includes('beach')) return 1;
        return 0;
      case 'toiletry':
        return 1; // Generalmente uno de cada
      default:
        return 1;
    }
  };

  // Capacidad útil de la maleta (85% del volumen total)
  const usableVolume = luggageVolume * 0.85;
  
  // Estimación del peso máximo permitido basado en el tipo de equipaje
  const estimateMaxWeight = (volume: number): number => {
    if (volume <= 30000) return 7; // Mochila (~30L)
    if (volume <= 45000) return 10; // Maleta pequeña (~45L)
    if (volume <= 70000) return 15; // Maleta mediana (~70L)
    return 23; // Maleta grande (~100L)
  };
  
  const maxWeight = estimateMaxWeight(luggageVolume);

  // Calcular todas las recomendaciones ideales sin límite de volumen
  const calculateIdealRecommendations = (): ClothingRecommendation[] => {
    return suitableClothing.map(item => ({
      item,
      recommendedQuantity: calculateRecommendedQuantity(item),
      actualQuantity: calculateRecommendedQuantity(item)
    })).filter(rec => rec.recommendedQuantity > 0)
    .sort((a, b) => b.item.priority - a.item.priority); // Ordenar por prioridad
  };

  // Algoritmo de mochila (Knapsack) para optimizar según volumen o peso
  const knapsackOptimization = (recommendations: ClothingRecommendation[], usableVolume: number, maxWeight: number, optimizeBy: 'volume' | 'weight'): ClothingRecommendation[] => {
    // Primero ordenamos por prioridad para asegurar que los elementos más importantes se consideran primero
    const sortedRecs = [...recommendations].sort((a, b) => b.item.priority - a.item.priority);
    
    let remainingVolume = usableVolume;
    let remainingWeight = maxWeight;
    
    // Lista para almacenar el resultado optimizado
    const result: ClothingRecommendation[] = [];
    
    // Para cada recomendación, intentamos agregar tantas unidades como sea posible
    for (const rec of sortedRecs) {
      const optimizedRec = { ...rec, actualQuantity: 0 };
      
      // Calculamos cuántas unidades podemos agregar según el volumen y peso disponibles
      for (let i = 0; i < rec.recommendedQuantity; i++) {
        // Calculamos el volumen real que ocupará esta prenda (comprimida)
        const itemVolume = rec.item.compressedVolume;
        const itemWeight = rec.item.weight;

        let canAdd = false;
        
        if (optimizeBy === 'volume') {
          // Optimización por volumen primero, después verificamos peso
          if (remainingVolume >= itemVolume) {
            if (remainingWeight >= itemWeight) {
              canAdd = true;
            }
          }
        } else {
          // Optimización por peso primero, después verificamos volumen
          if (remainingWeight >= itemWeight) {
            if (remainingVolume >= itemVolume) {
              canAdd = true;
            }
          }
        }
        
        if (canAdd) {
          optimizedRec.actualQuantity++;
          remainingVolume -= itemVolume;
          remainingWeight -= itemWeight;
        } else {
          break; // No podemos agregar más de este ítem
        }
      }
      
      result.push(optimizedRec);
    }
    
    return result;
  };
  
  // Algoritmo para empacar respetando el volumen y peso de la maleta
  const packLuggage = (): ClothingRecommendation[] => {
    // Obtener recomendaciones ideales
    const idealRecommendations = calculateIdealRecommendations();
    
    // Aplicar algoritmo de optimización
    return knapsackOptimization(
      idealRecommendations, 
      usableVolume, 
      maxWeight, 
      optimizationMethod as 'volume' | 'weight'
    );
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
    if (item.actualQuantity > 0) { // Solo incluir ítems que realmente se empacaron
      acc[category].push(item);
    }
    return acc;
  }, {} as Record<ClothingCategory, ClothingRecommendation[]>);
  
  // Calcular espacio usado y disponible (usando volumen de ropa comprimida)
  const usedVolume = packingList.reduce((sum, item) => 
    sum + (item.item.compressedVolume * item.actualQuantity), 0);
  const volumePercentage = Math.round((usedVolume / usableVolume) * 100);
  
  // Calcular peso total de los artículos
  const totalWeight = packingList.reduce((sum, item) => 
    sum + (item.item.weight * item.actualQuantity), 0);
  const weightPercentage = Math.round((totalWeight / maxWeight) * 100);
  
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

  // Generar mensajes de recomendación basados en el clima
  const getWeatherRecommendations = () => {
    const recommendations = [];
    
    if (isSunny) {
      recommendations.push({
        icon: <Sun className="h-4 w-4 text-amber-500 mr-2" />,
        message: "No olvides llevar gorra y gafas de sol, ¡el tiempo será soleado!"
      });
    }
    
    if (mightRain) {
      recommendations.push({
        icon: <Umbrella className="h-4 w-4 text-blue-500 mr-2" />,
        message: "Hay posibilidad de lluvia, te recomendamos llevar paraguas"
      });
    }
    
    if (activities.includes('beach') && isWarm) {
      recommendations.push({
        icon: <Sun className="h-4 w-4 text-orange-500 mr-2" />,
        message: "Perfecto para la playa, ¡no olvides tu bañador y crema solar!"
      });
    }
    
    return recommendations;
  };

  const handleToggleOptimizationMethod = () => {
    setOptimizationMethod(optimizationMethod === 'volume' ? 'weight' : 'volume');
  };

  const renderClothingList = (
    groupedItems: Record<ClothingCategory, ClothingRecommendation[]>,
    showLuggageCapacity: boolean = false
  ) => {
    return (
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {/* Mostrar recomendaciones de clima */}
          {getWeatherRecommendations().length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm space-y-2">
              {getWeatherRecommendations().map((rec, idx) => (
                <div key={idx} className="flex items-center">
                  {rec.icon}
                  <span>{rec.message}</span>
                </div>
              ))}
            </div>
          )}
          
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
                        <span>{recommendation.item.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        {showLuggageCapacity && (
                          <div className="text-xs text-gray-500">
                            {recommendation.item.weight.toFixed(1)} kg × {recommendation.actualQuantity}
                          </div>
                        )}
                        <div className="flex items-center space-x-1 text-sm">
                          {showLuggageCapacity ? (
                            <span className={`font-medium ${recommendation.actualQuantity < recommendation.recommendedQuantity ? 'text-amber-500' : 'text-green-600'}`}>
                              {recommendation.actualQuantity}
                            </span>
                          ) : (
                            <span className="font-medium text-gray-700">
                              {recommendation.recommendedQuantity}
                            </span>
                          )}
                          {showLuggageCapacity && (
                            <>
                              <span className="text-gray-400">/</span>
                              <span className="text-gray-500">
                                {recommendation.recommendedQuantity}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
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
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 text-blue-800 rounded-lg text-sm flex-1 mr-2">
                  Esta es la ropa que realmente cabrá en tu maleta, teniendo en cuenta el espacio disponible.
                </div>
                <button 
                  onClick={handleToggleOptimizationMethod} 
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {optimizationMethod === 'volume' ? <Box size={14} /> : <Weight size={14} />}
                  <span>Optimizar por {optimizationMethod === 'volume' ? 'volumen' : 'peso'}</span>
                </button>
              </div>
              
              {renderClothingList(groupedPackingItems, true)}
              
              <div className="mt-6 pt-3 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm mb-2 flex items-center">
                    <Box className="h-4 w-4 mr-1" />
                    <span className="font-medium">Volumen utilizado:</span> {Math.round(usedVolume / 1000)} de {Math.round(usableVolume / 1000)} litros ({volumePercentage}%)
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${volumePercentage > 90 ? 'bg-red-500' : volumePercentage > 75 ? 'bg-amber-500' : 'bg-green-500'}`} 
                      style={{ width: `${Math.min(volumePercentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {volumePercentage > 90 
                      ? 'Tu maleta está muy llena, considera quitar algunos artículos.' 
                      : volumePercentage > 75 
                        ? 'Tu maleta está bastante llena, pero aún tienes espacio.' 
                        : 'Tienes suficiente espacio en tu maleta.'}
                  </p>
                </div>
                
                <div>
                  <div className="text-sm mb-2 flex items-center">
                    <Weight className="h-4 w-4 mr-1" />
                    <span className="font-medium">Peso total:</span> {totalWeight.toFixed(1)} de {maxWeight.toFixed(1)} kg ({weightPercentage}%)
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${weightPercentage > 90 ? 'bg-red-500' : weightPercentage > 75 ? 'bg-amber-500' : 'bg-green-500'}`} 
                      style={{ width: `${Math.min(weightPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {weightPercentage > 90 
                      ? 'Tu equipaje está muy pesado, podrías tener problemas en el aeropuerto.' 
                      : weightPercentage > 75 
                        ? 'El peso está cerca del límite, considera reducirlo.' 
                        : 'El peso está dentro de los límites permitidos.'}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClothingSuggestions;
