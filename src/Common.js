import {useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import logo from "./resources/logo.png";
import React, {Fragment, useState} from "react";

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

function NavBar() {
    const history = useHistory();
    const path = window.location.pathname;
    let initialState = "home";
    if (path.includes("/recipes")) {
        initialState = "finder";
    }
    const [tabValue, setTabValue] = useState(initialState);

    const toHome = () => {
        setTabValue("home");
        history.push("/");
    }
    const toAbout = () => {
        setTabValue("about");
    }
    const toFinder = () => {
        setTabValue("finder");
    }
    const toContact = () => {
        setTabValue("contact");
    }

    return (
        <Fragment>
            <AppBar position="sticky">
                <Tabs value={tabValue}>
                    <Tab value="home" label="Home" style={styles.tab} onClick={toHome}/>
                    <Tab value="about" label="About" style={styles.tab} onClick={toAbout}/>
                    <Tab value="finder" label="Recipes" style={styles.tab} onClick={toFinder}/>
                    <Tab value="contact" label="Contact Us" style={styles.tab} onClick={toContact}/>
                </Tabs>
            </AppBar>
            <img src={logo} alt="Logo" style={styles.logo}/>
        </Fragment>
    )
}

export default NavBar;
