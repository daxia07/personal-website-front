import {
    GET_ERROR,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS, REGISTER_FAIL
} from "./types";
import API from "../API";
import config from "../config";

const myAPI = new API({url: config.url});
myAPI.createEntity({ name : 'auth' });

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

    myAPI.endpoints.auth.get('/user', config).then(res => {
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

export const login = (username, password) => dispatch => {
    dispatch({
        type: USER_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, password});

    myAPI.endpoints.auth.post('/login', body, config).then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        console.log(err)
        // TODO: change this to details depending on occasion; receive the message
        const errors = {
            msg: 'login failed',
            status: 404
        };
        dispatch({
            type: GET_ERROR,
            payload: errors
        });
        dispatch({
            type: LOGIN_FAIL
        })
    })
};

export const logout = () => (dispatch, getState) => {
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

    myAPI.endpoints.auth.post('/logout/', null, config).then(res => {
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        //TODO: change error handling
        const errors = {
            msg: 'logout error',
            status: 404
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

export const register = ({username, password, email}) => dispatch => {
    dispatch({
        type: USER_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, password, email});

    myAPI.endpoints.auth.post('/register', body, config).then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        console.log(err)
        // TODO: change this to details depending on occasion; receive the message
        const errors = {
            msg: 'login failed',
            status: 404
        };
        dispatch({
            type: GET_ERROR,
            payload: errors
        });
        dispatch({
            type: REGISTER_FAIL
        })
    })
};



