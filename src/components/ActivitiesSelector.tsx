
import React from 'react';
import { cn } from '@/lib/utils';
import { ACTIVITIES } from '@/data/mockData';
import { ActivityType } from '@/types';
import { 
  MapPin, 
  Users, 
  Calendar, 
  CloudSun 
} from 'lucide-react';

interface ActivitiesSelectorProps {
  selected: ActivityType[];
  onSelect: (type: ActivityType) => void;
}

const ActivitiesSelector: React.FC<ActivitiesSelectorProps> = ({ selected, onSelect }) => {
  const getIcon = (type: ActivityType) => {
    switch(type) {
      case 'beach':
        return <CloudSun size={36} className="text-maletapp-orange" />;
      case 'city':
        return <MapPin size={36} className="text-maletapp-blue" />;
      case 'sports':
        return <Users size={36} className="text-maletapp-blue" />;
      case 'formal':
        return <Calendar size={36} className="text-maletapp-blue" />;
      default:
        return <MapPin size={36} className="text-maletapp-blue" />;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ACTIVITIES.map((activity) => (
          <div
            key={activity.type}
            className={cn(
              "activity-card border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors",
              selected.includes(activity.type) 
                ? "border-maletapp-blue bg-blue-50" 
                : "border-gray-200 hover:border-maletapp-blue hover:bg-blue-50/50"
            )}
            onClick={() => onSelect(activity.type)}
          >
            {getIcon(activity.type)}
            <span className="text-sm font-medium mt-2">{activity.name}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Las actividades son opcionales. Si no seleccionas ninguna, se recomendarán prendas de uso general.
      </p>
    </div>
  );
};

export default ActivitiesSelector;
