
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PlayCircle } from "lucide-react";


export function RepriseRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Demande de reprise:", data);
    
    toast({
      title: "Demande envoyée",
      description: "Votre demande de reprise a été envoyée.",
      variant: "default",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="dateReprise">Date de reprise souhaitée *</Label>
        <Input
          id="dateReprise"
          type="date"
          {...register("dateReprise", { required: "La date de reprise est requise" })}
          className="mt-1"
        />
        {errors.dateReprise && (
          <p className="text-sm text-red-600 mt-1">{errors.dateReprise.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="commentaire">Commentaire (facultatif)</Label>
        <Textarea
          id="commentaire"
          placeholder="Ajoutez un commentaire si nécessaire..."
          {...register("commentaire")}
          className="mt-1"
          rows={3}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <PlayCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <PlayCircle className="mr-2 h-4 w-4" />
        )}
        {isSubmitting ? "Envoi en cours..." : "Soumettre"}
      </Button>
    </form>
  );
}
