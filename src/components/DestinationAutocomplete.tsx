
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { POPULAR_CITIES } from '@/data/mockData';

interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

const DestinationAutocomplete: React.FC<DestinationAutocompleteProps> = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const lowercaseQuery = value.toLowerCase();
    // Increase the number of suggestions to show and improve the filtering method
    const filteredSuggestions = POPULAR_CITIES.filter(city => 
      city.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 10); // Show more suggestions (10 instead of 5)
    
    setSuggestions(filteredSuggestions);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="Escribe tu destino"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className="w-full"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ScrollArea className="max-h-60">
            <div className="py-1">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-sm hover:bg-maletapp-lightGray cursor-pointer"
                  onMouseDown={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default DestinationAutocomplete;
