
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Calendar, User } from "lucide-react";


// Mock data
const mockServiceNotes = [
  {
    id: "1",
    title: "Procédures d'accueil des nouveaux stagiaires",
    content: "Mise à jour des procédures d'accueil pour les nouveaux stagiaires. Tous les encadreurs doivent s'assurer que les stagiaires reçoivent leur kit d'accueil dans les 48h suivant leur arrivée.",
    summary: "Mise à jour des procédures d'accueil - Kit obligatoire sous 48h",
    publishDate: "2025-06-14",
    author: "Direction RH",
    priority: "urgent",
    pdfUrl: "/documents/note-accueil-2025.pdf"
  },
  {
    id: "2",
    title: "Horaires d'été et pause déjeuner",
    content: "À partir du 1er juillet, les horaires d'été sont en vigueur. Travail de 7h30 à 15h30 avec pause déjeuner de 12h à 13h. Les stagiaires doivent respecter ces horaires.",
    summary: "Horaires d'été : 7h30-15h30 avec pause 12h-13h",
    publishDate: "2025-06-13",
    author: "Direction Générale",
    priority: "normal"
  },
  {
    id: "3",
    title: "Formation sécurité obligatoire",
    content: "Tous les nouveaux stagiaires doivent suivre la formation sécurité dans leur première semaine. Inscription auprès du service HSE.",
    summary: "Formation sécurité obligatoire - Première semaine",
    publishDate: "2025-06-10",
    author: "Service HSE",
    priority: "urgent"
  },
  {
    id: "4",
    title: "Mise à jour des badges d'accès",
    content: "Les badges d'accès des stagiaires seront mis à jour le 20 juin. Prévoir une nouvelle photo d'identité.",
    summary: "Renouvellement badges - Photo requise",
    publishDate: "2025-06-08",
    author: "Service Sécurité",
    priority: "info"
  }
];

export function SecretaryServiceNotesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredNotes = mockServiceNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === "all" || note.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'normal':
        return <Badge className="bg-blue-100 text-blue-800">Normal</Badge>;
      case 'info':
        return <Badge className="bg-gray-100 text-gray-800">Info</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const handleDownload = (note) => {
    if (note.pdfUrl) {
      // In real app, this would trigger actual download
      console.log(`Téléchargement de ${note.title}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Notes de Service</h1>
        <p className="text-gray-600">Publications et consignes de la Direction RH</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Recherche et filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher dans les notes de service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-port-blue"
              >
                <option value="all">Toutes les priorités</option>
                <option value="urgent">Urgent</option>
                <option value="normal">Normal</option>
                <option value="info">Information</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-port-navy text-lg mb-2">{note.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(note.publishDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {note.author}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(note.priority)}
                  {note.pdfUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(note)}
                      className="text-port-blue border-port-blue hover:bg-port-blue hover:text-white"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-l-port-blue">
                  <p className="font-medium text-sm text-port-navy">Résumé :</p>
                  <p className="text-sm text-gray-700">{note.summary}</p>
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">{note.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNotes.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-gray-500">
              Aucune note de service trouvée avec ces critères de recherche.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
