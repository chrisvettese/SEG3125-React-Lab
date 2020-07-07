import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function App() {
    return (
        <div className='App'>
            <AppBar title="My App">
                <Tabs>
                    <Tab label="Home"/>
                    <Tab label="About"/>
                    <Tab label="Recipe Finder"/>
                    <Tab label="Contact Us"/>
                </Tabs>
            </AppBar>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo'/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
