// src/components/BookBedButton.js
import React from 'react';
import './BookBedButton.css';

const BookBedButton = () => {
  const handleBookBed = () => {
    // Ajoute ici le code pour gérer l'action "Réserver un lit"
    console.log("Réserver un lit");
  };

  return (
    <button onClick={handleBookBed}>
      Réserver un lit
    </button>
  );
};

export default BookBedButton;
