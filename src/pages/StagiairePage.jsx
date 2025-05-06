import { useState } from 'react';
import StageForm from './StageForm';
import AssuranceUpload from './AssuranceUpload';

function StagiairePage() {
  const [stagiaireId, setStagiaireId] = useState(null);

  const handleAddStagiaire = async (formData) => {
    const formToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "cv" || key === "lettre") {
        formToSend.append(key, value);
      } else if (key === "directions") {
        value.forEach((dir, index) => formToSend.append(`directions[${index}]`, dir));
      } else {
        formToSend.append(key, value);
      }
    });

    const response = await fetch("http://localhost:8080/api/stagiaires", {
      method: "POST",
      body: formToSend,
    });

    const result = await response.json();
    setStagiaireId(result.id); // ⬅️ ID du stagiaire retourné par le backend
  };

  return (
    <div>
      <StageForm onAddStagiaire={handleAddStagiaire} />
      {stagiaireId && <AssuranceUpload stagiaireId={stagiaireId} />}
    </div>
  );
}

export default StagiairePage;
