import { combineReducers } from 'redux';
import posts from './posts';

export default combineReducers({
    //mada moze i samo posts posto su ista imena
    posts: posts,
});