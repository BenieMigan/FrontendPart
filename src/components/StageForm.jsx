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
    typeStage: '',
    nomEtablissement: '',
    adresseEtablissement: '',
    message: '',
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
      typeStage: '',
      nomEtablissement: '',
      adresseEtablissement: '',
      message: '',
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

  const handleDirectionCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedDirections = [...formData.directions];
  
    if (checked) {
      if (updatedDirections.length >= 3) {
        alert("Vous pouvez sélectionner au maximum 3 directions.");
        return;
      }
      updatedDirections.push(value);
    } else {
      updatedDirections = updatedDirections.filter(dir => dir !== value);
    }
  
    setFormData({ ...formData, directions: updatedDirections });
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
            typeStage: '',
            nomEtablissement: '',
            adresseEtablissement: '',
            message: '',
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
  <label className="form-label">Type de Stage :</label>
  <select className="form-select" name="typeStage" value={formData.typeStage} onChange={handleChange} required>
    <option value="">-- Choisir --</option>
    <option value="Stage académique">Stage académique</option>
    <option value="Stage professionnel">Stage professionnel</option>
  </select>
</div>


<div className="mb-3">
  <label className="form-label">Nom de l'Établissement :</label>
  <input type="text" className="form-control" name="nomEtablissement" value={formData.nomEtablissement} onChange={handleChange} />
</div>

<div className="mb-3">
  <label className="form-label">Adresse de l'Établissement :</label>
  <input type="text" className="form-control" name="adresseEtablissement" value={formData.adresseEtablissement} onChange={handleChange} />
</div>

<div className="mb-3">
  <label className="form-label">Message :</label>
  <textarea 
    className="form-control" 
    name="message" 
    value={formData.message} 
    onChange={handleChange} 
    rows="4"
    placeholder="Rédiger votre demande en précisant la date de début de stage et la date de fin de stage"
    required
  />
</div>
<div className="mb-3">
  <label className="form-label">Directions (maximum 3) :</label>
  <div className="row">
    {[
      "Direction des infrastructures",
      "Direction commerciale et du marketing",
      "Direction des Operations Portuaires et de la sécurité",
      "Direction du controle des marchés Publics",
      "Direction de l'Administration et des Finances",
      "Direction des Marchés Publics",
      "Capitainerie du Port",
      "Direction de l'Audit Interne et du Contrôle Financier",
      "Département des Ressources Humaines",
      "Département des Systèmes d'information",
      "Département Qualité Santé Environnement",
      "Direction des Affaires Juridiques et du Contentieux",
      "Direction Générale"
    ].map((dir, index) => (
      <div key={index} className="col-md-6">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={dir}
            checked={formData.directions.includes(dir)}
            onChange={handleDirectionCheckboxChange}
            id={`direction-${index}`}
          />
          <label className="form-check-label" htmlFor={`direction-${index}`}>
            {dir}
          </label>
        </div>
      </div>
    ))}
  </div>
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