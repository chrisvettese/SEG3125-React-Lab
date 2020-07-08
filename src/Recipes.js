import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {NavBar} from "./Common";

const recipePaths = ["sugarCookies", "cinnamonRolls", "whiteBread", "cinnamonRaisin", "chocolateChip", "molassesCookies"];

function RecipePaths() {
    return (
        recipePaths.map(rPath => {
            return (
                <Route path={"/" + rPath} key={rPath}>
                    <Recipe/>
                </Route>
            )
        })
    );
}

function Recipe() {
    const path = window.location.pathname;
    return (
        <Fragment>
            <NavBar/>
            <Typography>{path}</Typography>
        </Fragment>
    );
}

export default RecipePaths;
