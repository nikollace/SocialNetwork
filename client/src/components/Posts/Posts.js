import React, { useState } from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress, Typography, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

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

    const [state, setState] = useState({
        checkedA: true,
        checkedB: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    if (!posts.length && !isLoading) {
        return 'No posts'
    };

    return (
        user ? (
        isLoading ? <CircularProgress /> : (
            <>
                <FormGroup>
                    {!user?.result.admin && (<FormControlLabel
                        control={<PurpleSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                        label="Show friends posts"
                    />)}
                    <FormControlLabel
                        control={<GreenSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                        label="Show your posts"
                    />
                </FormGroup>
                { (state.checkedA) ?
                    (
                        <>
                            <Typography className={classes.titles} variant="h2">{!user?.result.admin ? 'Friends ' : 'All '}posts</Typography>
                            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                {posts.map((post) =>
                                    (user?.result.following.includes(post.creator) || user?.result.admin) &&
                                    (
                                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                                            <Post post={post} setCurrentId={setCurrentId} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </>
                    ) : null}
                { state.checkedB ?
                    (
                        <>
                            <Typography className={classes.titles} variant="h2">Your posts</Typography>
                            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                {posts.map((post) =>
                                    (user?.result._id === post.creator) &&
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
    ) : <h1>Sign In to see posts!</h1>);
}

export default Posts;