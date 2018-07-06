import React,{ Component } from "react";
import Aux from "../../hoc/Auxs/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    cancelSideDrawer = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerStateHandler = () => {
        this.setState( (prevState) => { 
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    render () {
        return (
            // drawerToggle = { this.sideDrawerStateHandler } enabledSideDrawer = { this.state.showSideDrawer }
            // <div>side nav,</div> 
            <Aux>
                <Toolbar 
                drawerToggle={this.sideDrawerStateHandler} />
                <SideDrawer 
                showSideDrawer={this.state.showSideDrawer} 
                cancelBackdrop={this.cancelSideDrawer}/>
                <main className={classes.Content}> {this.props.children} </main>
            </Aux>
        )
    }
}

export default Layout