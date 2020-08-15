import {useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import logoEng from "./resources/logo_en.png";
import logoFr from "./resources/logo_fr.png";
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
        position: "fixed",
        marginRight: "2em"
    },
    toolBar: {
        padding: "0",
        display: "flex",
        alignItems: "space-between"
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

    //Website translations
    const logo = [logoEng, logoFr];
    const home = ["Home", "Accueil"];
    const about = ["About", "À Propos"];
    const recipes = ["Recipes", "Recettes"];
    const contactUs = ["Contact Us", "Nous Contacter"];

    function changeTab(tab) {
        if (tab !== "recipes" || tabValue !== "recipes") {
            if (tab === "home") {
                history.push("/seg3125-react-lab", {tab: tab, lang: lang});
            } else {
                history.push("/seg3125-react-lab#" + tab, {tab: tab, lang: lang});
            }
        }
        setTabValue(tab);
    }

    return (
        <Fragment>
            <AppBar position="fixed">
                <Toolbar className={classes.toolBar} variant="dense">
                    <Tabs value={tabValue}>
                        <NavTab value="home" label={home[lang]} onClick={() => changeTab("home")}/>
                        <NavTab value="about" label={about[lang]} onClick={() => changeTab("about")}/>
                        <NavTab value="recipes" label={recipes[lang]} onClick={() => changeTab("recipes")}/>
                        <NavTab value="contact" label={contactUs[lang]} onClick={() => changeTab("contact")}/>
                    </Tabs>
                    <RadioGroup position="relative" className={classes.alignRight}
                                aria-label="gender" row name="language" value={lang === 0 ? "english" : "french"}
                                onChange={(event) => setLang(event.target.value === "english" ? 0 : 1)}>
                        <FormControlLabel value="english" control={<Radio/>} label="English"/>
                        <FormControlLabel value="french" control={<Radio/>} label="Français"/>
                    </RadioGroup>
                </Toolbar>
            </AppBar>
            <a href={window.location.host} onClick={() => changeTab("home")}>
                <img src={logo[lang]} alt="Logo" className={classes.logo}/>
            </a>
        </Fragment>
    )
}

export function Footer({lang}) {
    const classes = bottomStyles();

    //Website translation
    const label = ["Website by Chris Vettese", "Site Web par Chris Vettese"];

    return (
        <AppBar position="static" className={classes.appBar}>
            <Typography align="center">{label[lang]}</Typography>
        </AppBar>
    )
}

export default NavBar;
