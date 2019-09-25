import { ADD_COMMENT, GET_POSTS, SET_POSTS, START_POST_LOADING, SET_CURRENT_POST, END_POST_LOADING, UPLOADED } from '../actions/types';

const initialState = {
    loading: false,
    uploaded: false,
    post: {},
    posts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            };

        case SET_CURRENT_POST: 
            return {
                ...state,
                post: action.payload
            };

        case GET_POSTS: 
            return {
                ...state,
                loading: true
            };

        case END_POST_LOADING:
            return {
                ...state,
                post: action.payload
            };

        case START_POST_LOADING:
            return {
                ...state,
                loading: true
            };

        case ADD_COMMENT:
            return {
                ...state,
                post: action.payload
            };

        case UPLOADED:
            return {
                ...state,
                uploaded: action.payload.uploaded
            };

        default:
            return state;
    }
};