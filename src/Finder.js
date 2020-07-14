import React, {Fragment} from "react";
import NavBar, {Divide} from "./Common";
import Typography from "@material-ui/core/Typography";
import recipeData from "./resources/recipeText";
import Vegan from "./resources/vegan.png"
import GlutenFree from "./resources/glutenFree.png"
import Grid from "@material-ui/core/Grid";

const styles = {
    recipeMargin: {
        marginLeft: "10%",
        maxWidth: "70%"
    },
    dietIcon: {
        width: "2em",
        height: "2em"
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
                    return (
                        <Fragment key={i}>
                            <Grid container style={styles.recipeMargin}>
                                <Typography variant={"h5"}>{recipeData.recipeNames[i] + "\u00a0"}</Typography>
                                <Icons rIndex={i}/>
                            </Grid>
                            <Divide/>
                        </Fragment>
                    )
                })
            }
        </Fragment>
    );
}

export default Finder;
