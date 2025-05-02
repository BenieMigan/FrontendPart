import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadAssurance() {
    const [file, setFile] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        if (!token) {
            setError("Token manquant dans l'URL");
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/validate-token?token=${token}`);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError("Token invalide ou expiré");
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setError("Veuillez sélectionner un fichier");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('token', token);

            const response = await axios.put(
                `http://localhost:8080/api/users/${user.id}/upload-assurance`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setSuccess(true);
            setTimeout(() => navigate('/confirmation'), 3000);
        } catch (err) {
            setError("Erreur lors de l'upload du fichier");
        }
    };

    if (loading) {
        return <div className="container mt-5">Chargement en cours...</div>;
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="container mt-5">
                <div className="alert alert-success">
                    Fiche d'assurance uploadée avec succès ! Redirection en cours...
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Finalisation de votre candidature</h2>
                </div>
                <div className="card-body">
                    <p>Bonjour {user.prenom} {user.nom},</p>
                    <p>
                        Veuillez uploader votre fiche d'assurance pour finaliser votre candidature.
                        Le fichier doit être au format PDF, JPG ou PNG et ne doit pas dépasser 5Mo.
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="ficheAssurance" className="form-label">
                                Fiche d'assurance
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="ficheAssurance"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="btn btn-primary">
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UploadAssurance;