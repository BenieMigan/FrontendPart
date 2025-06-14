import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { ArrowLeft, Upload, FileText, User, Calendar, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PortLogo from '@/components/PortLogo';

const formSchema = z.object({
    civilite: z.string().min(1, 'Veuillez sélectionner une civilité'), 
    nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    telephone: z.string().min(8, 'Numéro de téléphone invalide'),
    typeStage: z.string().min(1, 'Veuillez sélectionner un type de stage'),
    dateDebut: z.string().min(1, 'Date de début requise'),
    dateFin: z.string().min(1, 'Date de fin requise'),
    specialite: z.string().min(2, 'Spécialité requise'),
    etablissement: z.string().min(2, 'Établissement requis'),
    adresse: z.string().min(5, 'Adresse complète requise'),
    motivations: z.string().min(50, 'Motivations requises (minimum 50 caractères)'),
    directions: z.array(z.string())
    .min(1, 'Veuillez sélectionner au moins une direction')
    .max(3, 'Vous ne pouvez sélectionner que trois directions maximum'),
});

const DemandeStage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          directions: []
        }
    });

    const onSubmit = async (data) => {
        console.log('Données du formulaire:', data); // Ajoutez ceci
        console.log('Fichiers uploadés:', uploadedFiles); // Ajoutez ceci
        
        setIsSubmitting(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          toast.message("Demande envoyée avec succès !", {
            description: "Votre demande de stage a été soumise...",
          });
          
          navigate('/dashboard'); // Modifié pour aller vers /dashboard
        } catch (error) {
          console.error('Erreur lors de la soumission:', error);
          toast.error("Une erreur est survenue lors de l'envoi");
        } finally {
          setIsSubmitting(false);
        }
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files || []);
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const removeFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Ajoutez cet état en haut de votre composant
    const [selectedStageType, setSelectedStageType] = useState('');

    // Modifiez votre schéma pour inclure la gestion du changement de type de stage
    const handleTypeStageChange = (e) => {
        setSelectedStageType(e.target.value);
    };

    // Ajoutez cet objet qui mappe les types de stage aux notes
    const stageTypeNotes = {
        'application': "Pour un stage académique obligatoire, veuillez fournir : CV, Une lettre de recommandation de l’établissement de formation",
        'professionnel': "Pour un stage professionnel, veuillez fournir : CV détaillé, lettre de motivation, copies des diplômes et attestations de travail si applicable."
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <PortLogo />
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/')}
                            className="text-port-navy"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour à l'accueil
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <Toaster />
                <div className="max-w-4xl mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-port-navy mb-4">
                            Demande de stage
                        </h1>
                        <p className="text-lg text-gray-600">
                            Remplissez ce formulaire pour soumettre votre demande de stage au Port Autonome de Cotonou
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <form onSubmit={handleSubmit(onSubmit, (errors) => {
                            console.log('Erreurs de validation:', errors);
                            toast.error("Veuillez corriger les erreurs dans le formulaire");
                            })} className="space-y-8">

                            {/* Section Informations personnelles */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                                    <User className="w-6 h-6 text-port-navy" />
                                    <h2 className="text-xl font-semibold text-port-navy">Informations personnelles</h2>
                                </div>
                                 {/* Ajoutez ce bloc pour la civilité */}
                                <div>
                                    <Label className="block mb-3">Civilité *</Label>
                                    <div className="flex space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                        type="radio"
                                        id="civilite-m"
                                        value="M"
                                        {...register('civilite')}
                                        className="h-4 w-4 text-port-blue focus:ring-port-blue border-gray-300"
                                        />
                                        <Label htmlFor="civilite-m" className="font-normal">M</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                        type="radio"
                                        id="civilite-mme"
                                        value="Mme"
                                        {...register('civilite')}
                                        className="h-4 w-4 text-port-blue focus:ring-port-blue border-gray-300"
                                        />
                                        <Label htmlFor="civilite-mme" className="font-normal">Mme</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                        type="radio"
                                        id="civilite-mlle"
                                        value="Mlle"
                                        {...register('civilite')}
                                        className="h-4 w-4 text-port-blue focus:ring-port-blue border-gray-300"
                                        />
                                        <Label htmlFor="civilite-mlle" className="font-normal">Mlle</Label>
                                    </div>
                                    </div>
                                    {errors.civilite && <p className="text-red-500 text-sm mt-1">{errors.civilite.message}</p>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="nom">Nom *</Label>
                                        <Input
                                            id="nom"
                                            {...register('nom')}
                                            className="mt-1"
                                            placeholder="Votre nom"
                                        />
                                        {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="prenom">Prénom *</Label>
                                        <Input
                                            id="prenom"
                                            {...register('prenom')}
                                            className="mt-1"
                                            placeholder="Votre prénom"
                                        />
                                        {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register('email')}
                                            className="mt-1"
                                            placeholder="votre.email@exemple.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="telephone">Téléphone *</Label>
                                        <Input
                                            id="telephone"
                                            {...register('telephone')}
                                            className="mt-1"
                                            placeholder="+229 XX XX XX XX"
                                        />
                                        {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="adresse">Adresse complète *</Label>
                                    <Textarea
                                        id="adresse"
                                        {...register('adresse')}
                                        className="mt-1"
                                        placeholder="Votre adresse complète"
                                        rows={3}
                                    />
                                    {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse.message}</p>}
                                </div>
                            </div>

                            {/* Section Informations de stage */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                                    <Calendar className="w-6 h-6 text-port-navy" />
                                    <h2 className="text-xl font-semibold text-port-navy">Informations de stage</h2>
                                </div>

                                <div className='grid grid-cols-1'>
                                    <Label htmlFor="typeStage">Type de stage *</Label>
                                    <select
                                        id="typeStage"
                                        {...register('typeStage')}
                                        onChange={(e) => {
                                            register('typeStage').onChange(e); // Pour garder le fonctionnement de react-hook-form
                                            handleTypeStageChange(e);
                                        }}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-port-blue"
                                    >
                                        <option value="">Sélectionnez un type</option>
                                        <option value="application">Stage académique</option>
                                        <option value="professionnel">Stage professionnel</option>
                                    </select>
                                    {errors.typeStage && <p className="text-red-500 text-sm mt-1">{errors.typeStage.message}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="dateDebut">Date de début *</Label>
                                        <Input
                                            id="dateDebut"
                                            type="date"
                                            {...register('dateDebut')}
                                            className="mt-1"
                                        />
                                        {errors.dateDebut && <p className="text-red-500 text-sm mt-1">{errors.dateDebut.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="dateFin">Date de fin *</Label>
                                        <Input
                                            id="dateFin"
                                            type="date"
                                            {...register('dateFin')}
                                            className="mt-1"
                                        />
                                        {errors.dateFin && <p className="text-red-500 text-sm mt-1">{errors.dateFin.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Section Formations */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                                    <GraduationCap className="w-6 h-6 text-port-navy" />
                                    <h2 className="text-xl font-semibold text-port-navy">Formation</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="specialite">Spécialité *</Label>
                                        <Input
                                            id="specialite"
                                            {...register('specialite')}
                                            className="mt-1"
                                            placeholder="Ex: Logistique, Commerce International..."
                                        />
                                        {errors.specialite && <p className="text-red-500 text-sm mt-1">{errors.specialite.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="etablissement">Établissement *</Label>
                                        <Input
                                            id="etablissement"
                                            {...register('etablissement')}
                                            className="mt-1"
                                            placeholder="Nom de votre établissement"
                                        />
                                        {errors.etablissement && <p className="text-red-500 text-sm mt-1">{errors.etablissement.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="motivations">Messages *</Label>
                                    <Textarea
                                        id="motivations"
                                        {...register('motivations')}
                                        className="mt-1"
                                        placeholder="Expliquez vos motivations pour ce stage (minimum 50 caractères)"
                                        rows={4}
                                    />
                                    {errors.motivations && <p className="text-red-500 text-sm mt-1">{errors.motivations.message}</p>}
                                </div>
                            </div>

                            {/* Section Documents */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                                    <FileText className="w-6 h-6 text-port-navy" />
                                    <h2 className="text-xl font-semibold text-port-navy">Documents</h2>
                                </div>

                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                    <div className="flex flex-col items-center text-center">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-lg font-medium text-gray-600 mb-2">
                                            Téléchargez vos documents
                                        </p>

                                        {/* Affichez la note en fonction du type de stage sélectionné */}
                                        {selectedStageType ? (
                                            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md mb-4 text-left w-full">
                                                {stageTypeNotes[selectedStageType]}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500 mb-4">
                                                Veuillez d'abord sélectionner un type de stage pour voir les documents requis
                                            </p>
                                        )}

                                        <div className="relative">
                                            <input
                                                type="file"
                                                multiple
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileUpload}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                id="file-upload"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="cursor-pointer"
                                            >
                                                <label htmlFor="file-upload" className="cursor-pointer">
                                                    Choisir des fichiers
                                                </label>
                                            </Button>
                                        </div>
                                    </div>


                                    {uploadedFiles.length > 0 && (
                                        <div className="mt-6">
                                            <h4 className="font-medium text-gray-700 mb-3">Fichiers téléchargés :</h4>
                                            <div className="space-y-2">
                                                {uploadedFiles.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                                        <span className="text-sm text-gray-600">{file.name}</span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeFile(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            Supprimer
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Section Directions d'intérêt */}
                            <div className="space-y-6">
                            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                                <svg className="w-6 h-6 text-port-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h2 className="text-xl font-semibold text-port-navy">
                                Sélectionnez la/les direction(s) qui vous intéressent (trois maximum) *
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                "Direction des Infrastructures",
                                "Direction Commerciale et du Marketing",
                                "Direction des Opérations Portuaires et de la Sécurité",
                                "Direction du Contrôle des Marchés Publics",
                                "Direction de l'Administration et des Finances",
                                "Direction des Marchés Publics",
                                "Copitainerie du Port",
                                "Direction de l'Audit Interne et du Contrôle Financier",
                                "Département des Ressources Humaines",
                                "Département des Systèmes d'information",
                                "Département Qualité Santé Environnement",
                                "Direction des Affaires Juridiques et du Contentieux",
                                "Direction Générale"
                                ].map((direction) => (
                                <div key={direction} className="flex items-center space-x-2">
                                    <input
                                    type="checkbox"
                                    id={`direction-${direction.replace(/\s+/g, '-')}`}
                                    value={direction}
                                    {...register('directions')}
                                    className="h-4 w-4 text-port-blue focus:ring-port-blue border-gray-300 rounded"
                                    // Gestion de la limite à 3 sélections
                                    onChange={(e) => {
                                        const selected = watch('directions') || [];
                                        if (e.target.checked && selected.length >= 3) {
                                        e.target.checked = false;
                                        toast.error("Vous ne pouvez sélectionner que trois directions maximum");
                                        } else {
                                        register('directions').onChange(e);
                                        }
                                    }}
                                    />
                                    <Label htmlFor={`direction-${direction.replace(/\s+/g, '-')}`} className="font-normal">
                                    {direction}
                                    </Label>
                                </div>
                                ))}
                            </div>
                            {errors.directions && <p className="text-red-500 text-sm mt-1">{errors.directions.message}</p>}
                            </div>
                            {/* Boutons de soumission */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/')}
                                    className="flex-1"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-port-gold hover:bg-port-gold/90 text-port-navy"
                                >
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DemandeStage;
