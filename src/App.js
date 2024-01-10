import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AddressForm from './components/AddressForm';
import AppointmentsPage from './components/AppointmentsPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



function App() {
    const [appointmentsVisible, setAppointmentsVisible] = useState(false);

    const handleNavigateBack = () => {
        setAppointmentsVisible(false);
    };

    return (
        <Router>
            <div>
                <Helmet>
                    <title>Rendez vous</title>
                </Helmet>
                <nav>
                    <ul>
                        <li>
                            <Link to="/appointments">Rendez vous</Link>
                        </li>
                        <li>
                            <Link to="/appointment">Prendre un rendez vous</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route
                        path="/appointments"
                        element={<AppointmentsPage onNavigateBack={handleNavigateBack} />}
                    />
                    <Route
                        path="/appointment"
                        element={<AddressForm onNavigateBack={handleNavigateBack} />}
                    />
                </Routes>
            </div>


        </Router>


    );
}

export default App;
