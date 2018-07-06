import React from "react";
import classes from "./DrawerToggle.css";

const drawerToggle = props => (
    // <div><div></div><div></div><div></div></div> = |||
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default drawerToggle