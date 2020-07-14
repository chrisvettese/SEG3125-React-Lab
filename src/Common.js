import {useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import logo from "./resources/logo.png";
import React, {Fragment, useState} from "react";
import {withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const styles = {
    logo: {
        width: "20em",
        height: "auto"
    }
};

const NavTab = withStyles({
    root: {
        textTransform: "none",
        fontSize: "1.5em",
        "&:hover": {
            backgroundColor: "#5465BF"
        }
    }
})(Tab);

export function Divide() {
    return (
        <Fragment>
            <br/>
            <Divider/>
            <br/>
        </Fragment>
    );
}

function NavBar() {
    const history = useHistory();
    const path = window.location.pathname;
    let initialState = "home";
    if (path.includes("/recipes")) {
        initialState = "finder";
    }
    if (history.location.state !== undefined && history.location.state.tab !== undefined) {
        initialState = history.location.state.tab;
    }
    const [tabValue, setTabValue] = useState(initialState);

    function changeTab(tab) {
        if (tab !== "finder" || tabValue !== "finder") {
            history.push("/", {tab: tab});
        }
        setTabValue(tab);
    }

    return (
        <Fragment>
            <AppBar position="sticky">
                <Tabs value={tabValue}>
                    <NavTab value="home" label="Home" onClick={() => changeTab("home")}/>
                    <NavTab value="about" label="About" onClick={() => changeTab("about")}/>
                    <NavTab value="finder" label="Recipes" onClick={() => changeTab("finder")}/>
                    <NavTab value="contact" label="Contact Us" onClick={() => changeTab("contact")}/>
                </Tabs>
            </AppBar>
            <img src={logo} alt="Logo" style={styles.logo}/>
        </Fragment>
    )
}

export default NavBar;
