import API from "../API";

import config from '../config';
import {GET_POSTS, CREATE_POST, DELETE_POST, GET_ERROR, SEND_MESSAGE} from "./types";

const myAPI = new API({url: config.url});
myAPI.createEntity({ name : 'posts' });

export const getPosts = () => (dispatch, getState) => {
    const config = myAPI.getConfig(getState().authReducer.token);
    myAPI.endpoints.posts.getAll(config).then(res => {
        console.log('get posts', res);
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }).catch(err => {
        console.log(err);
        console.log(err);
        //TODO: delay to show the message
        // const errors = {
        //     msg: err.response.data,
        //     status: err.response.status
        // };
        // dispatch({
        //     type: GET_ERROR,
        //     payload: errors
        // });
        // if (err.response.status === 403) {
        //     // TODO: dispatch login action
        // }
    })
};

export const deletePost = id => (dispatch, getState) => {
    const config = myAPI.getConfig(getState().authReducer.token);
    myAPI.endpoints.posts.delete({id: id}, config).then(res => {
        dispatch({
            type: DELETE_POST,
            payload: id
        });
        dispatch({
            type: SEND_MESSAGE,
            payload: 'Post deleted!'
        })
    }).catch(err => console.log(err))
};

export const createPost = post => (dispatch, getState) => {
    const config = myAPI.getConfig(getState().authReducer.token);
    console.log(config);
    myAPI.endpoints.posts.create(post, config).then(res => {
        console.log(res);
        dispatch({
            type: CREATE_POST,
            payload: res.data
        });
        dispatch({
            type: SEND_MESSAGE,
            payload: 'New post created!'
        })
    }).catch(err => {
        const errors = {
            msg: err.response.data,
            status: err.response.status
        };
        dispatch({
            type: GET_ERROR,
            payload: errors
        });
    });
};