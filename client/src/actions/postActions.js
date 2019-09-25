import axios from 'axios';
import M from 'materialize-css';
import { 
    ADD_COMMENT, 
    END_POST_LOADING, 
    GET_POSTS, 
    START_POST_LOADING, 
    SET_POSTS, 
    SET_CURRENT_POST, 
    GET_ERRORS, 
    UPLOADED,
    SET_VIDEOS,
    GET_VIDEOS,
    SET_VIDEO
} from './types';

export const addPost = (postData) => (dispatch) => {
    axios.post('/api/posts/addPost', postData)
        .then(res => {
            dispatch({
                type: UPLOADED,
                payload: {...res.data, uploaded: true}
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}; 

export const getPosts = () => (dispatch) => {
    dispatch({
        type: GET_POSTS
    });
    axios.get('/api/posts/homepagePosts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const getAllPosts = () => (dispatch) => {
    dispatch({
        type: GET_POSTS
    });
    axios.get('/api/posts/all')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const getVideos = () => (dispatch) => {
    dispatch({
        type: GET_VIDEOS
    });
    axios.get('/api/posts/Video')
        .then(res => {
            dispatch({
                type: SET_VIDEOS,
                payload: res.data,
            });
        })
        .catch(err => {
            try {
                switch(err.response.status) {
                    case 404:
                        dispatch({
                            type: GET_ERRORS,
                            payload: err.response.data
                        });
                        break;

                        default: 
                            // dispatch({
                            //     GET_ERRORS,
                            //     payload: {}
                            // });
                            break;
                }
            } catch (err) {
                dispatch({
                    GET_ERRORS,
                    payload: {}
                });
            }
        });
};

export const getVideo = (videoId) => (dispatch) => {
    dispatch({
        type: GET_VIDEOS
    });

    axios.get(`/api/posts/video/${videoId}`)
        .then(res => {
            dispatch({
                type: SET_VIDEO,
                payload: res.data
            });
        })
        .catch(err => {

        });
};

export const setVideo = (video, history) => (dispatch) => {
    dispatch({
        type: SET_VIDEOS,
        payload: video
    });
    history.push(`/videos/${video.id}`);
};

export const setCurrentPost = (post, history) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_POST,
        payload: post
    });
    history.push(`/posts/${post.title}`);
};

export const startPostLoading = () => (dispatch) => dispatch({
    type: START_POST_LOADING
});


export const endPostLoading = () => (dispatch) => dispatch({
    type: END_POST_LOADING
});

export const postComment = (postId, comment) => (dispatch) => {
    axios.post(`/api/posts/comment/${postId}`, comment)
        .then(res => {
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            });
        })
        .catch(err => {
            M.toast({
                html: err.response.data.comment,
                classes: 'toast-invalid'
            });
            try {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } catch (err) {
                alert('Something went wrong. Please try again.');
            }
        });
};