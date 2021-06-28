import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user ...
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        // vrati ga na main stranicu
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        // sign up the user ...
        const { data } = await api.signUp(formData);

        if (!formData?.googleId) {
            dispatch({ type: AUTH, data });

            // vrati ga na main stranicu
            history.push('/');
        }
    } catch (error) {
        console.log(error);
    }
};