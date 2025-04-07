
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { POPULAR_CITIES } from '@/data/mockData';
import { MapPin, Loader2 } from 'lucide-react';

// Add type definition for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

// Add a type for Google's place prediction results
interface PlacePrediction {
  description: string;
  place_id: string;
}

const DestinationAutocomplete: React.FC<DestinationAutocompleteProps> = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [googleSuggestions, setGoogleSuggestions] = useState<PlacePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGoogleLoaded, setHasGoogleLoaded] = useState(false);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Initialize Google Places API
  useEffect(() => {
    // Check if the Google Maps API script is already added to the document
    if (!document.getElementById('google-maps-script')) {
      // Load Google Maps API script
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Initialize the Autocomplete service
        if (window.google?.maps?.places) {
          autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
          setHasGoogleLoaded(true);
        }
      };
      document.head.appendChild(script);
    } else if (window.google?.maps?.places && !autocompleteServiceRef.current) {
      // If script already exists but service not initialized
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
      setHasGoogleLoaded(true);
    }

    return () => {
      // Clean up the debounce timer
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (value.trim() === '') {
      setSuggestions([]);
      setGoogleSuggestions([]);
      setIsLoading(false);
      return;
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    // Set loading state
    setIsLoading(true);

    // Use local suggestions while waiting for Google API
    const lowercaseQuery = value.toLowerCase();
    const filteredSuggestions = POPULAR_CITIES.filter(city => 
      city.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 5);
    
    setSuggestions(filteredSuggestions);

    // Debounce the Google Places API call to avoid too many requests
    debounceTimerRef.current = window.setTimeout(() => {
      if (hasGoogleLoaded && autocompleteServiceRef.current) {
        // Fetch suggestions from Google Places API
        autocompleteServiceRef.current.getPlacePredictions(
          {
            input: value,
            types: ['(cities)']
          },
          (predictions, status) => {
            setIsLoading(false);
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
              setGoogleSuggestions(predictions);
            } else {
              setGoogleSuggestions([]);
            }
          }
        );
      } else {
        setIsLoading(false);
      }
    }, 300);
  }, [value, hasGoogleLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  const handleSelectGoogleSuggestion = (suggestion: PlacePrediction) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
  };

  const allSuggestionsEmpty = suggestions.length === 0 && googleSuggestions.length === 0;

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          placeholder="Escribe tu destino"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full pl-10"
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
      </div>
      
      {showSuggestions && (isLoading || !allSuggestionsEmpty) && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ScrollArea className="max-h-60">
            {isLoading && (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin text-maletapp-blue mr-2" />
                <span className="text-sm text-gray-500">Buscando destinos...</span>
              </div>
            )}
            
            {googleSuggestions.length > 0 && (
              <div className="py-1">
                <div className="px-2 pt-1 pb-2 text-xs font-medium text-gray-500">Resultados de Google</div>
                {googleSuggestions.map((suggestion, index) => (
                  <div
                    key={`google-${suggestion.place_id}`}
                    className="px-4 py-2 text-sm hover:bg-maletapp-lightGray cursor-pointer flex items-center"
                    onMouseDown={() => handleSelectGoogleSuggestion(suggestion)}
                  >
                    <MapPin className="mr-2 text-maletapp-blue" size={14} />
                    {suggestion.description}
                  </div>
                ))}
              </div>
            )}
            
            {suggestions.length > 0 && (
              <div className="py-1">
                {googleSuggestions.length > 0 && (
                  <div className="px-2 pt-1 pb-2 text-xs font-medium text-gray-500">Destinos populares</div>
                )}
                {suggestions.map((suggestion, index) => (
                  <div
                    key={`local-${index}`}
                    className="px-4 py-2 text-sm hover:bg-maletapp-lightGray cursor-pointer"
                    onMouseDown={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default DestinationAutocomplete;
