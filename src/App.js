import React from "react";
import logo from "./logo.png";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom';
import {styles} from "./index";

function App() {
    const history = useHistory();
    return (
        <div>
            <AppBar position="sticky">
                <Tabs>
                    <Tab label="Home"/>
                    <Tab label="About"/>
                    <Tab label="Recipe Finder"/>
                    <Tab label="Contact Us"/>
                </Tabs>
            </AppBar>
            <img src={logo} alt="Logo" style={styles.logo}/>
            <Typography align="center" variant="h3">Bake From Home</Typography>
            <Typography align="center" variant="h4">Recipe Finder</Typography>
            <Typography align="center">Find a baking recipe that's perfect for you! Search for recipes by food name,
                dietary preference, and by ingredients in your kitchen.</Typography>
            <Grid container justify="center">
                <Button variant="contained" color="primary" onClick={() => history.push('/Finder')}>Go to Recipe
                    Finder</Button>
            </Grid>
        </div>
    );
}

export default App;
