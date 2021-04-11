import React ,{Component} from 'react';

import Aux from '../../hoc/Auxy/Auxy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from  '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios-Orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE ={
    salad: 0.4,
    bacon : 0.7,
    cheese :0.6,
    meat :1
}
class BurgerBuilder extends Component{

    state ={
        ingredients :null,
        totalPrice :4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
    }
    componentDidMount (){
        console.log('Component did mount')
        axios.get('/ingredients.json')
        .then(response => {
            console.log(response);
            this.setState({ingredients : response.data});
        }).catch(error => {
            this.setState({error : true});
        });
    }

    purchaseHandler =() =>{
        this.setState({purchasing: true});
    }
    purchaseCancelled  =() =>{
        this.setState({purchasing: false});
    }
    purchaseContinued =() =>{
        //alert('You have successfully ordered');
        // this.setState({loading: true});
        // const orders ={
        //     ingredients :this.state.ingredients,
        //     totalPrice :this.state.totalPrice.toFixed(2),
        //     customer :{
        //         address :{
        //             Country : 'India'
        //         },
        //         email : 'mango123@gmail.com'
        //     },
        //     deliveryMethod : 'fastest'
        // }

        // axios.post ('/orders.json' , orders)
        // .then(response => {
        //     this.setState({loading: false ,  purchasing : false});
        //   console.log(response);
        // } )
        // .catch(error => {
        //     console.log(error);
        //     this.setState({loading: false , purchasing : false});
        // });
        const queryParams =[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent (this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice.toFixed(2));
        const queryString   = queryParams.join('&');


        this.props.history.push ({
            pathname :'/Checkout',
            search : '?' + queryString
        })
    }
    updatePurchasableState = (ingredients) =>{

        const sum = Object.keys(ingredients)
        .map (igKey =>{
            return ingredients[igKey];
        }).reduce((sum ,el) =>{
            return sum +el;
        },0);
        this.setState({purchasable : sum>0});
    } 

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount +1;
        const updatedIngredients ={...this.state.ingredients};
        updatedIngredients[type] = newCount;

        const priceAddition= INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;

        this.setState({totalPrice : updatedPrice , ingredients : updatedIngredients});
        this.updatePurchasableState(updatedIngredients);

    }

    removeIngredientHandler =( type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount -1;
        if(oldCount <= 0) {
            return
        }
        const updatedIngredients ={...this.state.ingredients};
        updatedIngredients[type] = newCount;

        const priceDeduction= INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice -priceDeduction;

        this.setState({totalPrice : updatedPrice , ingredients : updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
    } 


    render(){

        const disabledInfo ={
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let burger = this.state.error ?  <p>Something went wrong</p>:<Spinner/>;
        let orderSummary = null;
        if(this.state.ingredients){
            burger=<Aux>
                <Burger ingredients ={this.state.ingredients}/>
               <BuildControls addIngredients ={this.addIngredientHandler} 
                removeIngredients ={this.removeIngredientHandler}
                disabled ={disabledInfo}
                price ={this.state.totalPrice}
                purchase ={this.state.purchasable}
                order ={this.purchaseHandler}/>
            </Aux>
              orderSummary  = 
              <OrderSummary ingredients={this.state.ingredients}
              purchaseCancelled ={this.purchaseCancelled}
              purchaseContinued = {this.purchaseContinued}
              price ={this.state.totalPrice}
             />
        }

       
        if(this.state.loading === true){
            orderSummary= <Spinner/>
        }
        return (

            <Aux>
                <Modal show ={this.state.purchasing} CloseModal={this.purchaseCancelled}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
            
        );

    }
}

export default withErrorHandler (BurgerBuilder , axios);