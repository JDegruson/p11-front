import React, { useState, useEffect } from 'react';
import { useLocalState } from './useLocalStorage';

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [jwt, setJwt] = useLocalState('', 'jwt');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
    }

    useEffect(() => {


        const fetchData = async () => {
            fetch("http://localhost:8080/appointment/appointments", {
                method: 'GET',
                headers: headers,
            }).then((response) => {
                if (response.status == 200) return response.json();
            }).then((data) => {
                setAppointments(data);
            })
            
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
