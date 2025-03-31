
import React from 'react';
import { cn } from '@/lib/utils';
import { ACTIVITIES } from '@/data/mockData';
import { ActivityType } from '@/types';
import { 
  User, 
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
      case 'hiking':
        return <Users size={36} className="text-maletapp-blue" />;
      case 'sports':
        return <User size={36} className="text-maletapp-blue" />;
      case 'formal':
        return <Calendar size={36} className="text-maletapp-blue" />;
      default:
        return <User size={36} className="text-maletapp-blue" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {ACTIVITIES.map((activity) => (
        <div
          key={activity.type}
          className={cn(
            "activity-card border rounded-lg",
            selected.includes(activity.type) ? "selected" : ""
          )}
          onClick={() => onSelect(activity.type)}
        >
          {getIcon(activity.type)}
          <span className="text-sm font-medium">{activity.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesSelector;
