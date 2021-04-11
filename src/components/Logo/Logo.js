import React from  'react';
import burgerImage  from '../../assets/Images/burger-logo1.png';
import Classes from './Logo.css';

const logo =(props) =>(
    <div className={Classes.Logo}>

    <img src ={burgerImage} alt="MYBurger" />

    
    </div>

);

export default logo;