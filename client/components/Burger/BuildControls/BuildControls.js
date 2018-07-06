import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = ( props ) => (
        <div className={classes.BuildControls}>
        <p>Current Price: {props.price.toFixed(2)}</p>
        {
            controls.map(el => <BuildControl 
                key={el.label} 
                label={el.label}
                added={() => props.added( el.type )}
                removed={() => props.removed( el.type )}
                disabled={props.disabled[el.type]}/>
            )
        }
        <button 
        onClick={props.clicked} 
        className={classes.OrderButton}
        disabled={!props.purchasable}>ORDER NOW</button>
        </div>
)

export default buildControls