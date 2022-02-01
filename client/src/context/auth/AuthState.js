import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        loading: true,
        error: null,
        isAuthenticated: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load User

    // Register User
    const registerUser = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.message
                //payload: err.response.data.msg
            });
        }
    };

    // Login User

    // Logout

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                user: state.user,
                loading: state.loading,
                error: state.error,
                isAuthenticated: state.isAuthenticated,
                registerUser
            }}>
            {props.children}
        </AuthContext.Provider>
    )    
}

export default AuthState;