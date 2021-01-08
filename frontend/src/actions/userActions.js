import Axios from 'axios';
import { 
    USER_SIGNIN_FAIL, 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
} from '../constants/userConstants';

export const signin = (email, password) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});

    try {
        const { data } = await Axios.post('/api/users/signin', {email, password});
        dispatch({type:USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, 
        payload:
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
};

export const signout = () => dispatch => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT });
};

export const register = (name, email, password) => async(dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, password, email }});
    
    try {
        const { data } = await Axios.post("/api/users/register", { 
            name, password, email
        });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ 
            type: USER_REGISTER_FAIL, 
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const userGetProfile = (userId) => async(dispatch, getState) => {
    dispatch({ type: USER_PROFILE_REQUEST, payload: userId });
    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch( { type: USER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
        dispatch({ type: USER_PROFILE_FAIL, payload: message });
    }
};

export const userProfileUpdate = (user) => async(dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user });
    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await Axios.put(`api/users/profile`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
        dispatch({ type: USER_UPDATE_FAIL, payload: message })
    }
};

export const listUsers = () => async(dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await Axios.get('/api/users', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_LIST_FAIL, payload: message })
    }
};

export const deleteUser = (userId) => async(dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await Axios.delete(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message   
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_DELETE_FAIL, payload: message });
    } 
};