import React, {Fragment, useState} from "react";
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
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
        width: "13em",
        height: "auto",
        paddingLeft: "5em"
    },
    recipeFound: {
        fontWeight: "bold",
        marginLeft: "10%",
        maxWidth: "70%"
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

    const initialRecipesFound = new Array(recipeData.names.length);
    for (let i = 0; i < initialRecipesFound.length; i++) {
        initialRecipesFound[i] = i;
    }
    const [recipesFound, setRecipesFound] = useState(initialRecipesFound);
    const [recipeText, setRecipeText] = useState(" Recipes Found");
    const [preferences, setPreferences] = useState([false, false]);

    function searchRecipes(event) {
        const newRecipes = [];
        for (let i = 0; i < recipeData.names.length; i++) {
            if (recipeData.names[i].toLowerCase().includes(event.target.value.toLowerCase())) {
                newRecipes.push(i);
            }
        }
        setRecipesFound(newRecipes);
        if (newRecipes.length === 1) {
            setRecipeText(" Recipe Found");
        } else {
            setRecipeText(" Recipes Found");
        }
    }

    function updatePreference(preference) {
        let vegan = preferences[0], glutenFree = preferences[1];
        if (preference === "vegan") {
            vegan = !vegan;
        } else {
            glutenFree = !glutenFree;
        }
        const newRecipes = [];
        for (let i = 0; i < recipeData.names.length; i++) {
            if ((!vegan || recipeData.vegan[i]) && (!glutenFree || recipeData.glutenFree[i])) {
                newRecipes.push(i);
            }
        }
        setRecipesFound(newRecipes);
        if (newRecipes.length === 1) {
            setRecipeText(" Recipe Found");
        } else {
            setRecipeText(" Recipes Found");
        }
        if (preference === "vegan") {
            setPreferences([!preferences[0], preferences[1]]);
        } else {
            setPreferences([preferences[0], !preferences[1]]);
        }
    }

    return (
        <Fragment>
            <NavBar/>
            <Typography align="center" variant="h3" style={{fontWeight: "bold"}}>Search For Recipes</Typography>
            <Typography style={styles.recipeMargin} variant="h4">Filter by...</Typography>
            <Grid container justify="space-between" alignItems="stretch" style={styles.recipeMargin}>
                <Grid item>
                    <TextField id="outlined-basic" label="Recipe Name" variant="outlined"
                               onChange={(e) => searchRecipes(e)}/>
                </Grid>
                <Grid item>
                    <Typography>Dietary preference:</Typography>
                    <FormControlLabel value="vegan" control={<Checkbox onChange={() => updatePreference("vegan")}/>}
                                      label="Vegan"/>
                    <br/>
                    <FormControlLabel value="glutenFree"
                                      control={<Checkbox onChange={() => updatePreference("glutenFree")}/>}
                                      label="Gluten-free"/>
                </Grid>
                <Grid item>
                    <Typography>Ingredients:</Typography>
                </Grid>
            </Grid>
            <br/>
            <Typography style={styles.recipeFound} variant="h4">{recipesFound.length + recipeText}</Typography>
            <Divider/>
            <br/>
            {
                recipesFound.map(i => {
                    const ratingAvg = getRatingAverage(i);
                    const ratingNum = parseFloat(ratingAvg);
                    const reviewWord = recipeReviews.ratings[i].length === 1 ? " review" : " reviews";
                    const maxDescIndex = Math.min(800, recipeData.descriptions[i].length)
                    const shortDescription = recipeData.descriptions[i].substring(0, maxDescIndex);
                    return (
                        <Fragment key={i}>
                            <Grid container alignItems="flex-start">
                                <Grid container item xs={6} style={styles.recipeMargin}>
                                    <Grid container item>
                                        <Typography variant={"h5"}>{recipeData.names[i] + "\u00a0"}</Typography>
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
                                </Grid>
                                <Grid item xs={3}>
                                    <img style={styles.recipeImage} src={recipeData.images[i]}
                                         alt={recipeData.names[i]}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button style={styles.recipeMargin} variant="contained" color="primary"
                                            onClick={() => history.push("/recipes/" + recipeData.paths[i])}>
                                        Go To Recipe
                                    </Button>
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
