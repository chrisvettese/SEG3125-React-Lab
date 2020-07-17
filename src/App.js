import React, {Fragment, useEffect, useRef, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom';
import NavBar, {Divide, Footer} from "./Common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import recipeData from "./resources/recipeText";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles(() => ({
    standardText: {
        fontSize: "1.1em"
    },
    bigImage: {
        width: "25em",
        height: "auto",
        paddingLeft: "1em",
        paddingRight: "1em"
    },
    sideAlign: {
        marginLeft: "10%",
        maxWidth: "70%"
    },
    sideAlignText: {
        marginLeft: "10%",
        maxWidth: "70%",
        fontSize: "1.1em"
    },
    bold: {
        fontWeight: "bold"
    }
}));

function App() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const aboutRef = useRef(null);
    const recipeRef = useRef(null);
    const contactRef = useRef(null);

    let initialLang = 0;
    if (history.location.state !== undefined && history.location.state.lang !== undefined) {
        initialLang = history.location.state.lang;
    }
    const [lang, setLang] = useState(initialLang);

    useEffect(() => {
        setTimeout(() => {
            if (location.hash === "") {
                window.scroll(0, 0);
            } else if (location.hash === "#about") {
                window.scroll(0, contactRef.current.getBoundingClientRect().top - 55);
            } else if (location.hash === "#recipes") {
                window.scroll(0, contactRef.current.getBoundingClientRect().top - 55);
            } else if (location.hash === "#contact") {
                window.scroll(0, contactRef.current.getBoundingClientRect().top - 55);
            }
        }, 50);
    }, [location]);

    return (
        <Fragment>
            <NavBar lang={lang} setLang={setLang}/>
            <Typography align="center" variant="h3" className={classes.bold}>Bake From Home</Typography>
            <Typography align="center" className={classes.standardText}>Easy baking recipes you can make from
                home.</Typography>
            <Grid container justify="center">
                <img className={classes.bigImage} src={recipeData.images[0]} alt={recipeData.names[0]}/>
                <img className={classes.bigImage} src={recipeData.images[1]} alt={recipeData.names[1]}/>
                <img className={classes.bigImage} src={recipeData.images[3]} alt={recipeData.names[3]}/>
            </Grid>
            <Divide/>
            <div ref={aboutRef}/>
            <Typography className={classes.sideAlign} variant="h4">About</Typography>
            <Typography className={classes.sideAlign}>We </Typography>
            <br/>
            <Divide/>
            <div ref={recipeRef}/>
            <Typography className={classes.sideAlign} variant="h4">Recipes</Typography>
            <Typography className={classes.sideAlignText}>Find a baking recipe that's perfect for you! Search for
                recipes by food name, dietary preference, and by ingredients in your kitchen.</Typography>
            <Grid container className={classes.sideAlign}>
                <Button variant="contained" color="primary" onClick={() => history.push("/recipes", {lang: lang})}>Go
                    to Recipe Finder</Button>
            </Grid>
            <br/>
            <Divide/>
            <div ref={contactRef}/>
            <Typography className={classes.sideAlign} variant="h4">Contact Us</Typography>
            <Typography className={classes.sideAlignText}>Have any questions or suggestions? Reach us at
                help@bakefromhome.com, or 555-555-5555.</Typography>
            <br/>
            <Footer/>
        </Fragment>
    );
}

export default App;
