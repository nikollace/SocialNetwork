import React from 'react';
import {Container} from '@material-ui/core';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Friends from './components/friends/Friends';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to='/posts' />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/auth" component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                    <Route path="/friends" component={() => (user ? <Friends /> : <Redirect to="/auth" />)} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App
