import React from  'react';
import Burger from '../../Burger/Burger';
import Button   from  '../../UI/Button/Button';
import Classes from './CheckoutSummary.css';


const checkoutSummary  =(props) =>{
    console.log(props.ingredients + '..........');
    return (
        <div className={Classes.CheckoutSummary}>
            <h1>It Taste well</h1>
            <div style={{margin:'auto',width:'100%'}}>
               
                <Burger ingredients ={props.ingredients}/>
            </div>
            <Button btnType = "Danger" clicked ={props.checkoutSummaryCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked ={props.checkoutSummaryContinued}>CONTINUE</Button>
        </div>
    );
}

export  default checkoutSummary;