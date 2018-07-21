import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary= (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => { 
        return <li key = {igKey}><span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>});
    return( 
        <React.Fragment>
            <h3>Your burger is ready to be ordered!</h3>
            <p>Burger ingredients: </p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue Checkout</p>
            
            <Button btnType = "Danger" clicked = {props.purchaseCanceled}>Cancel</Button>
            <Button btnType = "Success" clicked = {props.purchaseContinue}>Continue</Button>
        </React.Fragment>
    
    ); //end of return
    
};

export default orderSummary;