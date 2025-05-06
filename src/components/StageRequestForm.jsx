import React, { useState, useEffect } from 'react';

const StageRequestForm = ({ departments, onSubmit }) => {
    const [selectedDepartments, setSelectedDepartments] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedDepartments((prev) =>
            prev.includes(value)
                ? prev.filter((dep) => dep !== value)
                : [...prev, value]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(selectedDepartments);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sélectionnez les départements</h2>
            {departments.map((dep) => (
                <label key={dep.id}>
                    <input
                        type="checkbox"
                        value={dep.id}
                        onChange={handleChange}
                        disabled={dep.capacity <= 0}  // Désactiver si plus de places
                    />
                    {dep.name} - Places disponibles: {dep.capacity}
                </label>
            ))}
            <button type="submit">Soumettre la demande</button>
        </form>
    );
};

export default StageRequestForm;
