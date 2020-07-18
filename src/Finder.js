import React, {Fragment, useEffect, useState} from "react";
import NavBar, {Divide, Footer, getRatingAverage} from "./Common";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
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
    standardFont: {
        fontSize: "1.1em"
    },
    minorTitle: {
        fontWeight: "bold",
        fontSize: "1.3em"
    },
    divideColour: {
        backgroundColor: "#F50057",
        height: "0.15em"
    },
    bold: {
        fontWeight: "bold"
    }
}));

function Finder() {
    const classes = useStyles();
    const history = useHistory();

    let initialLang = 0;
    if (history.location.state !== undefined && history.location.state.lang !== undefined) {
        initialLang = history.location.state.lang;
    }
    const [lang, setLang] = useState(initialLang);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const initialRecipesFound = new Array(recipeData.names.length);
    for (let i = 0; i < initialRecipesFound.length; i++) {
        initialRecipesFound[i] = i;
    }

    const [recipesFound, setRecipesFound] = useState(initialRecipesFound);
    const [recipeText, setRecipeText] = useState(" Recipes Found");
    const [preferences, setPreferences] = useState([false, false]);
    const [searchStr, setSearchStr] = useState("");
    const [recipeType, setRecipeType] = useState('');

    function Icons({rIndex}) {
        if (recipeData.vegan[rIndex]) {
            return <img src={Vegan} className={classes.dietIcon} title="Vegan" alt="Vegan"/>
        }
        if (recipeData.glutenFree[rIndex]) {
            return <img src={GlutenFree} className={classes.dietIcon} title="Gluten Free" alt="Gluten Free"/>
        }
        return <Fragment/>
    }

    function updateType(event) {
        setRecipeType(event.target.value);
        generateList(searchStr, preferences[0], preferences[1], event.target.value)
    }

    function searchRecipes(event) {
        setSearchStr(event.target.value);
        generateList(event.target.value, preferences[0], preferences[1], recipeType)
    }

    function updatePreference(preference) {
        let vegan = preferences[0], glutenFree = preferences[1];
        if (preference === "vegan") {
            vegan = !vegan;
        } else {
            glutenFree = !glutenFree;
        }
        setPreferences([vegan, glutenFree]);
        generateList(searchStr, vegan, glutenFree, recipeType);
    }

    function generateList(searchStr, isVegan, isGlutenFree, recipeType) {
        const newRecipes = [];
        const searchActive = searchStr !== "";
        const typeActive = recipeType !== "";
        for (let i = 0; i < recipeData.names.length; i++) {
            if (searchActive && !recipeData.names[i].toLowerCase().includes(searchStr.toLowerCase())) {
                continue;
            }
            if (isVegan && !recipeData.vegan[i]) {
                continue;
            }
            if (isGlutenFree && !recipeData.glutenFree[i]) {
                continue;
            }
            if (typeActive && recipeType !== recipeData.types[i]) {
                continue;
            }
            newRecipes.push(i);
        }
        setRecipesFound(newRecipes);
        if (newRecipes.length === 1) {
            setRecipeText(" Recipe Found");
        } else {
            setRecipeText(" Recipes Found");
        }
    }

    return (
        <Fragment>
            <NavBar lang={lang} setLang={setLang}/>
            <Typography align="center" variant="h3" className={classes.bold}>Search For Recipes</Typography>
            <Typography className={classes.recipeMargin} variant="h4">Filter by...</Typography>
            <Grid container justify="space-between" alignItems="stretch" className={classes.recipeMargin}>
                <Grid item>
                    <Typography className={classes.minorTitle}>Recipe title:</Typography>
                    <TextField id="outlined-basic" label="Title" variant="outlined" color="secondary"
                               onChange={searchRecipes}/>
                </Grid>
                <Grid item>
                    <Typography className={classes.minorTitle}>Dietary preferences:</Typography>
                    <FormControlLabel value="vegan" className={classes.standardFont}
                                      control={<Checkbox onChange={() => updatePreference("vegan")}/>} label="Vegan"/>
                    <br/>
                    <FormControlLabel value="glutenFree" className={classes.standardFont}
                                      control={<Checkbox onChange={() => updatePreference("glutenFree")}/>}
                                      label="Gluten-free"/>
                </Grid>
                <Grid item>
                    <Typography className={classes.minorTitle}>Type of recipe:</Typography>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={recipeType}
                            onChange={updateType}
                            color="secondary"
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{'aria-label': 'Recipe Type'}}
                        >
                            <MenuItem value="">
                                <em>Any</em>
                            </MenuItem>
                            <MenuItem value="cookies">Cookies</MenuItem>
                            <MenuItem value="pastries">Pastries</MenuItem>
                            <MenuItem value="bread">Bread</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <br/>
            <Typography className={classes.recipeMargin} variant="h4">{recipesFound.length + recipeText}</Typography>
            <Divider className={classes.divideColour}/>
            <br/>
            {
                recipesFound.map(i => {
                    const ratingAvg = getRatingAverage(recipeReviews.ratings[i]);
                    const ratingNum = parseFloat(ratingAvg);
                    const reviewWord = recipeReviews.ratings[i].length === 1 ? " review" : " reviews";
                    const maxDescIndex = Math.min(800, recipeData.descriptions[i].length)
                    const shortDescription = recipeData.descriptions[i].substring(0, maxDescIndex);
                    return (
                        <Fragment key={i}>
                            <Grid container alignItems="flex-start">
                                <Grid container item xs={6} className={classes.recipeMargin}>
                                    <Grid container item>
                                        <Typography className={classes.minorTitle}
                                                    variant={"h5"}>{recipeData.names[i] + "\u00a0"}</Typography>
                                        <Icons rIndex={i}/>
                                    </Grid>
                                    <Grid container item>
                                        <Typography className={classes.standardFont}>{ratingAvg + "\u00a0"}</Typography>
                                        <Divider orientation="vertical" flexItem/>
                                        <Typography>{"\u00a0"}</Typography>
                                        <Rating value={ratingNum} precision={0.1} readOnly/>
                                        <Typography>{"\u00a0"}</Typography>
                                        <Divider orientation="vertical" flexItem/>
                                        <Typography
                                            className={classes.standardFont}>{"\u00a0" + recipeReviews.ratings[i].length + reviewWord}</Typography>
                                    </Grid>
                                    <Typography className={classes.paragraphFade}>{shortDescription}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <img className={classes.recipeImage} src={recipeData.images[i]}
                                         alt={recipeData.names[i]}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button className={classes.recipeMargin} variant="contained" color="primary"
                                            onClick={() => history.push("/recipes/" + recipeData.paths[i], {lang: lang})}>
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
            <Footer lang={lang}/>
        </Fragment>
    );
}

export default Finder;
