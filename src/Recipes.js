import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {NavBar} from "./Common";

import SugarCookies from "./images/sugarCookies.jpg";
import CinnamonRolls from "./images/cinnamonRolls.jpg";
import WhiteBread from "./images/whiteBread.jpg";
import CinnamonRaisin from "./images/cinnamonRaisin.jpg";
import ChocolateChip from "./images/chocolateChip.jpg";
import MolassesCookies from "./images/molassesCookies.jpg";
import Grid from "@material-ui/core/Grid";

const recipePaths = ["sugarCookies", "cinnamonRolls", "whiteBread", "cinnamonRaisin", "chocolateChip", "molassesCookies"];
const recipeNames = ["Sugar Cookies", "Cinnamon Rolls", "White Bread", "Cinnamon Raisin Bagels", "Chocolate Chip Cookies", "Molasses Cookies"];
const recipeImages = [SugarCookies, CinnamonRolls, WhiteBread, CinnamonRaisin, ChocolateChip, MolassesCookies];

const styles = {
    recipeImage: {

    }
};

function RecipePaths() {
    return (
        recipePaths.map(rPath => {
            return (
                <Route path={"/recipes/" + rPath} key={rPath}>
                    <Recipe/>
                </Route>
            )
        })
    );
}

function Recipe() {
    const path = window.location.pathname;
    const rIndex = recipePaths.indexOf(path.substring(9));
    console.log(rIndex);
    return (
        <Fragment>
            <NavBar/>
            <Typography align="center" variant="h3">{recipeNames[rIndex]}</Typography>
            <br/>
            <Grid container justify="center">
                <img src={recipeImages[rIndex]} alt={recipeNames[rIndex]} style={styles.recipeImage}/>
            </Grid>
        </Fragment>
    );
}

export default RecipePaths;
