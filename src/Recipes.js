import React from "react";
import {Route} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import NavBar from "./Common";
import Grid from "@material-ui/core/Grid";

import recipeData from "./resources/recipeText";

const styles = {
    recipeImage: {
        width: "24em",
        height: "auto"
    },
    recipeParagraph: {
        marginLeft: "10%",
        maxWidth: "70%",
        fontSize: "1.2em",
        whiteSpace: "pre-line"
    },
    recipeHeadline: {
        marginLeft: "10%",
        maxWidth: "70%"
    }
};

function Recipes() {
    return (
        recipeData.recipePaths.map(rPath => {
            const path = window.location.pathname;
            const rIndex = recipeData.recipePaths.indexOf(path.substring(9));
            return (
                <Route path={"/recipes/" + rPath} key={rPath}>
                    <NavBar/>
                    <Typography align="center" variant="h3">{recipeData.recipeNames[rIndex]}</Typography>
                    <br/>
                    <Grid container justify="center">
                        <img src={recipeData.recipeImages[rIndex]} alt={recipeData.recipeNames[rIndex]}
                             style={styles.recipeImage}/>
                    </Grid>
                    <br/>
                    <Typography style={styles.recipeParagraph}>{recipeData.recipeParagraphs[rIndex]}</Typography>
                    <br/>
                    <Typography style={styles.recipeHeadline} variant="h4">Ingredients</Typography>
                    <Typography style={styles.recipeParagraph}>{recipeData.recipeIngredients[rIndex]}</Typography>
                    <br/>
                    <Typography style={styles.recipeHeadline} variant="h4">Instructions</Typography>
                    <Typography style={styles.recipeParagraph}>{recipeData.recipeInstructions[rIndex]}</Typography>
                </Route>
            )
        })
    );
}

export default Recipes;
