import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Finder from "./Finder";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Recipes from "./Recipes";
import NotFound from "./NotFound";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/">
                <App/>
            </Route>
            <Route exact path="/bake-from-home">
                <App/>
            </Route>
            <Route exact path="/bake-from-home/recipes">
                <Finder/>
            </Route>
            <Route path="/bake-from-home/recipes">
                <Recipes/>
            </Route>
            <Route path="/">
                <NotFound/>
            </Route>
        </Switch>
    </Router>,
    document.getElementById("root")
);
