import React, {Fragment, useEffect, useState} from "react";
import {Route} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';
import NavBar, {Divide, Footer, getRatingAverage} from "./Common";
import Grid from "@material-ui/core/Grid";
import ScrollableAnchor, {configureAnchors} from 'react-scrollable-anchor'
import recipeData from "./resources/recipeText";
import recipeReviews from "./resources/recipeReviews";
import Divider from "@material-ui/core/Divider";
import NotFound from "./NotFound";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useLocation, useHistory} from "react-router-dom";
import IngredientsIcon from "./resources/ingredients.png"
import InstructionsIcon from "./resources/instructions.png"
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const useStyles = makeStyles(() => ({
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
        marginTop: "1em",
        marginLeft: "10%",
        width: "30em"
    },
    reviewerName: {
        marginLeft: "10%",
        maxWidth: "70%",
        fontWeight: "bold",
        fontSize: "1.3em"
    },
    bold: {
        fontWeight: "bold"
    },
    standardFont: {
        fontSize: "1.1em"
    },
    titleIcon: {
        width: "2em",
        height: "2em"
    }
}));

function Recipes() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    const reviewPosted = ["Review Submitted.", "Examen soumis."];
    const ingredients = ["Ingredients", "Ingrédients"];


    configureAnchors({offset: -55, scrollDuration: 0});

    const path = window.location.pathname.substring(27);
    const rIndex = recipeData.paths.indexOf(path);
    let tmpIndex = rIndex;
    if (rIndex === -1) {
        tmpIndex = 0;
    }

    useEffect(() => {
        if (location.hash === "") {
            window.scroll(0, 0);
        }
    }, [location]);

    const [ratingAvg, setRatingAvg] = useState(getRatingAverage(recipeReviews.ratings[tmpIndex]));
    const [ratingAvgNum, setRatingAvgNum] = useState(parseFloat(ratingAvg));
    const [reviewWord, setReviewWord] = useState(recipeReviews.ratings[tmpIndex].length === 1 ? " review" : " reviews");
    const [reviewerNames, setReviewerNames] = useState(recipeReviews.reviewerNames[tmpIndex]);
    const [ratings, setRatings] = useState(recipeReviews.ratings[tmpIndex]);
    const [reviews, setReviews] = useState(recipeReviews.reviews[tmpIndex]);

    const [newName, setNewName] = useState("");
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [showNameError, setShowNameError] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    let initialLang = 0;
    if (history.location.state !== undefined && history.location.state.lang !== undefined) {
        initialLang = history.location.state.lang;
    }
    const [lang, setLang] = useState(initialLang);

    if (rIndex === -1) {
        return (
            <NotFound/>
        );
    }

    function postReview() {
        if (newName === "") {
            setShowNameError(true);
            return;
        }
        const newNames = [newName].concat(reviewerNames);
        const newRatings = [newRating].concat(ratings);
        const newReviews = [newReview].concat(reviews);
        const newRatingAvg = getRatingAverage(newRatings);
        const newRatingAvgNum = parseFloat(ratingAvg);

        setReviewWord(newReviews.length === 1 ? " review" : " reviews");
        setReviewerNames(newNames);
        setRatingAvg(newRatingAvg);
        setRatingAvgNum(newRatingAvgNum);
        setRatings(newRatings);
        setReviews(newReviews);

        setNewName("");
        setNewRating(0);
        setNewReview("");

        setOpen(true);
    }

    return (
        <Route path={"/seg3125-react-lab/recipes/" + path} key={path}>
            <NavBar lang={lang} setLang={setLang}/>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={reviewPosted[lang]}
            >
                <SnackbarContent style={{
                    backgroundColor: "#5465BF",
                }} message={reviewPosted[lang]}/>
            </Snackbar>
            <Typography align="center" variant="h3"
                        className={classes.bold}>{recipeData.names[rIndex] + "\u00a0"}</Typography>
            <Grid container justify="center">
                <Rating value={ratingAvgNum} precision={0.1} readOnly/>
                <Divider orientation="vertical" flexItem/>
                <Typography>{"\u00a0"}</Typography>
                <a href="#reviews">
                    <Typography className={classes.standardFont}>{ratings.length + reviewWord}</Typography>
                </a>
            </Grid>
            <br/>
            <Grid container justify="center">
                <img src={recipeData.images[rIndex]} alt={recipeData.names[rIndex]} className={classes.recipeImage}/>
            </Grid>
            <br/>
            <Typography className={classes.recipeParagraph}>{recipeData.descriptions[rIndex]}</Typography>
            <Divide/>
            <Grid container>
                <Typography className={classes.recipeStandard} variant="h4">{ingredients[lang]}</Typography>
                <img src={IngredientsIcon} alt={"Ingredients Icon"} className={classes.titleIcon} title={ingredients[lang]}/>
            </Grid>
            <Typography className={classes.recipeParagraph}>{recipeData.ingredients[rIndex]}</Typography>
            <Divide/>
            <Grid container>
                <Typography className={classes.recipeStandard} variant="h4">Instructions</Typography>
                <img src={InstructionsIcon} alt={"Instructions Icon"} className={classes.titleIcon}
                     title="Instructions"/>
            </Grid>
            <Typography className={classes.recipeParagraph}>{recipeData.instructions[rIndex]}</Typography>
            <Divide/>
            <ScrollableAnchor id={"reviews"}>
                <Typography className={classes.recipeStandard} variant="h4" id="reviews">Reviews</Typography>
            </ScrollableAnchor>
            <Grid container className={classes.recipeStandard}>
                <Typography className={classes.standardFont}>{ratingAvg + "\u00a0"}</Typography>
                <Divider orientation="vertical" flexItem/>
                <Typography>{"\u00a0"}</Typography>
                <Rating value={ratingAvgNum} precision={0.1} readOnly/>
                <Typography>{"\u00a0"}</Typography>
                <Divider orientation="vertical" flexItem/>
                <Typography className={classes.standardFont}>{"\u00a0" + ratings.length + reviewWord}</Typography>
            </Grid>
            <br/>
            <Rating name="review-rating" value={newRating} className={classes.recipeStandard}
                    onChange={(_, newValue) => setNewRating(newValue)}/>
            <br/>
            <TextField
                className={classes.recipeStandard}
                label="Name"
                variant="outlined"
                value={newName}
                color="secondary"
                onChange={e => {
                    setNewName(e.target.value);
                    setShowNameError(false);
                }}
                error={showNameError}
                helperText={showNameError ? "Please enter your name." : ""}
            />
            <br/>
            <TextField
                id="outlined-multiline-static"
                label="Leave feedback (optional)"
                multiline
                color="secondary"
                rows={4}
                className={classes.textField}
                variant="outlined"
                value={newReview}
                onChange={e => setNewReview(e.target.value)}
            />
            <br/><br/>
            <Button className={classes.recipeStandard} variant="contained" color="primary" onClick={() => postReview()}>
                Post
            </Button>
            <br/>
            <Divide/>
            {
                reviewerNames.map((name, index) => {
                    return (
                        <Fragment key={index}>
                            <Grid container>
                                <Typography className={classes.reviewerName}>{name}</Typography>
                                <Rating value={ratings[index]} readOnly/>
                            </Grid>
                            <Typography
                                className={classes.recipeParagraph}>{reviews[index]}</Typography>
                            <br/>
                        </Fragment>
                    )
                })
            }
            <br/>
            <Footer lang={lang}/>
        </Route>
    )
}

export default Recipes;
