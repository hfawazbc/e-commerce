import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/app.css';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Cart from './components/Cart';
import Error from './components/Error';
import PaymentSuccessful from './components/PaymentSuccessful';
import PaymentCancelled from './components/PaymentCancelled';

import Post from './components/Post';

export default function App() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const [guestCart, setGuestCart] = useState(cart);
  const [userCart, setUserCart] = useState([]);

  return (
    <div>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/sign-in" component={SignIn}/>
          <Route exact path="/post" component={Post}/>
          <Route exact path="/" render={(props) => <Home {...props} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>}/>
          <Route exact path="/cart" render={(props) => <Cart {...props} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>}/>
          <Route exact path="/success" component={PaymentSuccessful}/>
          <Route exact path="/cancel" component={PaymentCancelled}/>
          <Route path="*" component={Error}/>
        </Switch>
    </div>
  );
}