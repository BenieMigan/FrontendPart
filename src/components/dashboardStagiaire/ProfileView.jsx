
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, GraduationCap, Edit3 } from "lucide-react";

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Amina",
    lastName: "KOUASSI", 
    email: "amina.kouassi@etudiant.com",
    phone: "+229 97 45 32 18",
    address: "Quartier Zongo, Cotonou",
    school: "Université d'Abomey-Calavi",
    field: "Gestion des Entreprises",
    level: "Master 1",
    bio: "Étudiante en gestion d'entreprise passionnée par le secteur portuaire et le commerce international."
  });

  const handleSave = () => {
    setIsEditing(false);
    // Ici on sauvegarderait les données
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Mon profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles et académiques</p>
      </div>

      {/* Photo et infos principales */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-port-blue rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-port-navy text-2xl">
                  {profileData.firstName} {profileData.lastName}
                </CardTitle>
                <CardDescription className="text-lg">
                  {profileData.field} • {profileData.level}
                </CardDescription>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="border-port-blue text-port-blue hover:bg-port-blue hover:text-white"
            >
              <Edit3 className="mr-2 h-4 w-4" />
              {isEditing ? "Annuler" : "Modifier"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Informations personnelles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy flex items-center">
            <User className="mr-2 h-5 w-5" />
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input 
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input 
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                Email
              </Label>
              <Input 
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="mr-1 h-4 w-4" />
                Téléphone
              </Label>
              <Input 
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              Adresse
            </Label>
            <Input 
              id="address"
              value={profileData.address}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Présentation</Label>
            <Textarea 
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              disabled={!isEditing}
              className="min-h-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Informations académiques */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Formation académique
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school">Établissement</Label>
              <Input 
                id="school"
                value={profileData.school}
                onChange={(e) => setProfileData({...profileData, school: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Niveau</Label>
              <Input 
                id="level"
                value={profileData.level}
                onChange={(e) => setProfileData({...profileData, level: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="field">Domaine d'études</Label>
            <Input 
              id="field"
              value={profileData.field}
              onChange={(e) => setProfileData({...profileData, field: e.target.value})}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(false)}
            className="border-port-navy text-port-navy"
          >
            Annuler
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-port-blue hover:bg-port-blue/90"
          >
            Enregistrer les modifications
          </Button>
        </div>
      )}
    </div>
  );
}
