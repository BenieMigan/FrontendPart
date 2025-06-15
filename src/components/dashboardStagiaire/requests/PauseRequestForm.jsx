
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Clock } from "lucide-react";



export function PauseRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Demande de pause:", data);
    
    toast({
      title: "Demande envoyée",
      description: "Votre demande de pause a été transmise au RH.",
      variant: "default",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="motif">Motif de la pause *</Label>
        <Textarea
          id="motif"
          placeholder="Expliquez le motif de votre demande de pause..."
          {...register("motif", { required: "Le motif est requis" })}
          className="mt-1"
        />
        {errors.motif && (
          <p className="text-sm text-red-600 mt-1">{errors.motif.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="dateDebut">Date de début souhaitée *</Label>
        <Input
          id="dateDebut"
          type="date"
          {...register("dateDebut", { required: "La date de début est requise" })}
          className="mt-1"
        />
        {errors.dateDebut && (
          <p className="text-sm text-red-600 mt-1">{errors.dateDebut.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="dureeJours">Durée estimée (en jours) *</Label>
        <Input
          id="dureeJours"
          type="number"
          min="1"
          placeholder="Ex: 5"
          {...register("dureeJours", { 
            required: "La durée est requise",
            min: { value: 1, message: "La durée doit être d'au moins 1 jour" }
          })}
          className="mt-1"
        />
        {errors.dureeJours && (
          <p className="text-sm text-red-600 mt-1">{errors.dureeJours.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-port-blue hover:bg-port-blue/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Clock className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Clock className="mr-2 h-4 w-4" />
        )}
        {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
      </Button>
    </form>
  );
}
