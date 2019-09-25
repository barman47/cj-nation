import axios from 'axios';
import M from 'materialize-css';
import { 
    ADD_COMMENT, 
    ADD_AUDIO_COMMENT,
    ADD_VIDEO_COMMENT,
    END_POST_LOADING, 
    GET_POSTS, 
    START_POST_LOADING, 
    SET_POSTS, 
    SET_CURRENT_POST, 
    GET_ERRORS, 
    UPLOADED,
    SET_VIDEOS,
    GET_VIDEOS,
    SET_VIDEO,
    GET_MUSICS,
    GET_MUSIC,
    SET_MUSIC,
    SET_MUSICS
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
        type: SET_VIDEO,
        payload: video
    });
    history.push(`/videos/${video.id}`);
};

export const getMusics = () => (dispatch) => {
    dispatch({
        type: GET_MUSICS
    });
    axios.get('/api/posts/musics/all')
        .then(res => {
            dispatch({
                type: SET_MUSICS,
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

export const getMusic = (musicId) => (dispatch) => {
    dispatch({
        type: GET_MUSIC
    });
    console.log('getting music');
    axios.get(`/api/posts/music/${musicId}`)
        .then(res => {
            dispatch({
                type: SET_MUSIC,
                payload: res.data
            });
        })
        .catch(err => {

        });
};

export const setMusic = (music, history) => (dispatch) => {
    dispatch({
        type: SET_MUSIC,
        payload: music
    });
    history.push(`/musics/${music.id}`);
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
            try {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } catch (err) {
                console.log(err)
                alert('Something went wrong. Please try again.');
            }
        });
};

export const postVideoComment = (postId, comment) => (dispatch) => {
    axios.post(`/api/posts/comment/${postId}`, comment)
        .then(res => {
            dispatch({
                type: ADD_VIDEO_COMMENT,
                payload: res.data
            });
        })
        .catch(err => {
            try {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } catch (err) {
                console.log(err)
                alert('Something went wrong. Please try again.');
            }
        });
};

export const postAudioComment = (postId, comment) => (dispatch) => {
    axios.post(`/api/posts/comment/${postId}`, comment)
        .then(res => {
            dispatch({
                type: ADD_AUDIO_COMMENT,
                payload: res.data
            });
        })
        .catch(err => {
            try {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } catch (err) {
                console.log(err)
                alert('Something went wrong. Please try again.');
            }
        });
};