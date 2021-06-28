import { FOLLOW, GET_FOLLOWERS } from '../constants/actionTypes';
import * as api from '../api';


export const follow = (nas_id, id) => async (dispatch) => {
    try {
        const { data } = await api.follow(nas_id, id);

        dispatch({ type: FOLLOW, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
}

export const getFollowers = (id) => async (dispatch) => {

    try {

        const { data } = await api.getFollowers(id);

        dispatch({ type: GET_FOLLOWERS, payload: { data } });

    } catch (error) {
        console.log(error.message);
    }
}