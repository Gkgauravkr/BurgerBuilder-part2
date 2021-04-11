import React ,{Component}from  'react';
import Aux from '../../hoc/Auxy/Auxy';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';



class layout extends Component{
    state={
        showSidedrawer : false
    }

        sideDrawerClosedHandler = () =>{

            this.setState ({showSidedrawer:false});
        }
        sideDrawerToggleHandler = () =>{

            this.setState ((prevState) => {
                return {showSidedrawer : !prevState.showSidedrawer}});
        }

    render (){
        return(

            <Aux>
            <Toolbar darwerToggleClicked = {this.sideDrawerToggleHandler}/>
            <SideDrawer show = {this.state.showSidedrawer} closed ={this.sideDrawerClosedHandler}
            />
             <main className ={Classes.Content}>
                 {this.props.children}
             </main>
             </Aux>
        )
        }
    }
        
    

export default layout;