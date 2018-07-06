import React from "react";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxs/Aux";
import NavigationItems from "../NavigationItems/NavigationItems";
const sideDrawer = props => {
    //<div><Backdrop /><NavigationItems /></div>
    let style = [classes.SideDrawer, classes.Close];
    if (props.showSideDrawer) {
        style = [classes.SideDrawer, classes.Open]
    }

    return (
        props.showSideDrawer ?
        <Aux>
            <Backdrop clicked={props.cancelBackdrop}/>

            <div className={style.join(' ')}>

                <NavigationItems />

            </div>

        </Aux>
        : null
    )
}

export default sideDrawer