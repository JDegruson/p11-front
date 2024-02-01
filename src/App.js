import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AddressForm from './components/AddressForm';
import AppointmentsPage from './components/AppointmentsPage';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useLocalState } from './components/useLocalStorage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const [appointmentsVisible, setAppointmentsVisible] = useState(false);
    const [jwt, setJwt] = useLocalState('', "jwt");

    const handleNavigateBack = () => {
        setAppointmentsVisible(false);
    };

    const login = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return (
        <Router>
            <div>
                <Helmet>
                    <title>P11</title>
                </Helmet>
                <nav>
                    <ul>
                        {jwt ? (
                            <>
                                <li>
                                    <Link to="/appointments">Rendez vous</Link>
                                </li>
                                <li>
                                    <Link to="/appointment">Prendre un rendez vous</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>
                <Routes>
                    <Route
                        path="/appointments"
                        element={
                            <PrivateRoute><AppointmentsPage/></PrivateRoute>}
                    />
                    <Route
                        path="/appointment"
                        element={<PrivateRoute><AddressForm /></PrivateRoute>}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
