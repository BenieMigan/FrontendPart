import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const handleCancel = () => {
    if (window.confirm('Voulez-vous vraiment annuler ? Les données seront perdues.')) {
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
    }
  };

  const directions = [
    'Direction des infrastructures',
    'Direction commerciale et du marketing',
    'Direction des Operations Portuaires et de la sécurité',
    'Direction du controle des marchés Publics',
    'Direction de l\'Administration et des Finances',
    'Direction des Marchés Publics',
    'Capitainerie du Port',
    'Direction de l\'Audit Interne et du Contrôle Financier',
    'Département des Ressources Humaines',
    'Département des Systèmes d\'information',
    'Département Qualité Santé Environnement',
    'Direction des Affaires Juridiques et du Contentieux',
    'Direction Générale',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox' && name === 'directions') {
      let updated = [...formData.directions];
      if (checked) {
        if (updated.length < 3) updated.push(value);
      } else {
        updated = updated.filter((d) => d !== value);
      }
      setFormData({ ...formData, directions: updated });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    alert('Formulaire prêt à être soumis');
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <h2 className="text-center mb-4">Demande de Stage</h2>

        {/* Civilité */}
        <div className="mb-3">
          <label className="form-label">Civilité:</label>
          <div className="d-flex gap-3">
            <div>
              <input type="radio" name="civilite" value="M" onChange={handleChange} /> M
            </div>
            <div>
              <input type="radio" name="civilite" value="Mme" onChange={handleChange} /> Mme
            </div>
            <div>
              <input type="radio" name="civilite" value="Mlle" onChange={handleChange} /> Mlle
            </div>
          </div>
        </div>

        {/* Nom & Prénom */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nom *</label>
            <input
              type="text"
              name="nom"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Prénom(s) *</label>
            <input
              type="text"
              name="prenom"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>

        {/* Email & Contact */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Adresse Mail *</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Urgent *</label>
            <input
              type="tel"
              name="contactUrgent"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>

        {/* Directions */}
        <div className="mb-3">
          <p>Choix de 3 directions maximum:</p>
          <div className="row">
            {directions.map((dir, index) => (
              <div key={index} className="col-md-6">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="directions"
                    value={dir}
                    onChange={handleChange}
                    checked={formData.directions.includes(dir)}
                    className="form-check-input"
                  />
                  <label className="form-check-label">{dir}</label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CV & Lettre */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">CV *</label>
            <input
              type="file"
              name="cv"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Lettre de recommandation *</label>
            <input
              type="file"
              name="lettre"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>

        {/* Consentement */}
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              name="consentement"
              onChange={handleChange}
              required
              className="form-check-input"
            />
            <label className="form-check-label">
              J’accepte que mes informations soient utilisées pour traiter ma demande de stage.
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Envoyer la demande
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default StageForm;
