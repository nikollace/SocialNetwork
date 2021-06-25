import { GET_USERS, START_LOADING, END_LOADING, FOLLOW } from '../constants/actionTypes';

export default (state = { isLoading: true, users: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case GET_USERS: 
            return { ...state, users: action.payload.data };
        case FOLLOW:
            return {
                ...state,
                kod: action.payload.data
            };
        default: return { ...state, users: state };
    }
}