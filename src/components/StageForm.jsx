import { useState, useEffect } from "react";

function StageForm() {
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    contactUrgent: '',
    directions: [],
    cv: null,
    lettre: null,
    consentement: false,
  });

  const [, setUsers] = useState([]);

  const handleCancel = () => {
    setFormData({
      civilite: '',
      nom: '',
      prenom: '',
      email: '',
      contactUrgent: '',
      directions: [],
      cv: null,
      lettre: null,
      consentement: false,
    });
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDirectionsChange = (e) => {
    const options = e.target.options;
    const selectedDirections = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedDirections.push(options[i].value);
      }
    }
    setFormData({ ...formData, directions: selectedDirections });
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Erreur lors du chargement des utilisateurs");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === "directions") {
        formData.directions.forEach((dir) => data.append("directions", dir));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Utilisateur créé avec succès !");
        e.target.reset();
        setFormData({
          civilite: '',
          nom: '',
          prenom: '',
          email: '',
          contactUrgent: '',
          directions: [],
          cv: null,
          lettre: null,
          consentement: false,
        });
        fetchUsers();
      } else {
        const errorData = await response.json();
        alert(`Erreur: ${errorData.message || "Échec de la création"}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur réseau est survenue");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center mb-0">Inscription Stagiaire</h2>
        </div>
        
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Civilité :</label>
          <select className="form-select" name="civilite" value={formData.civilite} onChange={handleChange} required>
            <option value="">-- Choisir --</option>
            <option value="M.">M.</option>
            <option value="Mme">Mme</option>
            <option value="Mlle">Mlle</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Nom :</label>
          <input type="text" className="form-control" name="nom" value={formData.nom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Prénom :</label>
          <input type="text" className="form-control" name="prenom" value={formData.prenom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email :</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact d'Urgence :</label>
          <input type="text" className="form-control" name="contactUrgent" value={formData.contactUrgent} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Directions :</label>
          <select multiple className="form-select" name="directions" onChange={handleDirectionsChange}>
            <option value="Direction des infrastructures">Direction des infrastructures</option>
            <option value="Direction commerciale et du marketing">Direction commerciale et du marketing</option>
            <option value="Direction des Operations Portuaires et de la sécurité">Direction des Operations Portuaires et de la sécurité</option>
            <option value="Direction du controle des marchés Publics">Direction du controle des marchés Publics</option>
            <option value="Direction de l'Administration et des Finances">Direction de l'Administration et des Finances</option>
            <option value="Direction des Marchés Publics">Direction des Marchés Publics</option>
            <option value="Capitainerie du Port">Capitainerie du Port</option>
            <option value="Direction de l'Audit Interne et du Contrôle Financier">Direction de l'Audit Interne et du Contrôle Financier</option>
            <option value="Département des Ressources Humaines">Département des Ressources Humaines</option>
            <option value="Département des Systèmes d'information">Département des Systèmes d'information</option>
            <option value="Département Qualité Santé Environnement">Département Qualité Santé Environnement</option>
            <option value="Direction des Affaires Juridiques et du Contentieux">Direction des Affaires Juridiques et du Contentieux</option>
            <option value="Direction Générale">Direction Générale</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">CV :</label>
          <input type="file" className="form-control" name="cv" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Lettre de Motivation :</label>
          <input type="file" className="form-control" name="lettre" onChange={handleChange} required />
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" name="consentement" checked={formData.consentement} onChange={handleChange} />
          <label className="form-check-label">J'accepte les conditions</label>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-primary">
            Soumettre
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Annuler
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
}

export default StageForm;