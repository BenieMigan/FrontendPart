
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Clock, FileText, PlayCircle, Upload } from "lucide-react";


export function UnifiedRequestForm() {
  const [requestType, setRequestType] = useState('pause');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Demande envoyée:", { ...data, type: requestType });
    
    let message = "";
    switch (requestType) {
      case 'pause':
        message = "Votre demande de pause a été transmise au RH.";
        break;
      case 'absence':
        message = "Votre demande a été transmise à votre encadrant.";
        break;
      case 'reprise':
        message = "Votre demande de reprise a été envoyée.";
        break;
    }
    
    toast({
      title: "Demande envoyée",
      description: message,
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

  const getIcon = () => {
    switch (requestType) {
      case 'pause':
        return <Clock className="h-5 w-5" />;
      case 'absence':
        return <FileText className="h-5 w-5" />;
      case 'reprise':
        return <PlayCircle className="h-5 w-5" />;
    }
  };

  const getButtonColor = () => {
    switch (requestType) {
      case 'pause':
        return "bg-port-blue hover:bg-port-blue/90";
      case 'absence':
        return "bg-port-gold hover:bg-port-gold/90 text-port-navy";
      case 'reprise':
        return "bg-green-600 hover:bg-green-700";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Type de demande */}
      <div>
        <Label className="text-base font-semibold">Type de demande *</Label>
        <RadioGroup
          value={requestType}
          onValueChange={(value) => setRequestType(value)}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pause" id="pause" />
            <Label htmlFor="pause" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Demande de pause
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="absence" id="absence" />
            <Label htmlFor="absence" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Demande d'absence
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reprise" id="reprise" />
            <Label htmlFor="reprise" className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4" />
              Demande de reprise
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Champs pour demande de pause */}
      {requestType === 'pause' && (
        <>
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
        </>
      )}

      {/* Champs pour demande d'absence */}
      {requestType === 'absence' && (
        <>
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
        </>
      )}

      {/* Champs pour demande de reprise */}
      {requestType === 'reprise' && (
        <>
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
        </>
      )}

      <Button 
        type="submit" 
        className={`w-full ${getButtonColor()}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            {getIcon()}
            <span className="ml-2">Envoi en cours...</span>
          </>
        ) : (
          <>
            {getIcon()}
            <span className="ml-2">
              {requestType === 'pause' ? 'Envoyer la demande' : 
               requestType === 'absence' ? 'Envoyer la demande' : 
               'Soumettre'}
            </span>
          </>
        )}
      </Button>
    </form>
  );
}
