
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload } from "lucide-react";


export function AbsenceRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Demande d'absence:", data);
    console.log("Fichier:", selectedFile);
    
    toast({
      title: "Demande envoyée",
      description: "Votre demande a été transmise à votre encadrant.",
      variant: "default",
    });
    
    reset();
    setSelectedFile(null);
    setIsSubmitting(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="motif-absence">Motif de l'absence *</Label>
        <Textarea
          id="motif-absence"
          placeholder="Expliquez le motif de votre absence..."
          {...register("motif", { required: "Le motif est requis" })}
          className="mt-1"
        />
        {errors.motif && (
          <p className="text-sm text-red-600 mt-1">{errors.motif.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="dateAbsence">Date de l'absence *</Label>
        <Input
          id="dateAbsence"
          type="date"
          {...register("dateAbsence", { required: "La date d'absence est requise" })}
          className="mt-1"
        />
        {errors.dateAbsence && (
          <p className="text-sm text-red-600 mt-1">{errors.dateAbsence.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="pieceJustificative">Pièce justificative</Label>
        <div className="mt-1">
          <Input
            id="pieceJustificative"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            {...register("pieceJustificative")}
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-port-blue file:text-white hover:file:bg-port-blue/90"
          />
          {selectedFile && (
            <p className="text-sm text-gray-600 mt-1">
              Fichier sélectionné : {selectedFile.name}
            </p>
          )}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-port-gold hover:bg-port-gold/90 text-port-navy"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Upload className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileText className="mr-2 h-4 w-4" />
        )}
        {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
      </Button>
    </form>
  );
}
