import { SET_CURRENT_USER, PASSWORD_CHANGE_SUCCESSFUL } from '../actions/types';

const initialState = {
    authenticated: false,
    admin: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                admin: action.payload,
                authenticated: true
            };

        case PASSWORD_CHANGE_SUCCESSFUL:
            return {
                ...state,
                msg: action.payload
            }

        default:
            return state;
    }
};