import axios from 'axios';
import {GET_ERROR, USER_LOADED, USER_LOADING, AUTH_ERROR} from "./types";

export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    });

    const token = getState().authReducer.token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.get('/api/auth/user', config).then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch(err => {
        const errors = {
            msg: err.response.data.detail,
            status: err.response.status
        };
        dispatch({
            type: GET_ERROR,
            payload: errors
        });
        dispatch({
            type: AUTH_ERROR
        })
    })
};
