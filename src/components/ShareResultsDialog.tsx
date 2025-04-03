
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Mail, Share2 } from 'lucide-react';
import { TripInfo } from '@/types';
import { LUGGAGE_TYPES } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface ShareResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripInfo: TripInfo;
  clothingItems: any[]; // You might want to type this more specifically
  usedVolume: number;
  usedWeight: number;
}

const ShareResultsDialog: React.FC<ShareResultsDialogProps> = ({
  open,
  onOpenChange,
  tripInfo,
  clothingItems,
  usedVolume,
  usedWeight
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const generateTripSummary = () => {
    if (!tripInfo.startDate || !tripInfo.endDate || !tripInfo.luggage) return '';

    const selectedLuggage = LUGGAGE_TYPES.find(l => l.type === tripInfo.luggage);
    
    let summary = `Resumen de viaje a ${tripInfo.destination}\n`;
    summary += `Fechas: ${tripInfo.startDate.toLocaleDateString('es-ES')} - ${tripInfo.endDate.toLocaleDateString('es-ES')}\n`;
    summary += `Equipaje: ${selectedLuggage?.name}\n\n`;
    
    summary += "PREVISIÓN DEL TIEMPO:\n";
    tripInfo.weatherForecasts.forEach(forecast => {
      summary += `${forecast.date}: ${forecast.min}°C - ${forecast.max}°C, ${forecast.conditions}\n`;
    });
    
    summary += "\nRECOMENDACIÓN DE ROPA:\n";
    clothingItems.forEach(item => {
      summary += `- ${item.item.name} (${item.actualQuantity})\n`;
    });
    
    summary += `\nVolumen utilizado: ${(usedVolume/1000).toFixed(1)}L de ${(selectedLuggage?.usableVolume! / 1000).toFixed(1)}L\n`;
    summary += `Peso utilizado: ${usedWeight.toFixed(1)}kg de ${selectedLuggage?.maxWeight}kg`;
    
    return summary;
  };

  const handleEmailShare = () => {
    // In a real app, you would send this to your backend
    if (!email) {
      toast({
        title: "Email requerido",
        description: "Por favor, introduce un email válido",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Email enviado",
      description: `Se ha enviado un resumen de tu viaje a ${email}`,
    });
  };

  const handleWhatsAppShare = () => {
    const summary = generateTripSummary();
    const encodedText = encodeURIComponent(summary);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const handleCopyToClipboard = () => {
    const summary = generateTripSummary();
    navigator.clipboard.writeText(summary).then(() => {
      toast({
        title: "Copiado al portapapeles",
        description: "El resumen se ha copiado correctamente"
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartir resultados</DialogTitle>
          <DialogDescription>
            Envía o comparte el resumen de tu viaje con las recomendaciones de equipaje
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleEmailShare} size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Te enviaremos un email con el resumen de tu viaje
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Otras opciones para compartir
            </label>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleWhatsAppShare} className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="outline" onClick={handleCopyToClipboard} className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                Copiar
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareResultsDialog;
