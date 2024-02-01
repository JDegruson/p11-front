import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useLocalState } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [jwt, setJwt] = useLocalState('', "jwt");

    function handleLogin() {
        if (!jwt) {
            const credentials = {
                username: username,
                password: password,
            };

            fetch("login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })
                .then((response) => {
                    if (response.status === 200) return Promise.all([response.json(), response.headers]);
                    else return Promise.reject("Invalid login attempt");
                })
                .then(([body, headers]) => {
                    setJwt(headers.get("authorization"));
                    window.location.href = '/appointment';
                }).catch((message) => {
                    alert(message);
                })
        }
    };
    

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Nom d'utilisateur:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nom d'utilisateur"
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                </div>
                <button type="submit">Connexion</button>
            </form>
        </div>
    );
};

export default Login;
