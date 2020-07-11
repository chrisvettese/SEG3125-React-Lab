import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import {HashLink} from 'react-router-hash-link';
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';
import NavBar from "./Common";
import Grid from "@material-ui/core/Grid";

import recipeData from "./resources/recipeText";
import recipeReviews from "./resources/recipeReviews";
import Divider from "@material-ui/core/Divider";
import NotFound from "./NotFound";

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
    recipeStandard: {
        marginLeft: "10%",
        maxWidth: "70%"
    }
};

function Divide() {
    return (
        <Fragment>
            <br/>
            <Divider/>
            <br/>
        </Fragment>
    );
}

function Recipes() {
    const path = window.location.pathname.substring(9)
    const rIndex = recipeData.recipePaths.indexOf(path);

    if (rIndex === -1) {
        return (
            <NotFound/>
        )
    }

    let ratingAvg = 0;
    recipeReviews.ratings[rIndex].forEach(rating => {
        ratingAvg += rating;
    });
    ratingAvg /= recipeReviews.ratings[rIndex].length;
    ratingAvg = (Math.round(ratingAvg * 10) / 10).toFixed(1)
    const ratingAvgNum = parseFloat(ratingAvg);
    const reviewWord = recipeReviews.ratings[rIndex].length === 1 ? " review" : " reviews";

    return (
        <Route path={"/recipes/" + path} key={path}>
            <NavBar/>
            <Typography align="center" variant="h3">{recipeData.recipeNames[rIndex] + "\u00a0"}</Typography>
            <Grid container justify="center">
                <Rating value={ratingAvgNum} precision={0.1} readOnly/>
                <Divider orientation="vertical" flexItem/>
                <Typography>{"\u00a0"}</Typography>
                <HashLink to={window.location.pathname + "#reviews"}>
                    <Typography>{recipeReviews.ratings[rIndex].length + reviewWord}</Typography>
                </HashLink>
            </Grid>
            <br/>
            <Grid container justify="center">
                <img src={recipeData.recipeImages[rIndex]} alt={recipeData.recipeNames[rIndex]}
                     style={styles.recipeImage}/>
            </Grid>
            <br/>
            <Typography style={styles.recipeParagraph}>{recipeData.recipeParagraphs[rIndex]}</Typography>
            <Divide/>
            <Typography style={styles.recipeStandard} variant="h4">Ingredients</Typography>
            <Typography style={styles.recipeParagraph}>{recipeData.recipeIngredients[rIndex]}</Typography>
            <Divide/>
            <Typography style={styles.recipeStandard} variant="h4">Instructions</Typography>
            <Typography style={styles.recipeParagraph}>{recipeData.recipeInstructions[rIndex]}</Typography>
            <Divide/>
            <Typography style={styles.recipeStandard} variant="h4" id="reviews">Reviews</Typography>
            <Grid container style={styles.recipeStandard}>
                <Typography>{ratingAvg + "\u00a0"}</Typography>
                <Divider orientation="vertical" flexItem/>
                <Typography>{"\u00a0"}</Typography>
                <Rating value={ratingAvgNum} precision={0.1} readOnly/>
                <Typography>{"\u00a0"}</Typography>
                <Divider orientation="vertical" flexItem/>
                <Typography>{"\u00a0" + recipeReviews.ratings[rIndex].length + reviewWord}</Typography>
            </Grid>
        </Route>
    )
}

export default Recipes;
