// AppointmentForm.js
import React, { useState } from 'react';

const AppointmentForm = ({ onBookAppointment, selectedSpeciality, lat, lng, hospitalName, distance, hospitalTime }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        date: '',
        time: '', // Add time field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form data here if needed

        try {
            // Make the API call to create an appointment
            const response = await fetch('http://localhost:8080/appointment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: lat,
                    longitude: lng,
                    speciality: selectedSpeciality,
                    patientName: formData.firstName + " " + formData.lastName,
                    hospitalName: hospitalName,
                    time: formData.date + " " + formData.time
                }),
            });

            if (response.ok) {
                // La requête a réussi, tu peux traiter la réponse si nécessaire
                const responseData = await response;
                console.log('Appointment booked successfully:', responseData);

                // Réinitialise le formulaire après la réservation
                setFormData({
                    firstName: '',
                    lastName: '',
                    date: '',
                    time: '',
                });

                // Appelle la fonction de rappel pour indiquer le succès
                onBookAppointment(formData);
            } else {
                // La requête a échoué avec un statut différent de 200 OK
                throw new Error(`Failed to book appointment. Status: ${response.status}`);
            }

        } catch (error) {
            // Handle errors, you can show an error message to the user
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <div className="appointment-form">
            <div>
                <h3>L'hopital le plus proche est : {hospitalName}, il se situe a {distance} et est a {hospitalTime} en voiture. Voulez vous prendre un rendez vous ?</h3>
            </div>
            <h2>Prendre un rendez vous</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Prenom:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Nom:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Heure:
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Book Appointment</button>
            </form>
        </div>
        
    );
};

export default AppointmentForm;
