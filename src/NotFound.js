import React, {Fragment, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import NavBar from "./Common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
    bold: {
        fontWeight: "bold"
    }
}));

function NotFound() {
    const classes = useStyles();
    const history = useHistory();

    const [lang, setLang] = useState(0);

    //Website translations
    const pageNotFound = ["Page not found!", "Page non trouvée!"]
    const returnHome = ["Return Home", "Rentrer à la Maison"]

    return (
        <Fragment>
            <NavBar lang={lang} setLang={setLang}/>
            <Typography align="center" className={classes.bold} variant="h3">{pageNotFound[lang]}</Typography>
            <br/>
            <Grid container justify="center">
                <Button variant="contained" color="primary"
                        onClick={() => history.push("/seg3125-react-lab", {lang: lang})}>{returnHome[lang]}</Button>
            </Grid>
        </Fragment>
    )
}

export default NotFound;
