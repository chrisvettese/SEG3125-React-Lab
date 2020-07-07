import React from "react";
import logo from "./logo.png";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {styles} from "./index";

function Finder() {
    return (
        <div>
            <AppBar position="sticky">
                <Tabs>
                    <Tab label="Home"/>
                    <Tab label="About"/>
                    <Tab label="Recipe Finder"/>
                    <Tab label="Contact Us"/>
                </Tabs>
            </AppBar>
            <img src={logo} alt="Logo" style={styles.logo}/>
        </div>
    );
}

export default Finder;
