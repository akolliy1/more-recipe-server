import React from "react";
import BurgerLogo from "../../assets/Images/burger-logo.png";
import classes from "./Logo.css";

const logo = props => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt='Logo-Images'/>
    </div>
)

export default logo