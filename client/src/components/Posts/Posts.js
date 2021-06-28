import React, { useState, useEffect } from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import { getFollowers } from '../../actions/follow';

import useStyles from './styles';

const PurpleSwitch = withStyles({
    switchBase: {
        color: purple[300],
        '&$checked': {
            color: purple[500],
        },
        '&$checked + $track': {
            backgroundColor: purple[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

const GreenSwitch = withStyles({
    switchBase: {
        color: green[300],
        '&$checked': {
            color: green[500],
        },
        '&$checked + $track': {
            backgroundColor: green[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

const Posts = ({ setCurrentId }) => {
    //dodali smo {} u posts jer sada saljemo slozeniji objekat iz kog izvlacimo posts
    const { posts, isLoading } = useSelector(state => state.posts);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    var following = JSON.parse(localStorage.getItem('following'));

    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.result?._id)
            dispatch(getFollowers(user?.result?._id));
        else
            dispatch(getFollowers(user?.result?.googleId));
    }, [])

    const [state, setState] = useState({
        checkedA: true,
        checkedB: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    if (!posts.length && !isLoading) {
        return <h1>No posts</h1>;
    };

    return (
        user ? (
            isLoading ? <CircularProgress /> : (
                <>
                    <FormGroup>
                        {
                            user?.result?.admin ? null : (
                                (following?.following?.length > 0) ? (
                                    <FormControlLabel
                                        control={<PurpleSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                                        label="Show friends posts"
                                    />) : <h1>You either don't follow anyone or the people you follow haven't post anything yet!</h1>)
                        }
                        <FormControlLabel
                            control={<GreenSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                            label="Show your posts"
                        />
                    </FormGroup>
                    {(following?.following?.length > 0 || user?.result?.admin) && state.checkedA ?
                        (
                            <>
                                <Typography className={classes.titles} variant="h2">{!user?.result?.admin ? 'Friends ' : 'All '}posts</Typography>
                                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                    {posts.map((post) =>
                                        (following?.following?.includes(post.creator) || user?.result?.admin) &&
                                        (
                                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                                                <Post post={post} setCurrentId={setCurrentId} />
                                            </Grid>
                                        ))}
                                </Grid>
                            </>
                        ) : null}
                    {state.checkedB ?
                        (
                            <>
                                <Typography className={classes.titles} variant="h2">Your posts</Typography>
                                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                    {posts.map((post) =>
                                        (user?.result._id === post.creator || user?.result?.googleId === post.creator) &&
                                        (
                                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                                                <Post post={post} setCurrentId={setCurrentId} />
                                            </Grid>
                                        ))}
                                </Grid>
                            </>
                        ) : null}
                </>
            )
        ) : null
    );
}

export default Posts;