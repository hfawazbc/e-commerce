import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/app.css';

import PrivateRoute from './components/PrivateRoute';
import SessionRoute from './components/SessionRoute';

import Register from './components/Register';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

import Navigation from './components/Navigation';
import Cart from './components/Cart';
import PostItem from './components/PostItem';
import ItemList from './components/ItemList';

import Error from './components/Error';
import Success from './components/Success';
import Cancel from './components/Cancel';

export default function App() {
  const [clickedAdd, setClickedAdd] = useState(false);
  const [clickedRemove, setClickedRemove] = useState(false);
  const [clickedQuantity, setClickedQuantity] = useState(false);

  return (
    <div>
      <Switch >
          <PrivateRoute exact path="/post-item" component={ PostItem } />
          <PrivateRoute exact path="/sign-out" component={ SignOut } />

          <SessionRoute exact path="/register" component={ Register }/>
          <SessionRoute exact path="/sign-in" component={ SignIn }/>

          <Route exact path="/success" component={ Success } />
          <Route exact path="/cancel" component={ Cancel } />

          <Route exact path="/" render={props =>
            <div>
              <Navigation {...props} clickedAdd={clickedAdd} setClickedAdd={setClickedAdd}/>
              <ItemList {...props} setClickedAdd={setClickedAdd} />
            </div>
          } />

          <Route exact path="/cart" render={props => 
            <div>
              <Cart {...props} clickedRemove={clickedRemove} setClickedRemove={setClickedRemove} clickedQuantity={clickedQuantity} setClickedQuantity={setClickedQuantity} />
            </div>
          } />

          <Route path="*" component={ Error } />
      </Switch>
    </div>
  );
}