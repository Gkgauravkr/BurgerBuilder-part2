import React from 'react';
import Classes from  './Backdrop.css';

const backDrop = (props) =>(
        props.show ? <div className={Classes.Backdrop} onClick={props.closed}></div> : null
);

export default backDrop;