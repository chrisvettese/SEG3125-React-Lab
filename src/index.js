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
import RecipePaths from "./Recipes";

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/finder">
                <Finder/>
            </Route>
            <Route path="/">
                <App/>
            </Route>
            <RecipePaths/>
        </Switch>
    </Router>,
    document.getElementById("root")
);
