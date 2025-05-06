import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AssuranceUpload() {
  const { id: stagiaireId } = useParams(); // Récupère l'ID depuis l'URL
  const [assuranceFile, setAssuranceFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setAssuranceFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assuranceFile) {
      setMessage('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('assurance', assuranceFile);
    formData.append('stagiaireId', stagiaireId);

    try {
      await axios.post('http://localhost:8080/api/stagiaires/upload-assurance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Fichier envoyé avec succès !');
    } catch (error) {
      setMessage("Erreur lors de l'envoi.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Envoi de l'assurance</h4>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <input type="file" onChange={handleFileChange} accept=".pdf,.jpg,.png" className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Envoyer</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default AssuranceUpload;
