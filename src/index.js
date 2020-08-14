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
            <Route exact path="/seg3125-react-lab">
                <App/>
            </Route>
            <Route exact path="/seg3125-react-lab/recipes">
                <Finder/>
            </Route>
            <Route path="/seg3125-react-lab/recipes">
                <Recipes/>
            </Route>
            <Route path="/">
                <NotFound/>
            </Route>
        </Switch>
    </Router>,
    document.getElementById("root")
);
