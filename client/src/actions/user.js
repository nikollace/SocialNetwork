import { GET_USERS, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api';

export const getUsers = () => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getUsers();

        dispatch({ type: GET_USERS, payload: { data } });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}
