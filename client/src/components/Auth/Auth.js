import React, { useState, useEffect, Fragment } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

import { signup, signin } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', googleId: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const { authData } = useSelector(state => state.auth)
    const [error, setError] = useState('')
    //ova funkcija nam obradjuje signIn i signUp

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    useEffect(() => {
        if (authData)
            setError('Invalid credentials!');
        else
            setError('');
    }, [authData])

    //popunjavamo state promenama na formi
    //zgodno je sto radi sa beskonacnim brojem polja
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
        setIsSignup((prevIsSignUp) => setIsSignup(!prevIsSignUp));
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj; //?. ako ne postoji objekat nece baciti gresku samo ce da vrati undefined
        const token = res?.tokenId;

        try {
            setFormData({ ...formData, googleId: result?.googleId });
            //Dispecujemo akciju ovde, ne u actions jer nam je ovde zgodnije
            //treba nam reducer da ovo handlujemo kako valja npr u auth.js reduceru
            dispatch(signup({ ...formData, firstName: result?.givenName, lastName: result?.familyName, email: result?.email, googleId: result?.googleId, token: token }, history));
            // dispatch({ type: AUTH, data: { result, token } });

            // //Vracamo se na main stranicu nakon google prijavljivanja
            // history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google log in was unsuccessful. Try again later.");
    };

    const [captchaValue, setCaptchaValue] = useState(false);

    function recaptchaChange(value) {
        console.log("Captcha value:", value);
        if (value) {
            setCaptchaValue(value);
        } else {
            setCaptchaValue(false)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        <Typography variant="h6" color="secondary" className={classes.error}>{error}</Typography>
                    </Grid>
                    <ReCAPTCHA
                        className={classes.captcha}
                        sitekey="6Lfh9F0bAAAAADQkG1MhO-61IMewr7Lohq3gx_9F"
                        onChange={recaptchaChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!captchaValue}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="749301728770-qeqri881qifnmbd04jog4p4js6dtaa9i.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
