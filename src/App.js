import React, {Fragment} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom';
import {NavBar} from "./Common";

function App() {
    const history = useHistory();
    return (
        <Fragment>
            <NavBar/>
            <Typography align="center" variant="h3">Bake From Home</Typography>
            <Typography align="center" variant="h4">Recipe Finder</Typography>
            <Typography align="center">Find a baking recipe that's perfect for you! Search for recipes by food name,
                dietary preference, and by ingredients in your kitchen.</Typography>
            <Grid container justify="center">
                <Button variant="contained" color="primary" onClick={() => history.push('/recipes')}>Go to Recipe
                    Finder</Button>
            </Grid>
        </Fragment>
    );
}

export default App;
