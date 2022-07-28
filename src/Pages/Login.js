import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
function Login({ userData, setUserData, isLoggedIn, setIsLoggedIn }) {
    const [isLogInpage, setIsLogInpage] = useState(true);
    const [isLoding, setIsLoding] = useState(false);
    const [error, setError] = useState('');

    const [logInData, setLogInData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleRegister = () => {
        setError('');
        setIsLoding(true);
        var data = JSON.stringify(logInData);

        var config = {
            method: 'post',
            url: 'http://localhost:1337/api/auth/local/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setIsLoding(false);
                setUserData(response.data.user);
                setIsLoggedIn(true);
                // set Create ai token in local storage
                localStorage.setItem('create-ai-token', response.data.jwt);
            })
            .catch(function (error) {
                console.log(error);
                setError(error.response.data.message);
                setIsLoding(false);
            });

    }

    const handleLogin = () => {
        setError('');
        setIsLoding(true);
 
        var data = JSON.stringify({
            "identifier": logInData.email,
            "password": logInData.password
        });

        var config = {
            method: 'post',
            url: 'http://localhost:1337/api/auth/local',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setIsLoding(false);
                setUserData(response.data.user);
                setIsLoggedIn(true);
                // set Create ai token in local storage
                localStorage.setItem('create-ai-token', response.data.jwt);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoding(false);
                setError(error.response.data.message);
            });

    }






        return (
            <div className="Auth-form-container">
                {isLogInpage ? (
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Log In</h3>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                    onChange={(e) => setLogInData({ ...logInData, email: e.target.value })}
                                    type="email"
                                    name="email"
                                    className="form-control mt-1"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    onChange={(e) => setLogInData({ ...logInData, password: e.target.value })}
                                    type="password"
                                    name="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                {isLoding ? (
                                    <div className="spinner-border text-primary ms-auto" role="status">
                                        <span className="sr-only"></span>
                                    </div>) : (
                                    <button onClick={handleLogin} type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                )}

                            </div>
                            <div className='d-flex justify-content-around'>
                                <p role="button" onClick={() => setIsLogInpage(false)} className="forgot-password text-right mt-2">
                                    Register here
                                </p>

                                <p role="button" className="forgot-password text-right mt-2">
                                    Forgot password?
                                </p>

                            </div>
                        </div>
                    </form>
                ) : (
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Register</h3>
                            <div className="form-group mt-3">
                                <label>User Name</label>
                                <input
                                    onChange={(e) => setLogInData({ ...logInData, username: e.target.value })}
                                    type="text"
                                    name="username"
                                    className="form-control mt-1"
                                    placeholder="User Name"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                    onChange={(e) => setLogInData({ ...logInData, email: e.target.value })}
                                    type="email"
                                    name="email"
                                    className="form-control mt-1"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    onChange={(e) => setLogInData({ ...logInData, password: e.target.value })}
                                    type="password"
                                    name="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                {isLoding ? (
                                    <div className="spinner-border text-primary ms-auto" role="status">
                                        <span className="sr-only"></span>
                                    </div>) : (
                                    <button onClick={handleRegister} type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                )}
                            </div>
                            <div className='d-flex justify-content-around'>
                                <p role="button" onClick={() => setIsLogInpage(true)} className="forgot-password text-right mt-2">
                                    Log In
                                </p>
                                <p role="button" className="forgot-password text-right mt-2">
                                    Forgot password?
                                </p>

                            </div>
                            {/* Create an error section */}
                            <div className="error-message">
                                {error}
                            </div>
                        </div>
                    </form>

                )}

            </div>
        )
    }

    export default Login