import React, {Fragment, useEffect, useRef, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom';
import NavBar, {Divide, Footer} from "./Common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import recipeData from "./resources/recipeText";
import {useLocation} from "react-router-dom";
import Cake from "./resources/cake.jpg";
import Bagels from "./resources/bagels.jpg";
import LandscapeCookies from "./resources/landscapeCookies.jpg";

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
    hugeImage: {
        width: "35em",
        height: "auto",
        paddingLeft: "1em",
        paddingRight: "1em"
    },
    hugerImage: {
        width: "55em",
        height: "auto",
        paddingLeft: "1em",
        paddingRight: "1em",
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

    //Website translations
    const bakeFromHome = ["Bake From Home", "Cuire à la Maison"];
    const easy = ["Easy baking recipes you can make from home.", "Recettes de cuisson faciles que vous pouvez faire à la maison."]
    const about = ["About", "À Propos"];
    const aboutText = ["We create baking recipes that can easily be made at home. Our goal is to allow everyone to be able to make their own freshly baked goods. To start, go the recipe section to find the perfect recipe for you! If you have any questions, feel free to call or email us.", "Nous créons des recettes de pâtisserie qui peuvent facilement être faites à la maison. Notre objectif est de permettre à chacun de fabriquer ses propres produits de boulangerie. Pour commencer, allez dans la section des recettes pour trouver la recette parfaite pour vous! Si vous avez des questions, n'hésitez pas à nous appeler ou à nous envoyer un e-mail."]
    const recipes = ["Recipes", "Recettes"];
    const recipeText1 = ["Find a baking recipe that's perfect for you! Search for recipes by food name, dietary preference, and by ingredients in your kitchen.", "Trouvez une recette de cuisson parfaite pour vous! Recherchez des recettes par nom de nourriture, préférence alimentaire et par ingrédients dans votre cuisine."]
    const recipeButton = ["Go To Recipe Finder", "Aller à l'outil de recherche de recettes"];
    const recipeText2 = ["We are continuously adding new recipes. If you have any suggestions, please contact us!", "Nous ajoutons continuellement de nouvelles recettes. Si vous avez des suggestions, contactez-nous!"];
    const contactUs = ["Contact Us", "Nous Contacter"];
    const contactText = ["Have any questions or suggestions? Reach us at help@bakefromhome.com, or 555-555-5555.", "Vous avez des questions ou des suggestions? Contactez-nous à help@bakefromhome.com, ou 555-555-5555."];

    useEffect(() => {
        setTimeout(() => {
            if (location.hash === "") {
                window.scroll(0, 0);
            } else if (location.hash === "#about") {
                window.scroll(0, 0);
                window.scroll(0, aboutRef.current.getBoundingClientRect().top - 55);
            } else if (location.hash === "#recipes") {
                window.scroll(0, 0);
                window.scroll(0, recipeRef.current.getBoundingClientRect().top - 55);
            } else if (location.hash === "#contact") {
                window.scroll(0, 0);
                window.scroll(0, contactRef.current.getBoundingClientRect().top - 55);
            }
        }, 50);
    }, [location]);

    return (
        <Fragment>
            <NavBar lang={lang} setLang={setLang}/>
            <Typography align="center" variant="h3" className={classes.bold}>{bakeFromHome[lang]}</Typography>
            <Typography align="center" className={classes.standardText}>{easy[lang]}</Typography>
            <Grid container justify="center">
                <img className={classes.bigImage} src={recipeData.images[0]} alt={recipeData.names[0]}/>
                <img className={classes.bigImage} src={recipeData.images[1]} alt={recipeData.names[1]}/>
                <img className={classes.bigImage} src={recipeData.images[3]} alt={recipeData.names[3]}/>
            </Grid>
            <Divide/>
            <div ref={aboutRef}/>
            <Typography className={classes.sideAlign} variant="h4">{about[lang]}</Typography>
            <Typography className={classes.sideAlignText}>{aboutText[lang]}</Typography>
            <Grid container justify="center">
                <img src={Cake} alt="Cake" className={classes.bigImage}/>
                <img src={Bagels} alt="Bagels" className={classes.bigImage}/>
            </Grid>
            <br/>
            <Divide/>
            <div ref={recipeRef}/>
            <Typography className={classes.sideAlign} variant="h4">{recipes[lang]}</Typography>
            <Typography className={classes.sideAlignText}>{recipeText1[lang]}</Typography>
            <Button className={classes.sideAlign} variant="contained" color="primary"
                    onClick={() => history.push("/recipes", {lang: lang})}>{recipeButton[lang]}</Button>
            <br/><br/>
            <Typography className={classes.sideAlignText}>{recipeText2[lang]}</Typography>
            <br/>
            <Grid container justify="center">
                <img src={LandscapeCookies} alt="Chocolate Chip Cookies" className={classes.hugerImage}/>
            </Grid>
            <Divide/>
            <div ref={contactRef}/>
            <Typography className={classes.sideAlign} variant="h4">{contactUs[lang]}</Typography>
            <Typography className={classes.sideAlignText}>{contactText[lang]}</Typography>
            <br/>
            <Footer lang={lang}/>
        </Fragment>
    );
}

export default App;
