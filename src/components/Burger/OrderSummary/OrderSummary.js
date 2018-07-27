import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    //this component can just be a functional component and not a class. For debugging process
        componentWillUpdate(){
            console.log('[OrderSummary] will update')
        }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => { 
        return <li key = {igKey}><span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>});
        return( 
        <React.Fragment>
            <h3>Your burger is ready to be ordered!</h3>
            <p>Burger ingredients: </p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Total Price: {this.props.price}</strong></p>
            <p>Continue Checkout</p>
            
            <Button btnType = "Danger" clicked = {this.props.purchaseCanceled}>Cancel</Button>
            <Button btnType = "Success" clicked = {this.props.purchaseContinue}>Continue</Button>
        </React.Fragment>
    
    ); //end of return
    
}};

export default OrderSummary;