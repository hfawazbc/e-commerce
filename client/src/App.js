import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './styles/app.css';
import Register from './components/guest_components/Register';
import SignIn from './components/guest_components/SignIn';
import Post from './components/admin_components/Post';
import NavBarGuest from './components/guest_components/NavBarGuest';
import NavBarUser from './components/user_components/NavBarUser';
import NavBarAdmin from './components/admin_components/NavBarAdmin';
import ProductList from './components/general_components/ProductList';
import CartGuest from './components/guest_components/CartGuest';
import CartUser from './components/user_components/CartUser';
import PaymentSuccessfulGuest from './components/guest_components/PaymentSuccessfulGuest';
import PaymentSuccessfulUser from './components/user_components/PaymentSuccessfulUser';
import PaymentCancelled from './components/general_components/PaymentCancelled';
import PageNotFound from './components/general_components/PageNotFound';
import PageLoading from './components/general_components/PageLoading';

export default function App() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const [guestCart, setGuestCart] = useState(cart);
  const [userCart, setUserCart] = useState([]);

  const [user, setUser] = useState({});
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
      const abortController = new AbortController();
      
      const fetchUser = async () => {
          try {
              const response = await fetch('http://localhost:5000/users/user', {
                  method: 'GET',
                  credentials: 'include',
                  signal: abortController.signal
              });

              const data = await response.json();

              setUser(data);

              setIsAuthenticating(false);
          } catch (error) {
              if (!abortController.signal.aborted) {
                  console.log(error);
              }
          }
      }

      fetchUser();

      return () => {
          abortController.abort();
      }
  }, [])

  const renderNavBar = (props) => {
    if (!user.isAuth) {
      return (
        <NavBarGuest {...props} guestCart={guestCart}/>
      )
    } else if (user.isAuth && !user.isAdmin) {
      return (
        <NavBarUser {...props} setUser={setUser} userCart={userCart} setUserCart={setUserCart}/>
      )
    } else if (user.isAuth && user.isAdmin) {
      return (
        <NavBarAdmin {...props} setUser={setUser} userCart={userCart} setUserCart={setUserCart}/>
      )
    }
  }

  const renderCart = (props) => {
    if (!user.isAuth) {
      return (
        <CartGuest {...props} user={user} guestCart={guestCart} setGuestCart={setGuestCart} />
      )
    } else {
      return (
        <CartUser {...props} user={user} userCart={userCart} setUserCart={setUserCart}/>
      )
    }
  }

  if (isAuthenticating) {
    return (
      <PageLoading/>
    )
  } else {
    return (
      <div>
          <Switch>
            <Route exact path="/register" render={props => 
              user.isAuth ? <Redirect to="/"/> : <Register/>
            }/>
  
            <Route exact path="/sign-in" render={props => 
              user.isAuth ? <Redirect to="/"/> : <SignIn {...props} setUser={setUser} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
            }/>
  
            <Route exact path="/post" render={props => 
              user.isAdmin ? <Post/> : <Redirect to="/"/>
            }/>
  
            <Route exact path="/" render={props =>
              <div>
                {renderNavBar(props)}
                <ProductList {...props} user={user} setUserCart={setUserCart} guestCart={guestCart} setGuestCart={setGuestCart}/>
              </div>
            }/>
  
            <Route exact path="/cart" render={(props) => 
              <div>
                {renderNavBar(props)}
                {renderCart(props)}
              </div>
            }/>

            <Route exact path="/payment-successful" render={props => 
                user.isAuth ? <PaymentSuccessfulUser setUserCart={setUserCart}/> : <PaymentSuccessfulGuest setGuestCart={setGuestCart}/>
            }/>
  
            <Route exact path="/payment-cancelled" component={PaymentCancelled}/>
            
            <Route path="*" component={PageNotFound}/>
          </Switch>
      </div>
    )
  }
}