import {combineReducers} from "redux";
import posts from './posts';
import errors from './errors';
import message from "./message";
import auth from "./auth";


export default combineReducers({
    postsReducer: posts,
    errorsReducer: errors,
    messageReducer: message,
    authReducer: auth
});