import React from "react";
import {Route} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {NavBar} from "./Common";

const recipePaths = ["sugarCookies", "cinnamonRolls", "whiteBread", "cinnamonRaisin", "chocolateChip", "molassesCookies"];

export function RecipePaths() {
    return (
        recipePaths.map(path => {
            return (
                <Route path={"/recipes/" + path} key={path}>
                    <Recipe/>
                </Route>
            )
        })
    );
}

function Recipe() {
    const path = window.location.pathname;
    return (
        <div>
            <NavBar/>
            <Typography>{path}</Typography>
        </div>
    );
}

export default RecipePaths;
