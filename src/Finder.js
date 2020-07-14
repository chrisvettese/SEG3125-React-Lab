import React, {Fragment} from "react";
import NavBar, {Divide, getRatingAverage} from "./Common";
import Typography from "@material-ui/core/Typography";
import recipeData from "./resources/recipeText";
import Vegan from "./resources/vegan.png"
import GlutenFree from "./resources/glutenFree.png"
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import recipeReviews from "./resources/recipeReviews";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const styles = {
    recipeMargin: {
        marginLeft: "10%",
        maxWidth: "70%"
    },
    dietIcon: {
        width: "2em",
        height: "2em"
    },
    recipeDescription: {
        marginLeft: "10%",
        maxWidth: "70%",
        fontSize: "1.1em"
    },
    paragraphFade: {
        fontSize: "1.1em",
        background: "-webkit-linear-gradient(#000000, #FFFFFF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    },
    recipeImage: {
        width: "10em",
        height: "auto"
    }
};

function Icons({rIndex}) {
    if (recipeData.vegan[rIndex]) {
        return <img src={Vegan} style={styles.dietIcon} title="Vegan" alt="Vegan"/>
    }
    if (recipeData.glutenFree[rIndex]) {
        return <img src={GlutenFree} style={styles.dietIcon} title="Gluten Free" alt="Gluten Free"/>
    }
    return <Fragment/>
}

function Finder() {
    const history = useHistory();
    const recipesFound = new Array(recipeData.recipeNames.length);
    for (let i = 0; i < recipesFound.length; i++) {
        recipesFound[i] = i;
    }
    return (
        <Fragment>
            <NavBar/>
            <Typography style={styles.recipeMargin} variant="h4">{recipesFound.length + " Recipes Found"}</Typography>
            <Divide/>
            {
                recipesFound.map(i => {
                    const ratingAvg = getRatingAverage(i);
                    const ratingNum = parseFloat(ratingAvg);
                    const reviewWord = recipeReviews.ratings[i].length === 1 ? " review" : " reviews";
                    const maxDescIndex = Math.min(300, recipeData.recipeParagraphs[i].length)
                    const shortDescription = recipeData.recipeParagraphs[i].substring(0, maxDescIndex);
                    return (
                        <Fragment key={i}>
                            <Grid container style={styles.recipeMargin}>
                                <Grid container item xs={6}>
                                    <Grid container item>
                                        <Typography variant={"h5"}>{recipeData.recipeNames[i] + "\u00a0"}</Typography>
                                        <Icons rIndex={i}/>
                                    </Grid>
                                    <Grid container item>
                                        <Typography style={{fontSize: "1.1em"}}>{ratingAvg + "\u00a0"}</Typography>
                                        <Divider orientation="vertical" flexItem/>
                                        <Typography>{"\u00a0"}</Typography>
                                        <Rating value={ratingNum} precision={0.1} readOnly/>
                                        <Typography>{"\u00a0"}</Typography>
                                        <Divider orientation="vertical" flexItem/>
                                        <Typography
                                            style={{fontSize: "1.1em"}}>{"\u00a0" + recipeReviews.ratings[i].length + reviewWord}</Typography>
                                    </Grid>
                                    <Typography style={styles.paragraphFade}>{shortDescription}</Typography>
                                    <br/>
                                    <Button style={styles.recipeMargin} variant="contained" color="primary"
                                            onClick={() => history.push("/recipes/" + recipeData.recipePaths[i])}>
                                        Go To Recipe
                                    </Button>
                                </Grid>
                                <Grid container item xs={6}>
                                    <img style={styles.recipeImage} src={recipeData.recipeImages[i]} alt={recipeData.recipeNames[i]}/>
                                </Grid>
                            </Grid>
                            <br/>
                            <Divide/>
                        </Fragment>
                    )
                })
            }
        </Fragment>
    );
}

export default Finder;
