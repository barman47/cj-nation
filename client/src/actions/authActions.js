import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER, PASSWORD_CHANGE_SUCCESSFUL } from './types';
import M from 'materialize-css';
import setAuthToken from '../utils/setAuthToken';

export const loginAdmin = (admin) => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
        payload: {}
    });
    axios.post('/api/admin/login', admin)
        .then(res => {
            M.toast({
                html: 'Logged in successfuly',
                classes: 'toast-valid'
            });

            // Save token to local storage
            const { token } = res.data;
            
            // Set token to local storage

            localStorage.setItem('adminToken', token);

            // Set token to auth header
            setAuthToken(token);

            // Decode toke to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => {
            try {
                switch (err.response.status) {
                    case 500:
                        const error = {
                            message: 'Please check your internet connection',
                            status: 500
                        };
                        dispatch({
                            type: GET_ERRORS,
                            payload: error
                        });
                        break;
    
                    default:
                        dispatch({
                            type: GET_ERRORS,
                            payload: err.response.data
                        });
                        break;
                }
            } catch (error) {
                console.log(error);
            }
        });
};

export const registerAdmin = (admin, history) => (dispatch) => {
    axios.post('/api/admin/register', admin)
        .then(res => {
            history.push('/login');
        })
        .catch(err => {
            try {
                switch (err.response.status) {
                    case 500:
                        const error = {
                            message: 'Please check your internet connection',
                            status: 500
                        };
                        dispatch({
                            type: GET_ERRORS,
                            payload: error
                        });
                        break;
    
                    default:
                        dispatch({
                            type: GET_ERRORS,
                            payload: err.response.data
                        });
                        break;
                }
            } catch (err) {
                dispatch({
                    type: GET_ERRORS,
                    payload: {}
                });
                M.toast({
                    html: 'Error! Please retry.',
                    classes: 'toast-invalid'
                })
            }
        });
};

export const changePassword = (data) => (dispatch) => {
    axios.put('/api/users/changePassword', data)
        .then(res => dispatch({
            type: PASSWORD_CHANGE_SUCCESSFUL,
            payload: res.data
        }))
        .catch(err => {
            try {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            } catch (err) {
                dispatch({
                    type: GET_ERRORS
                });
                M.toast({
                    html: 'Error! Please retry.',
                    classes: 'toast-invalid'
                });
            }
        });
};

export const clearErrors = () => (dispatch) => dispatch({
    type: CLEAR_ERRORS,
    payload: {}
});

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

export const logoutAdmin = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};