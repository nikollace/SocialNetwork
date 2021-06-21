import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import decode from 'jwt-decode';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

import { useDispatch } from 'react-redux';

const Navbar = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    // sa location automatski setujemo user-a
    // jer kada se promeni ruta izvrsava se useEffect
    useEffect(() => {
        const token = user?.token;

        //JWT ..
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken * 1000 < new Date().getTime())
                logout();
        }
        //Kada se desi poziv komponente hocemo da imamo user info
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        //vracamo se na main stranicu nakon logout-a
        history.push('/');

        //postavljamo user-a na null
        setUser(null);
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="success">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
