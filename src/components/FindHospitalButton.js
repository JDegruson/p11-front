// src/components/FindHospitalButton.js
import React from 'react';
import './FindHospitalButton.css';

const FindHospitalButton = () => {
  const handleFindHospital = () => {
    // Ajoute ici le code pour gérer l'action "Trouver l'hôpital le plus proche"
    console.log("Trouver l'hôpital le plus proche");
  };

  return (
    <button onClick={handleFindHospital}>
      Trouver l'hôpital le plus proche
    </button>
  );
};

export default FindHospitalButton;
