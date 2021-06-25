import { GET_USERS, START_LOADING, END_LOADING, FOLLOW } from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = () => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getUsers();

        dispatch({ type: GET_USERS, payload: { data } });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const follow = (nas_id, id) => async (dispatch) => {
    try {
        const { data } = await api.follow(nas_id, id);

        console.log(data)

        dispatch({ type: FOLLOW, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
}