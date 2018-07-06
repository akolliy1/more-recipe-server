import React, { Component } from "react";
// import Layout from "../../hoc/Layout/Layout";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from 'axios'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false })
    }
    continuePurchaseHandler = () => {
        // alert('Proceed')
        axios.get('http://localhost:2000/')
            .then(res => { console.log(res) })
            .catch(error => console.log(error))
    }
    purchaseStateHandler = (ingredients) => {
        // const ingredients = {...this.state.ingredients}
        const sum = Object.keys(ingredients)
            .map(el => ingredients[el])
            .reduce((num, el) => { return num + el }, 0)
        this.setState({
            purchasable: sum > 0
        })
    }
    addIngredientHandler = (type) => {
        const count = this.state.ingredients[type]
        const increamentItems = { ...this.state.ingredients }
        increamentItems[type] = count + 1;
        const oldPrice = this.state.totalPrice
        const newPrice = INGREDIENTS_PRICES[type] * 1
        const updatedPrice = oldPrice + newPrice;
        this.setState({
            ingredients: increamentItems,
            totalPrice: updatedPrice
        })
        this.purchaseStateHandler(increamentItems)
    }

    removeIngredientHandler = (type) => {
        const count = this.state.ingredients[type]
        const decrementItems = { ...this.state.ingredients }
        decrementItems[type] = count - 1;
        const oldPrice = this.state.totalPrice
        const newPrice = INGREDIENTS_PRICES[type] * 1
        const updatedPrice = oldPrice - newPrice;
        this.setState({
            ingredients: decrementItems,
            totalPrice: updatedPrice
        })
        this.purchaseStateHandler(decrementItems)
    }

    render() {
        let disableInfo = { ...this.state.ingredients };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <div>
                <Burger ingredients={this.state.ingredients} />
                <OrderSummary
                    purchasing={this.state.purchasing}
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    cancelBtn={this.cancelPurchaseHandler}
                    cancelBackdrop={this.cancelPurchaseHandler}
                    continueBtn={this.continuePurchaseHandler} />
                <BuildControls
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    clicked={this.purchaseHandler} />
            </div>
        )
    }
}

export default BurgerBuilder