import axios from "axios";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

function Register() 
{
    const [user, setUser] = useState({
        User_Name: '',
        First_Name: '',
        Last_Name: '',
        Password: ''
    });
    
    const navigate = useNavigate();

    // Check if user is logged in, if yes redirect
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/', { replace: true }); // Redirect to home or another page
        }
    }, [navigate]);

    const handleRegister = async () => {
        try {
            const res = await axios.post(config.apiPath + '/user/register', user);

            if (res.data.result !== undefined) {
                Swal.fire({
                    title: 'Registration Successful',
                    text: 'You can now sign in!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                .then(() => {
                    navigate('/', { replace: true });
                });
            }
        } catch (e) {
            if (e.response && e.response.status === 400) {
                Swal.fire({
                    title: 'Registration Failed',
                    text: e.response.data.message,
                    icon: 'warning'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: e.message,
                    icon: 'error'
                });
            }
        }
    }

    return (
        <div className="hold-transition register-page">
            <div className="register-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="../../index2.html" className="h1"><b>Admin</b>LTE</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Register a new membership</p>

                        <div>
                            <div className="input-group mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Username"
                                    onChange={e => setUser({ ...user, User_Name: e.target.value })} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    className="form-control"
                                    placeholder="First Name"
                                    onChange={e => setUser({ ...user, First_Name: e.target.value })} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Last Name"
                                    onChange={e => setUser({ ...user, Last_Name: e.target.value })} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={e => setUser({ ...user, Password: e.target.value })} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={handleRegister}>Register</button>
                                </div>
                            </div>
                        </div>
                        <p className="mb-0">
                            <a href="/" className="text-center">I already have a membership</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
