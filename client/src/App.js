import React from 'react';
import { Container } from '@material-ui/core';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Friends from './components/friends/Friends';

const App = () => {
    const ulogovan = JSON.parse(localStorage.getItem('profile'));

    const { user } = useSelector(state => state.auth);

    return (
        <BrowserRouter>
            <Container maxidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to='/posts' />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/friends" exact component={() => (ulogovan ? <Friends /> : <Redirect to='/auth' />)} />
                    <Route path="/auth" exact component={() => ((!user && !ulogovan) ? <Auth /> : <Redirect to='/posts' />)} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App
