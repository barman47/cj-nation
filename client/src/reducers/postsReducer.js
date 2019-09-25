import { 
    ADD_COMMENT,
    ADD_VIDEO_COMMENT,
    ADD_AUDIO_COMMENT,
    GET_POSTS, 
    SET_POSTS, 
    START_POST_LOADING, 
    SET_CURRENT_POST, 
    END_POST_LOADING, 
    UPLOADED, 
    SET_VIDEOS,
    GET_VIDEOS,
    SET_VIDEO,
    SET_MUSICS,
    SET_MUSIC
} from '../actions/types';

const initialState = {
    loading: false,
    uploaded: false,
    comment: '',
    post: {},
    posts: [],
    video: {},
    videos: [],
    music: {},
    musics: []
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

        case ADD_VIDEO_COMMENT:
            return {
                ...state,
                video: action.payload
            };

        case ADD_AUDIO_COMMENT:
            return {
                ...state,
                music: action.payload
            };

        case UPLOADED:
            return {
                ...state,
                uploaded: action.payload.uploaded
            };

        case GET_VIDEOS:
            return {
                ...state,
                loading: true
            };

        case SET_VIDEOS:
            return {
                ...state,
                videos: action.payload,
                loading: false
            };

        case SET_VIDEO:
            return {
                ...state,
                video: action.payload,
                loading: false
            };

        case SET_MUSICS:
            return {
                ...state,
                musics: action.payload,
                loading: false
            };

        case SET_MUSIC:
            return {
                ...state,
                music: action.payload,
                loading: false
            };

        default:
            return state;
    }
};