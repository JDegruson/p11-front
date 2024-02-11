import React, { useState } from 'react';
import { useLocalState } from './useLocalStorage';

const AppointmentForm = ({ onBookAppointment, selectedSpeciality, lat, lng, hospitalName, distance, hospitalTime }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        date: '',
        time: '', 
    });
    const [jwt, setJwt] = useLocalState('', 'jwt');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch('http://localhost:8080/appointment/appointment', {
                method: 'POST',
                headers: headers,
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
                <h3>L'hopital le plus proche est : {hospitalName}, il se situe a {distance} et est a {hospitalTime} en voiture. Voulez vous reserver un lit ?</h3>
            </div>
            <h2>Reserver un lit</h2>
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
                <button id="bookappointment" type="submit">Valider la reservation de lit</button>
            </form>
        </div>
        
    );
};

export default AppointmentForm;
