import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 50,
    cheese: 40,
    meat: 80,
    bacon: 70,
}

class BurgerBuilder extends Component{

    state = {
        ingredients :null,
        totalPrice: 120,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://burger-mania.firebaseio.com/ingredients.json')
             .then(response =>{
                 this.setState({ingredients: response.data})
             })
             .catch(error => {this.setState({error: true})})
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey => {return ingredients[igKey]}).reduce((sum, el)=>{ return sum+el},0);
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount; 
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return undefined // return or return undefined returns same output; 
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount; 
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }
    purchaseCancelHanler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        //alert('Checking out!');
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Utkarsh Upadhyay',
                address: 'Laxman Puri, Lucknow',
                email: 'utk@mail.com'
            },
            deliveryType: 'urgent',
        }
        axios.post('/orders.json', order)
        .then(response =>{
            this.setState({loading: false, purchasing: false});
        })
            .catch(error=>{
                this.setState({loading: true, purchasing: false});
            });

        };
    

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] =disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p>: <Spinner/>

        if(this.state.ingredients){
            burger = (
                <React.Fragment>
                    <Burger ingredients = {this.state.ingredients}/>
                        <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        price = {this.state.totalPrice}
                        purchaseable = {this.state.purchaseable}
                        ordered = {this.purchaseHandler}
                        />
                </React.Fragment>
            );
            orderSummary = <OrderSummary 
                price = {this.state.totalPrice.toFixed(2)}
                purchaseCanceled = {this.purchaseCancelHanler}
                purchaseContinue = {this.purchaseContinueHandler}
                ingredients = {this.state.ingredients}/>

        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        
        return (
            <React.Fragment>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHanler}>
                {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );// end of return
    } //end of render
} //end of component

export default withErrorHandler(BurgerBuilder, axios);