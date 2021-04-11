import React from 'react';
import PropTypes from 'prop-types';
import Classes from './BurgerIngredients.css';

const burgerIngredients = (props) => {
    let ingredients = null;

    switch (props.type) {

        
        case ('bread-top'):
            ingredients = (<div className={Classes.BreadTop}>
                    <div className={Classes.seeds1}></div>
                    <div className={Classes.seeds2}></div>
            </div>);
            break;
        case ('meat'):
            ingredients = <div className={Classes.Meat}></div>
            break;
        case ('cheese'):
            ingredients = <div className={Classes.Cheese} ></div>
            break;
        case ('salad'):
            ingredients = <div className={Classes.Salad}></div>
            break;
        case ('bacon'):
            ingredients = <div className={Classes.Bacon}></div>
            break;
        case ('bread-bottom'):
            ingredients = <div className={Classes.BreadBottom}></div>
            break;

        default : 
        ingredients = null;

    }

    return ingredients;

}

burgerIngredients.prototype ={
    type : PropTypes.string.isRequired

};

export default burgerIngredients;