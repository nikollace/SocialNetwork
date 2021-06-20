import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';

export default combineReducers({
    //mada moze i samo posts posto su ista imena
    posts: posts,
    auth: auth,
});