import * as api from '../api';

//Kreiranje akcija
//Posto radimo sa asinhronim podacima
//Potrebno je da prodje vreme da bi smo dobili podatke
//Zato koristimo redux thunk
export const getPosts = () => async(dispatch) => {

    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async(dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.deletePost(id);

        dispatch({ type: 'DELETE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}