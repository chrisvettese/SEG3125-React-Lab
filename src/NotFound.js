import React, {Fragment} from 'react';
import Typography from "@material-ui/core/Typography";
import NavBar from "./Common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(() => ({
    standard: {
        marginLeft: "10%",
        maxWidth: "70%"
    }
}));

function NotFound() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Fragment>
            <NavBar/>
            <Typography className={classes.standard} variant="h3">Page not found!</Typography>
            <br/>
            <Button className={classes.standard} variant="contained" color="primary" onClick={() => history.push("/")}>Return Home</Button>
        </Fragment>
    )
}

export default NotFound;
