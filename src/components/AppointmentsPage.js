import React, { useState, useEffect } from 'react';

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/appointment/appointments');
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }

                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div data-testid="appointments-page">
            <table>
                <thead>
                    <tr>
                        <th>Nom du patient</th>
                        <th>Nom de l'hopital</th>
                        <th>Date du rendez vous</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.hospitalName}</td>
                            <td>{appointment.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentsPage;
