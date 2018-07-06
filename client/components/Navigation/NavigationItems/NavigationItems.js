import React from "react";
import NavigationItem from "../NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const NavigationItems = props => (
    // <ul><li>navItem</li><li>navItem</li><li>navItem</li></ul>
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' item="Burger-Builder" active/>
        <NavigationItem link='/' item="Burger-checkout"/>
    </ul>
)

export default NavigationItems