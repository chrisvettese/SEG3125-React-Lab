import {useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import logo from "./logo.png";
import React from "react";

const styles = {
    logo: {
        width: "20em",
        height: "auto"
    },
    tab: {
        textTransform: "none",
        fontSize: "1.5em"
    }
};

export function NavBar() {
    const history = useHistory();
    return (
        <div>
            <AppBar position="sticky">
                <Tabs>
                    <Tab label="Home" style={styles.tab} onClick={() => history.push("/")}/>
                    <Tab label="About" style={styles.tab}/>
                    <Tab label="Recipe Finder" style={styles.tab}/>
                    <Tab label="Contact Us" style={styles.tab}/>
                </Tabs>
            </AppBar>
            <img src={logo} alt="Logo" style={styles.logo}/>
        </div>
    )
}
