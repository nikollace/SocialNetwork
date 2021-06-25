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
import { getPosts, follow } from '../../actions/user';
import { Typography, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Friends = () => {
    const classes = useStyles();
    let user = JSON.parse(localStorage.getItem('profile'));

    const { isLoading, users, kod } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [nikola, setNikola] = useState(user);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    useEffect(() => {
        if (kod != undefined && kod != null) {
            user.result = kod;
            
            localStorage.setItem('profile', JSON.stringify(user));    
        }
        user = JSON.parse(localStorage.getItem('profile'));
        setNikola(user);
    }, [kod]);

    if (!users.length && !isLoading) return <h1>There is no users!</h1>;

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
                            {users.map((u) => (user?.result._id !== u._id &&
                                (
                                    <TableRow key={u?.name}>
                                        <TableCell component="th" scope="row">
                                            {u?.name}
                                        </TableCell>
                                        <TableCell align="right">{u?.email}</TableCell>
                                        <TableCell align="right">
                                            {
                                                !user?.result.following.includes(u._id) ?
                                                    <AddIcon onClick={() => handleFollow(user?.result._id, u._id)} />
                                                    :
                                                    <RemoveIcon onClick={() => handleFollow(user?.result._id, u._id)} />
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
