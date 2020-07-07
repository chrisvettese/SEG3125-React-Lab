import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Finder from "./Finder";
import * as serviceWorker from "./serviceWorker";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export const styles = {
    logo: {
        width: "20em",
        height: "auto"
    }
};

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/finder">
                <Finder/>
            </Route>
            <Route path="/">
                <App/>
            </Route>
        </Switch>
    </Router>,
    document.getElementById("root")
);

serviceWorker.unregister();
