import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Finder from "./Finder";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import RecipePaths from "./Recipes";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/">
                <App/>
            </Route>
            <Route path="/recipes">
                <Finder/>
            </Route>
            <RecipePaths/>
        </Switch>
    </Router>,
    document.getElementById("root")
);
