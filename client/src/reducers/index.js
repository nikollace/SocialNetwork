import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import users from './user';
import following from './following';

export default combineReducers({
    //mada moze i samo posts posto su ista imena
    posts: posts,
    auth: auth,
    users: users,
    following: following,
});