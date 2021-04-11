import React from  'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxy/Auxy';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer =(props) =>{

    let attachedClasses = [Classes.SideDrawer, Classes.Close];
    if (props.show) {
        attachedClasses = [Classes.SideDrawer, Classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.show} closed={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={Classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;