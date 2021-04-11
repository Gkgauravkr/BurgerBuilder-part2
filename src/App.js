import React, { Component } from 'react';

import Layout from  '../src/components/Layout/Layout';

import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';


class App extends Component {
  render() {
    return (
      <div >
        <Layout>
        
          <Switch>
          <Route path ="/Checkout"  component={Checkout}/>
          <Route path ="/orders"  component={Orders}/>
          <Route path ="/" exact component={BurgerBuilder}/>
          </Switch>
          
        {/**/}
        </Layout>
      </div>
    );
  }
}

export default App;
