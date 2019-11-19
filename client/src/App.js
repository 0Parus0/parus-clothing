import React, { useEffect } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import Header from './components/header/Header';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/UserSelector';
import { checkUserSession } from './redux/user/UserAction';


const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route  path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact 
          path="/signin" 
          render={()=> 
            currentUser ? (
              <Redirect to="/" />
          ) : (
            <SignInAndSignUpPage />
              )
            } 
          />
      </Switch>
    </div>
  );
}


const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
})


const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
