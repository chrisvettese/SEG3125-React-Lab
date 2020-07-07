import {useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import logo from "./logo.png";
import React, {useState} from "react";

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
    const [tabValue, setValue] = useState("home");

    const toHome = () => {
        setValue("home");
        history.push("/");
    }
    const toAbout = () => {
        setValue("about");
    }
    const toFinder = () => {
        setValue("finder");
    }
    const toContact = () => {
        setValue("contact");
    }

    return (
        <div>
            <AppBar position="sticky">
                <Tabs value={tabValue}>
                    <Tab value="home" label="Home" style={styles.tab} onClick={toHome}/>
                    <Tab value="about" label="About" style={styles.tab} onClick={toAbout}/>
                    <Tab value="finder" label="Recipe Finder" style={styles.tab} onClick={toFinder}/>
                    <Tab value="contact" label="Contact Us" style={styles.tab} onClick={toContact}/>
                </Tabs>
            </AppBar>
            <img src={logo} alt="Logo" style={styles.logo}/>
        </div>
    )
}
