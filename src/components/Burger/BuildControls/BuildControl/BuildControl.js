import React from 'react';
import Classes from './BuildControl.css';
const buildControl =(props ) =>(
    <div className={Classes.BuildControl} >
        <div className={Classes.Label}>
            {props.label}
        </div>
        <button className={Classes.Less} onClick ={props.removed}
        disabled ={props.disable}>LESS</button>
        <button  className ={Classes.More} onClick ={props.add}>MORE</button>
    </div>

);

export default buildControl;