import React, { useState, useEffect } from 'react';
import { DateRange } from "react-day-picker";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Gender, ActivityType, LuggageType, WeatherForecast, TripInfo } from '@/types';
import DateRangePicker from '@/components/DateRangePicker';
import DestinationAutocomplete from '@/components/DestinationAutocomplete';
import LuggageSelector from '@/components/LuggageSelector';
import ActivitiesSelector from '@/components/ActivitiesSelector';
import WeatherForecastComponent from '@/components/WeatherForecast';
import ClothingSuggestions from '@/components/ClothingSuggestions';
import { LUGGAGE_TYPES, generateWeatherForecast } from '@/data/mockData';
import { BaggageClaim, Calendar, CloudSun, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [tripInfo, setTripInfo] = useState<TripInfo>({
    destination: '',
    startDate: null,
    endDate: null,
    gender: 'other',
    luggage: null,
    activities: [],
    weatherForecasts: []
  });
  const [weatherForecasts, setWeatherForecasts] = useState<WeatherForecast[]>([]);
  const [luggageVolume, setLuggageVolume] = useState<number>(0);

  useEffect(() => {
    if (dateRange?.from) {
      setTripInfo(prev => ({
        ...prev,
        startDate: dateRange.from,
        endDate: dateRange.to || dateRange.from
      }));
    }
  }, [dateRange]);

  useEffect(() => {
    if (tripInfo.luggage) {
      const selectedLuggage = LUGGAGE_TYPES.find(l => l.type === tripInfo.luggage);
      if (selectedLuggage) {
        setLuggageVolume(selectedLuggage.volume);
      }
    } else {
      setLuggageVolume(0);
    }
  }, [tripInfo.luggage]);

  useEffect(() => {
    if (tripInfo.startDate && tripInfo.endDate && tripInfo.destination) {
      const forecasts = generateWeatherForecast(
        tripInfo.startDate, 
        tripInfo.endDate, 
        tripInfo.destination
      );
      setWeatherForecasts(forecasts);
      setTripInfo(prev => ({ ...prev, weatherForecasts: forecasts }));
    }
  }, [tripInfo.startDate, tripInfo.endDate, tripInfo.destination]);

  const handleDestinationChange = (value: string) => {
    setTripInfo(prev => ({ ...prev, destination: value }));
  };

  const handleGenderChange = (value: Gender) => {
    setTripInfo(prev => ({ ...prev, gender: value }));
  };

  const handleLuggageSelect = (type: LuggageType) => {
    setTripInfo(prev => ({ ...prev, luggage: type }));
  };

  const handleActivityToggle = (type: ActivityType) => {
    setTripInfo(prev => {
      const newActivities = prev.activities.includes(type)
        ? prev.activities.filter(t => t !== type)
        : [...prev.activities, type];
      return { ...prev, activities: newActivities };
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!tripInfo.destination || !dateRange?.from || !dateRange?.to || !tripInfo.gender) {
        toast({
          title: "Información incompleta",
          description: "Por favor, completa todos los campos antes de continuar.",
          variant: "destructive"
        });
        return;
      }
    } else if (step === 2) {
      if (!tripInfo.luggage) {
        toast({
          title: "Selecciona equipaje",
          description: "Por favor, selecciona un tipo de equipaje antes de continuar.",
          variant: "destructive"
        });
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Destino</label>
              <DestinationAutocomplete 
                value={tripInfo.destination} 
                onChange={handleDestinationChange} 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Fechas del viaje</label>
              <DateRangePicker 
                dateRange={dateRange} 
                onDateRangeChange={setDateRange} 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Género</label>
              <Select 
                value={tripInfo.gender} 
                onValueChange={(value) => handleGenderChange(value as Gender)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Hombre</SelectItem>
                  <SelectItem value="female">Mujer</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Selecciona tu equipaje</label>
              <LuggageSelector 
                selected={tripInfo.luggage} 
                onSelect={handleLuggageSelect} 
              />
            </div>
            
            {tripInfo.luggage && (
              <div className="p-4 bg-maletapp-lightGray rounded-lg mt-4">
                <h3 className="font-medium text-sm mb-2">Información del equipaje seleccionado</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Dimensiones:</p>
                    <p className="font-medium">
                      {LUGGAGE_TYPES.find(l => l.type === tripInfo.luggage)?.dimensions.width} x {LUGGAGE_TYPES.find(l => l.type === tripInfo.luggage)?.dimensions.height} x {LUGGAGE_TYPES.find(l => l.type === tripInfo.luggage)?.dimensions.depth} cm
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Volumen:</p>
                    <p className="font-medium">
                      {(LUGGAGE_TYPES.find(l => l.type === tripInfo.luggage)?.volume! / 1000).toFixed(1)} litros
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">¿Qué actividades realizarás?</label>
              <ActivitiesSelector 
                selected={tripInfo.activities} 
                onSelect={handleActivityToggle} 
              />
            </div>
            
            {weatherForecasts.length > 0 && (
              <div className="mt-6">
                <WeatherForecastComponent forecasts={weatherForecasts} />
              </div>
            )}
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-maletapp-lightGray rounded-lg">
              <h3 className="font-medium mb-3">Resumen de tu viaje</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Destino:</p>
                  <p className="font-medium">{tripInfo.destination}</p>
                </div>
                <div>
                  <p className="text-gray-500">Fechas:</p>
                  <p className="font-medium">
                    {tripInfo.startDate?.toLocaleDateString('es-ES')} - {tripInfo.endDate?.toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Duración:</p>
                  <p className="font-medium">
                    {weatherForecasts.length} {weatherForecasts.length === 1 ? 'día' : 'días'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Tipo de equipaje:</p>
                  <p className="font-medium">
                    {LUGGAGE_TYPES.find(l => l.type === tripInfo.luggage)?.name}
                  </p>
                </div>
              </div>
            </div>
            
            {luggageVolume > 0 && tripInfo.activities.length > 0 && weatherForecasts.length > 0 && (
              <ClothingSuggestions
                gender={tripInfo.gender}
                activities={tripInfo.activities}
                forecasts={weatherForecasts}
                luggageVolume={luggageVolume}
              />
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-maletapp-blue">MaletApp</h1>
          <p className="text-gray-600 mt-2">Tu asistente inteligente para hacer la maleta perfecta</p>
        </header>
        
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div 
              className={`flex flex-1 items-center ${step >= 1 ? 'text-maletapp-blue' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 1 ? 'bg-maletapp-blue text-white' : 'bg-gray-200'}`}>
                <User size={16} />
              </div>
              <span className="text-sm hidden md:inline">Información</span>
            </div>
            <Separator className="flex-1 mx-2" />
            <div 
              className={`flex flex-1 items-center ${step >= 2 ? 'text-maletapp-blue' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 2 ? 'bg-maletapp-blue text-white' : 'bg-gray-200'}`}>
                <BaggageClaim size={16} />
              </div>
              <span className="text-sm hidden md:inline">Equipaje</span>
            </div>
            <Separator className="flex-1 mx-2" />
            <div 
              className={`flex flex-1 items-center ${step >= 3 ? 'text-maletapp-blue' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 3 ? 'bg-maletapp-blue text-white' : 'bg-gray-200'}`}>
                <Calendar size={16} />
              </div>
              <span className="text-sm hidden md:inline">Actividades</span>
            </div>
            <Separator className="flex-1 mx-2" />
            <div 
              className={`flex flex-1 items-center ${step >= 4 ? 'text-maletapp-blue' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 4 ? 'bg-maletapp-blue text-white' : 'bg-gray-200'}`}>
                <CloudSun size={16} />
              </div>
              <span className="text-sm hidden md:inline">Resultado</span>
            </div>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Detalles del viaje"}
              {step === 2 && "Selecciona tu equipaje"}
              {step === 3 && "Actividades y clima"}
              {step === 4 && "Recomendaciones para tu maleta"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Indícanos a dónde viajas, cuándo y algunos datos personales"}
              {step === 2 && "Elige el tipo de equipaje que vas a llevar"}
              {step === 3 && "Selecciona las actividades que realizarás durante tu viaje"}
              {step === 4 && "Aquí tienes nuestras recomendaciones para hacer tu maleta"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={step === 1}
          >
            Anterior
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={step === 4}
          >
            {step < 4 ? 'Siguiente' : 'Finalizar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
