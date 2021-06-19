import React from 'react';
import Post from './Post/Post';

import { useSelector } from 'react-redux';

import useStyles from './styles';
const Posts = () => {
    const posts = useSelector(state => state.posts);
    console.log(posts);
    const classes= useStyles();

    return (
        <>
        <h1>POSTS</h1>
        <Post />
        <Post />
        </>
    );
}

export default Posts;