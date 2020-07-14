import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import {HashLink} from 'react-router-hash-link';
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';
import NavBar, {Divide, getRatingAverage} from "./Common";
import Grid from "@material-ui/core/Grid";

import recipeData from "./resources/recipeText";
import recipeReviews from "./resources/recipeReviews";
import Divider from "@material-ui/core/Divider";
import NotFound from "./NotFound";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
    recipeImage: {
        width: "24em",
        height: "auto"
    },
    recipeParagraph: {
        marginLeft: "10%",
        maxWidth: "70%",
        fontSize: "1.1em",
        whiteSpace: "pre-line"
    },
    recipeStandard: {
        marginLeft: "10%",
        maxWidth: "70%"
    },
    textField: {
        marginLeft: "10%",
        width: "30em"
    }
};

function Recipes() {
    const path = window.location.pathname.substring(9);
    const rIndex = recipeData.paths.indexOf(path);

    if (rIndex === -1) {
        return (
            <NotFound/>
        );
    }

    const ratingAvg = getRatingAverage(rIndex);
    const ratingAvgNum = parseFloat(ratingAvg);
    const reviewWord = recipeReviews.ratings[rIndex].length === 1 ? " review" : " reviews";

    return (
        <Route path={"/recipes/" + path} key={path}>
            <NavBar/>
            <Typography align="center" variant="h3">{recipeData.names[rIndex] + "\u00a0"}</Typography>
            <Grid container justify="center">
                <Rating value={ratingAvgNum} precision={0.1} readOnly/>
                <Divider orientation="vertical" flexItem/>
                <Typography>{"\u00a0"}</Typography>
                <HashLink to={window.location.pathname + "#reviews"}>
                    <Typography
                        style={{fontSize: "1.1em"}}>{recipeReviews.ratings[rIndex].length + reviewWord}</Typography>
                </HashLink>
            </Grid>
            <br/>
            <Grid container justify="center">
                <img src={recipeData.images[rIndex]} alt={recipeData.names[rIndex]}
                     style={styles.recipeImage}/>
            </Grid>
            <br/>
            <Typography style={styles.recipeParagraph}>{recipeData.descriptions[rIndex]}</Typography>
            <Divide/>
            <Typography style={styles.recipeStandard} variant="h4">Ingredients</Typography>
            <Typography style={styles.recipeParagraph}>{recipeData.ingredients[rIndex]}</Typography>
            <Divide/>
            <Typography style={styles.recipeStandard} variant="h4">Instructions</Typography>
            <Typography style={styles.recipeParagraph}>{recipeData.instructions[rIndex]}</Typography>
            <Divide/>
            <Typography style={styles.recipeStandard} variant="h4" id="reviews">Reviews</Typography>
            <Grid container style={styles.recipeStandard}>
                <Typography style={{fontSize: "1.1em"}}>{ratingAvg + "\u00a0"}</Typography>
                <Divider orientation="vertical" flexItem/>
                <Typography>{"\u00a0"}</Typography>
                <Rating value={ratingAvgNum} precision={0.1} readOnly/>
                <Typography>{"\u00a0"}</Typography>
                <Divider orientation="vertical" flexItem/>
                <Typography
                    style={{fontSize: "1.1em"}}>{"\u00a0" + recipeReviews.ratings[rIndex].length + reviewWord}
                </Typography>
            </Grid>
            <br/>
            <Rating style={styles.recipeStandard}/>
            <br/>
            <TextField
                id="outlined-multiline-static"
                label="Leave Feedback"
                multiline
                rows={4}
                style={styles.textField}
                variant="outlined"
            />
            <br/><br/>
            <Button style={styles.recipeStandard} variant="contained" color="primary">Post</Button>
            <br/>
            <Divide/>
            {
                recipeReviews.reviewerNames[rIndex].map((name, index) => {
                    return (
                        <Fragment>
                            <Grid container>
                                <Typography variant="h5" style={styles.recipeStandard}>{name}</Typography>
                                <Rating value={recipeReviews.ratings[rIndex][index]} readOnly/>
                            </Grid>
                            <Typography style={styles.recipeParagraph}>{recipeReviews.reviews[rIndex][index]}</Typography>
                            <br/>
                        </Fragment>
                    )
                })
            }
        </Route>
    )
}

export default Recipes;
