import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { follow } from '../../actions/follow';
import { getUsers } from '../../actions/user';
import { Typography, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Friends = () => {
    const classes = useStyles();
    let user = JSON.parse(localStorage.getItem('profile'));
    let following = JSON.parse(localStorage.getItem('following'));

    const { isLoading, users } = useSelector(state => state.users);
    const { newFollowing } = useSelector(state => state.following);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, newFollowing]);

    if (!users.length && !isLoading) return <h1>There are no users yet!</h1>;

    const handleFollow = (nas_id, id) => {
        dispatch(follow(nas_id, id));
    }

    return (
        isLoading ? <CircularProgress /> : (
            <>
                <Typography variant="h3">Find your friends, {user?.result.name.split(' ')[0]}</Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ime</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Follow</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((u) => (user?.result?.email !== u.email &&
                                (
                                    <TableRow key={u?.name}>
                                        <TableCell component="th" scope="row">
                                            {u?.name}
                                        </TableCell>
                                        <TableCell align="right">{u?.email}</TableCell>
                                        <TableCell align="right">
                                            {
                                                !following?.following?.includes(u._id) ?
                                                    <AddIcon color="primary" onClick={() => handleFollow(user?.result._id, u._id)} />
                                                    :
                                                    <RemoveIcon color="secondary" onClick={() => handleFollow(user?.result._id, u._id)} />
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    );
}

export default Friends
