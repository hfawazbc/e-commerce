import React, { useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/app.css';
import Register from './components/Register';
import SignIn from './components/SignIn';
import NavBar from './components/NavBar';
import ItemList from './components/ItemList';
import Cart from './components/Cart';
import Post from './components/Post';
import PageNotFound from './components/PageNotFound';
import PageLoading from './components/PageLoading';
import PaymentSuccessful from './components/PaymentSuccessful';
import PaymentCancelled from './components/PaymentCancelled';
import { UserContext } from './contexts/UserContext';
import { AdminContext } from './contexts/AdminContext';

export default function App() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const [guestCart, setGuestCart] = useState(cart);
  const [userCart, setUserCart] = useState([]);

  const { isUser, setIsUser, isAuthenticatingUser } = useContext(UserContext);
  const { isAdmin, isAuthenticatingAdmin } = useContext(AdminContext);

  if (isAuthenticatingUser && isAuthenticatingAdmin) {
    return (
      <div>
        <PageLoading/>
      </div>
    )
  } else {
    return (
      <div>
          <Switch>
            <Route exact path="/register" render={(props) => <Register {...props} isUser={isUser}/>}/>
  
            <Route exact path="/sign-in" render={(props) => <SignIn {...props} isUser={isUser} setIsUser={setIsUser} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>}/>
  
            <Route exact path="/post" render={(props) => <Post {...props} isAdmin={isAdmin}/>}/>
  
            <Route exact path="/" render={(props) =>
              <div>
                <NavBar isUser={isUser} setIsUser={setIsUser} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart}/>
                <ItemList {...props} isUser={isUser} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
              </div>
            }/>
  
            <Route exact path="/cart" render={(props) => 
              <div>
                <NavBar isUser={isUser} setIsUser={setIsUser} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart}/>
                <Cart {...props} isUser={isUser} userCart={userCart} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
              </div>
            }/>

            <Route exact path="/payment-successful" render={(props) => 
              <div>
                <PaymentSuccessful isUser={isUser} setUserCart={setUserCart} setGuestCart={setGuestCart}/>
              </div>
            }/>
  
            <Route exact path="/payment-cancelled" component={PaymentCancelled}/>
            
            <Route path="*" component={PageNotFound}/>
          </Switch>
      </div>
    )
  }
}