
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Send, Eye, Edit, Trash2, Upload, Download } from "lucide-react";


// Mock data
const mockServiceNotes = [
  {
    id: "1",
    title: "Procédures d'accueil des nouveaux stagiaires",
    content: "Mise à jour des procédures d'accueil pour les nouveaux stagiaires. Tous les encadreurs doivent s'assurer que les stagiaires reçoivent leur kit d'accueil dans les 48h suivant leur arrivée. Le kit comprend : badge d'accès, plan du port, consignes de sécurité, contact du responsable RH.",
    author: "Direction RH",
    publishDate: "2025-06-14",
    targetAudience: "tous",
    priority: "urgent",
    attachmentUrl: "/documents/note-accueil-2025.pdf"
  },
  {
    id: "2",
    title: "Horaires d'été et pause déjeuner",
    content: "À partir du 1er juillet, les horaires d'été sont en vigueur. Travail de 7h30 à 15h30 avec pause déjeuner de 12h à 13h. Les stagiaires doivent respecter ces horaires strictement.",
    author: "Direction Générale",
    publishDate: "2025-06-13",
    targetAudience: "tous",
    priority: "normal"
  }
];

export function HRServiceNotesView() {
  const [notes, setNotes] = useState(mockServiceNotes);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetAudience, setTargetAudience] = useState("tous");
  const [priority, setPriority] = useState("normal");

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

  const getAudienceBadge = (audience) => {
    switch (audience) {
      case 'secretaires':
        return <Badge variant="outline" className="text-purple-600 border-purple-600">Secrétaires</Badge>;
      case 'encadreurs':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Encadreurs</Badge>;
      case 'tous':
        return <Badge variant="outline" className="text-green-600 border-green-600">Tous</Badge>;
      default:
        return <Badge variant="outline">{audience}</Badge>;
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newNote = {
      id: editingNote?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      author: "Direction RH",
      publishDate: new Date().toISOString().split('T')[0],
      targetAudience,
      priority
    };

    if (editingNote) {
      setNotes(prev => prev.map(note => note.id === editingNote.id ? newNote : note));
    } else {
      setNotes(prev => [newNote, ...prev]);
    }

    resetForm();
    console.log(`Note ${editingNote ? 'modifiée' : 'créée'}:`, newNote);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTargetAudience("tous");
    setPriority("normal");
    setShowCreateForm(false);
    setEditingNote(null);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTargetAudience(note.targetAudience);
    setPriority(note.priority);
    setShowCreateForm(true);
  };

  const handleDelete = (noteId) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette note de service ?")) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
      console.log(`Note ${noteId} supprimée`);
    }
  };

  const handleDownload = (note) => {
    if (note.attachmentUrl) {
      console.log(`Téléchargement de ${note.attachmentUrl}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-port-navy mb-2">Gestion des Notes de Service</h1>
          <p className="text-gray-600">Publication et gestion des communications internes</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-port-blue hover:bg-port-blue/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle note
        </Button>
      </div>

      {/* Formulaire de création/édition */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy">
              {editingNote ? "Modifier la note de service" : "Créer une nouvelle note de service"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre de la note de service"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Public cible
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value )}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-port-blue"
                >
                  <option value="tous">Tous (Secrétaires + Encadreurs)</option>
                  <option value="secretaires">Secrétaires uniquement</option>
                  <option value="encadreurs">Encadreurs uniquement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priorité
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value )}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-port-blue"
                >
                  <option value="info">Information</option>
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenu de la note *
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Rédigez le contenu de votre note de service..."
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichier joint (optionnel)
              </label>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Joindre un fichier PDF
              </Button>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={!title.trim() || !content.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                {editingNote ? "Modifier" : "Publier"} la note
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des notes publiées */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">
            Notes de service publiées ({notes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Public</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Date publication</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{note.title}</div>
                      <div className="text-sm text-gray-500 max-w-md truncate">
                        {note.content}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getAudienceBadge(note.targetAudience)}</TableCell>
                  <TableCell>{getPriorityBadge(note.priority)}</TableCell>
                  <TableCell>
                    {new Date(note.publishDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>{note.author}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(note)}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {note.attachmentUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(note)}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(note.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {notes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Send className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune note de service publiée</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => setShowCreateForm(true)}
              >
                Créer la première note
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
