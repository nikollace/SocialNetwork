import { START_LOADING, END_LOADING, GET_FOLLOWERS, FOLLOW } from '../constants/actionTypes';

export default (state = { isLoading: true, users: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FOLLOW:
            localStorage.setItem('following', JSON.stringify({ ...action?.payload.data }));
            return {
                ...state,
                newFollowing: action.payload.data
            };
        case GET_FOLLOWERS:
            localStorage.setItem('following', JSON.stringify({ ...action?.payload.data }));
            return {
                ...state,
                following: action.payload.post
            };
        default: return { ...state, users: state };
    }
}