import React from "react";
import classes from "./Button.css";
const button = props => {
    const customBtn = props.BtnType
    const styleBtn = [classes.Button, classes[customBtn]].join(' ')
    return <button className={styleBtn} onClick={props.clicked}>{props.children}</button>
}

export default button