import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from 'react-icons/bs';


function StageForm() {

  const [userData, setUserData] = useState(null); // Ajout d'un état pour les données utilisateur

  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    contactUrgent: '',
    directions: [],
    cv: null,
    lettre: null,
    consentement: false,
    typeStage: '',
    nomEtablissement: '',
    adresseEtablissement: '',
    message: '',
    filiere: '',
    anneeAcademique: '',
    dateDebut: '',
    dateFin: '',
  });

  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [directions, setDirections] = useState([]);
  const [loadingDirections, setLoadingDirections] = useState(true);
  const [directionsError, setDirectionsError] = useState('');

  
   useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Non authentifié");
        }

        const response = await fetch('http://localhost:8080/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Token invalide");
        }

        // Récupérer les données de l'utilisateur
        const userResponse = await fetch('http://localhost:8080/api/users/validate-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (userResponse.ok) {
          const user = await userResponse.json();
          setUserData(user);
          // Pré-remplir les champs non modifiables
          setFormData(prev => ({
            ...prev,
            civilite: user.civilite,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
          }));
        }

        setIsAuthenticated(true);
      } catch (err) {
        setError("Vous devez être connecté pour accéder à cette page");
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
 const fetchDirections = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/users/directions', {
      method: 'GET',
      mode: 'cors', // Explicitement activer CORS
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    setDirections(data);
  } catch (err) {
    console.error('Échec du chargement:', err);
    setDirectionsError(err.message);
    // Redirection si token invalide
    if (err.message.includes('401') || err.message.includes('token')) {
      navigate('/login');
    }
  } finally {
    setLoadingDirections(false);
  }
};
    if (isAuthenticated) {
      fetchDirections();
    }
  }, [isAuthenticated]);

 const handleDirectionChange = (e) => {
    const { value, checked } = e.target;
    const direction = directions.find(d => d.nom === value);
    
    if (checked) {
        // Vérifier si la direction est complète
        if (direction.placesOccupees >= direction.placesTotales) {
            alert(`Plus de places disponibles pour ${value}`);
            return;
        }
        
        // Vérifier le nombre maximum de directions sélectionnées
        if (formData.directions.length >= 3) {
            alert("Vous ne pouvez sélectionner que 3 directions maximum");
            return;
        }
        
        setFormData({
            ...formData,
            directions: [...formData.directions, value]
        });
    } else {
        setFormData({
            ...formData,
            directions: formData.directions.filter(d => d !== value)
        });
    }
};

// Dans le rendu des checkboxes :
{directions.map((direction) => (
    <div key={direction.id} className="col-md-6 mb-2">
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                id={`dir-${direction.id}`}
                value={direction.nom}
                checked={formData.directions.includes(direction.nom)}
                onChange={handleDirectionChange}
                disabled={direction.placesOccupees >= direction.placesTotales}
            />
            <label className="form-check-label" htmlFor={`dir-${direction.id}`}>
                {direction.nom} 
                <small className="text-muted">
                    ({direction.placesOccupees}/{direction.placesTotales} places)
                </small>
                {direction.placesOccupees >= direction.placesTotales && (
                    <span className="badge bg-danger ms-2">Complet</span>
                )}
            </label>
        </div>
    </div>
))}

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

  const handleCancel = () => {
    setFormData({
      civilite: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      contactUrgent: '',
      directions: [],
      cv: null,
      lettre: null,
      consentement: false,
      typeStage: '',
      nomEtablissement: '',
      adresseEtablissement: '',
      message: '',
      filiere: '',
      anneeAcademique: '',
      dateDebut: '',
      dateFin: '',
    });
    
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Non authentifié");
      }

      const data = new FormData();
      for (const key in formData) {
        if (key === "directions") {
          formData.directions.forEach((dir) => data.append("directions", dir));
        } else {
          data.append(key, formData[key]);
        }
      }

      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Échec de la création");
      }

      alert("Demande de stage soumise avec succès !");
      handleCancel();
    } catch (error) {
      setError(error.message);
      console.error("Erreur:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center mt-5">Redirection vers la page de connexion...</div>;
  }

  if (loadingDirections) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p>Chargement des directions...</p>
      </div>
    );
  }

  if (directionsError) {
    return (
      <div className="alert alert-danger mt-5">
        <p>Erreur lors du chargement des directions : {directionsError}</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
};


  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
  <h2 className="mb-0">Faites votre Demande de Stage ici !</h2>
  <button 
    className="btn btn-outline-light btn-sm"
    onClick={handleLogout}
  >
    Déconnexion
  </button>
</div>

        
        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Civilité - Lecture seule */}
            <div className="mb-3">
              <label className="form-label">Civilité :</label>
              <input 
                type="text" 
                className="form-control bg-light" 
                value={formData.civilite} 
                readOnly 
              />
            </div>
            
            {/* Nom - Lecture seule */}
            <div className="mb-3">
              <label className="form-label">Nom :</label>
              <input 
                type="text" 
                className="form-control bg-light" 
                value={formData.nom} 
                readOnly 
              />
            </div>
            
            {/* Prénom - Lecture seule */}
            <div className="mb-3">
              <label className="form-label">Prénom :</label>
              <input 
                type="text" 
                className="form-control bg-light" 
                value={formData.prenom} 
                readOnly 
              />
            </div>
            
            {/* Email - Lecture seule */}
            <div className="mb-3">
              <label className="form-label">Email :</label>
              <input 
                type="email" 
                className="form-control bg-light" 
                value={formData.email} 
                readOnly 
              />
            </div>

             <div className="mb-3">
              <label className="form-label">Telephone :</label>
              <input type="telephone" className="form-control" name="telephone" value={formData.telephone} onChange={handleChange} required />
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
              <label className="form-label">Annee Academique :</label>
              <input type="text" className="form-control" name="anneeAcademique" value={formData.anneeAcademique} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Filiere :</label>
              <input type="text" className="form-control" name="filiere" value={formData.filiere} onChange={handleChange} />
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
              <label className="form-label">Date de debut :</label>
              <input type="date" className="form-control" name="dateDebut" value={formData.dateDebut} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Date de Fin :</label>
              <input type="date" className="form-control" name="dateFin" value={formData.dateFin} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Message :</label>
              <textarea 
                className="form-control" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="4"
                placeholder="Rédiger votre demande en quelques lignes"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Directions (maximum 3):</label>
              <div className="row">
                {directions.map((direction) => (
                  <div key={direction.id} className="col-md-6 mb-2">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`dir-${direction.id}`}
                        value={direction.nom}
                        checked={formData.directions.includes(direction.nom)}
                        onChange={handleDirectionChange}
                        disabled={direction.placesOccupees >= direction.placesTotales}
                      />
                      <label className="form-check-label" htmlFor={`dir-${direction.id}`}>
                        {direction.nom} 
                        <small className="text-muted">
                          ({direction.placesOccupees} places occupées/{direction.placesTotales} places)
                        </small>
                        {direction.placesOccupees >= direction.placesTotales && (
                          <span className="badge bg-danger ms-2">Complet</span>
                        )}
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
              <div className="mt-4 d-flex justify-content-start">
  <button
    variant="outline-secondary"
    className="px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2"
    onClick={() => navigate('/')}
  >
    <BsArrowLeftCircleFill size={20} />
    Retourner à l'accueil
  </button>
</div>           
          </form>
        </div>
      </div>
    </div>
  );
}

export default StageForm;