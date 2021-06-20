import React from 'react';
import {Container} from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

    return (
        <BrowserRouter>
            <Container maxidth="lg">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                    <Route />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App
