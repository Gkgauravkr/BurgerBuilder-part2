import React from 'react';
import Classes from  './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger  =(props) =>{

    let transformedIngredients = Object.keys(props.ingredients)
    .map(iKey =>{
        console.log(iKey);
        console.log("props.ingredients[iKey]  " +props.ingredients[iKey]);
       return [...Array(props.ingredients[iKey])].map((_,i) =>{
           console.log("Ikey + i " +iKey+i);
          return <BurgerIngredients key ={iKey+i} type={iKey} />;
       
       } )

    })
    .reduce((arr , el) =>{
        return (arr.concat(el)
        );
    }, []);
    console.log(transformedIngredients);
    if(transformedIngredients.length ===0){
        transformedIngredients=<p>Please start adding ingredients</p>
    }
    return  (
        <div className ={Classes.Burger}>
                <BurgerIngredients type ="bread-top"/>
                
               {transformedIngredients}
                <BurgerIngredients type ="bread-bottom"/>
        </div>
    );
};

export default burger;