import React, { Component } from 'react'
import Button from "../../UI/Button/Button";
import Modal from "../../../hoc/Modal/Modal";

class OrderSummary extends Component {
    componentWillUpdate (prevProps) {
        // console.log('[OrderSumarry] willUpdate', this.props.purchasing)
        // return prevProps.purchasing !== this.props.purchasing
    }
    shouldComponentUpdate(prevProps) {
        // console.log('[OrderSumarry] shouldUpdate', this.props.purchasing)
        return prevProps.purchasing !== this.props.purchasing
    }
    render () {
        const mappedIngredient = Object.keys(this.props.ingredients)
            .map( igKey => <li key={igKey}> <strong> { igKey }: { this.props.ingredients[igKey] } </strong> </li>)
        return (
            this.props.purchasing ?
                <Modal clicked={this.props.cancelBackdrop} show={this.props.purchasing}>
                    <h3>Your Order</h3>
                    <p>A delicious burger with the following ingredients:</p>
                    <ul>{mappedIngredient}</ul>
                    <p>Total Order is: {this.props.totalPrice.toFixed(2)}</p>
                    <p>Continue to Checkout?</p>
                    <Button BtnType="Danger" clicked={this.props.cancelBtn}>CANCEL</Button>
                    <Button BtnType="Success" clicked={this.props.continueBtn}>CONTINUE</Button>
                </Modal> : null
        )
    }
}

export default OrderSummary