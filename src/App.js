// src/App.js
import React from 'react';
import FindHospitalButton from './components/FindHospitalButton';
import BookBedButton from './components/BookBedButton';
import AddressForm from './components/AddressForm';



function App() {

  return (
    <div className="App">
      <BookBedButton />
      <FindHospitalButton />
      <AddressForm />
    </div>
    
  );
}

export default App;
