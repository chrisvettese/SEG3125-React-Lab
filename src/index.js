import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

ReactDOM.render(
    <Router>
        <Switch>
            <Route path='/'>
                <App/>
            </Route>
        </Switch>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
