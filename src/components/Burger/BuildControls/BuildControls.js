import React from 'react';
import Classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';




const controls =[
    {label : 'Salad' , type : 'salad'},
    {label : 'Bacon' , type : 'bacon'},
    {label : 'Cheese' , type : 'cheese'},
    {label : 'Meat' , type : 'meat'}

]

const buildControls =(props) =>(
        <div className={Classes.BuildControls}>
            <p>Total Price : <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(el=> 
                <BuildControl key={el.label}  label ={el.label} 
                add ={() =>props.addIngredients(el.type)}
                removed ={ () => props.removeIngredients(el.type)} 
                disable ={ props.disabled[el.type]}/>
                )}
            <button className ={Classes.OrderButton}
                    disabled ={!props.purchase}
                    onClick ={props.order}
            >ORDER NOW</button>
        </div>

);

export default buildControls;