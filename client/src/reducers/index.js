import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';
import postsReducer from './postsReducer';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    posts: postsReducer,
    errors: errorsReducer
});