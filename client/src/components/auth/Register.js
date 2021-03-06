import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { setAlert } = alertContext;
    const { registerUser, error, clearErrors } = authContext;

    useEffect(() => {
        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error]);

    const { name, email, password, confirmPassword } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || email === '' || password === '') {
            setAlert('Please fill all the fields', 'danger');
        }
        else if (password !== confirmPassword) {
            setAlert('Passwords do not match', 'danger');
        }
        else {
            registerUser({
                name,
                email,
                password
            });
        }        
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    <input 
                        type='text' 
                        name='name' 
                        value={name} 
                        onChange={onChange} 
                        required />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        type='email' 
                        name='email' 
                        value={email} 
                        onChange={onChange} 
                        required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        type='password' 
                        name='password' 
                        value={password} 
                        onChange={onChange} 
                        required 
                        minLength='6' />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input 
                        type='password' 
                        name='confirmPassword' 
                        value={confirmPassword} 
                        onChange={onChange} 
                        required 
                        minLength='6' />
                </div>
                <input type='submit' value='Register' onClick={onSubmit} className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Register;
