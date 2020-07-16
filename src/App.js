import React, {Fragment, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom';
import NavBar from "./Common";
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
    }
}));

function App() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "") {
            window.scroll(0, 0);
        }
        else if (location.hash === "#about") {
            window.scroll(0, 100);
        }
        else if (location.hash === "#recipes") {
            window.scroll(0, 200);
        }
        else if (location.hash === "#contact") {
            window.scroll(0, 300);
        }
    });

    return (
        <Fragment>
            <NavBar/>
            <Typography align="center" variant="h3">Bake From Home</Typography>
            <Typography align="center" className={classes.standardText}>Easy baking recipes you can make from
                home.</Typography>
            <Grid container justify="center">
                <img className={classes.bigImage} src={recipeData.images[0]} alt={recipeData.names[0]}/>
                <img className={classes.bigImage} src={recipeData.images[1]} alt={recipeData.names[1]}/>
                <img className={classes.bigImage} src={recipeData.images[3]} alt={recipeData.names[3]}/>
            </Grid>
            <br/>
            <Typography className={classes.sideAlign} variant="h4">Recipes</Typography>
            <Typography className={classes.sideAlignText}>Find a baking recipe that's perfect for you! Search for
                recipes by food name,
                dietary preference, and by ingredients in your kitchen.</Typography>
            <Grid container className={classes.sideAlign}>
                <Button variant="contained" color="primary" onClick={() => history.push("/recipes")}>Go
                    to Recipe Finder</Button>
            </Grid>
        </Fragment>
    );
}

export default App;
