import {useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import logo from "./resources/logo_en.png";
import React, {Fragment, useState} from "react";
import {withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Toolbar from "@material-ui/core/Toolbar";

const topStyles = makeStyles(() => ({
    logo: {
        width: "20em",
        height: "auto"
    },
    alignRight: {
        right: "0",
        position: "absolute",
        marginRight: "2em"
    },
    toolBar: {
        padding: "0"
    }
}));

const bottomStyles = makeStyles(() => ({
    appBar: {
        bottom: "0",
        top: "auto"
    }
}));

export const divideStyle = makeStyles(() => ({
    divideColour: {
        backgroundColor: "#F50057",
        height: "0.15em"
    }
}));

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
    const classes = divideStyle();
    return (
        <Fragment>
            <br/>
            <Divider className={classes.divideColour}/>
            <br/>
        </Fragment>
    );
}

export function getRatingAverage(ratings) {
    let ratingAvg = 0;
    ratings.forEach(rating => {
        ratingAvg += rating;
    });
    ratingAvg /= ratings.length;
    ratingAvg = (Math.round(ratingAvg * 10) / 10).toFixed(1);
    return ratingAvg;
}

function NavBar({lang, setLang}) {
    const history = useHistory();
    const classes = topStyles();
    const path = window.location.pathname;
    let initialState = "home";
    if (path.includes("/recipes")) {
        initialState = "recipes";
    }
    if (history.location.state !== undefined && history.location.state.tab !== undefined) {
        initialState = history.location.state.tab;
    }
    const [tabValue, setTabValue] = useState(initialState);

    function changeTab(tab) {
        if (tab !== "recipes" || tabValue !== "recipes") {
            if (tab === "home") {
                history.push("/", {tab: tab, lang: lang});
            } else {
                history.push("/#" + tab, {tab: tab, lang: lang});
            }
        }
        setTabValue(tab);
    }

    return (
        <Fragment>
            <AppBar position="sticky">
                <Toolbar className={classes.toolBar} variant="dense">
                    <Tabs value={tabValue}>
                        <NavTab value="home" label="Home" onClick={() => changeTab("home")}/>
                        <NavTab value="about" label="About" onClick={() => changeTab("about")}/>
                        <NavTab value="recipes" label="Recipes" onClick={() => changeTab("recipes")}/>
                        <NavTab value="contact" label="Contact Us" onClick={() => changeTab("contact")}/>
                    </Tabs>
                    <RadioGroup className={classes.alignRight}
                                aria-label="gender" row name="language" value={lang === 0 ? "english" : "french"}
                                onChange={(event) => setLang(event.target.value === "english" ? 0 : 1)}>
                        <FormControlLabel value="english" control={<Radio/>} label="English"/>
                        <FormControlLabel value="french" control={<Radio/>} label="Français"/>
                    </RadioGroup>
                </Toolbar>
            </AppBar>
            <a href={window.location.host} onClick={() => changeTab("home")}>
                <img src={logo} alt="Logo" className={classes.logo}/>
            </a>
        </Fragment>
    )
}

export function Footer() {
    const classes = bottomStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Typography align="center">Website by Chris Vettese</Typography>
        </AppBar>
    )
}

export default NavBar;
