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

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/">
                <App/>
            </Route>
            <Route exact path="/recipes">
                <Finder/>
            </Route>
            <Route path="/recipes">
                <Recipes/>
            </Route>
        </Switch>
    </Router>,
    document.getElementById("root")
);
