import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolBar = props => {
    // <header><div>logo</div><nav>navitems</nav></header>
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggle} />
            
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default toolBar