import React, { useState } from 'react';

const AppointmentForm = ({ onBookAppointment, selectedSpeciality, lat, lng, hospitalName, distance, hospitalTime }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        date: '',
        time: '', 
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


        try {
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
                const responseData = await response;
                console.log('Appointment booked successfully:', responseData);

                setFormData({
                    firstName: '',
                    lastName: '',
                    date: '',
                    time: '',
                });

                onBookAppointment(formData);
            } else {
                throw new Error(`Failed to book appointment. Status: ${response.status}`);
            }

        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <div data-testid="appointment-form" className="appointment-form">
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
                <button id="bookappointment" type="submit">Valider le rendez vous</button>
            </form>
        </div>
        
    );
};

export default AppointmentForm;
