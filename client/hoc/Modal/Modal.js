import React from "react";
import classes from "./Modal.css";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Aux from "../Auxs/Aux";

const modal = props => (

    // let style = [classes.Modal, classes.Close]
    // if (props.show) {
    //     style = [classes.Modal, classes.Open]
    // }
    <Aux>
        <Backdrop clicked={props.clicked} />
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        > {props.children} </div>
    </Aux>

)

export default modal