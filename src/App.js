import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import CheckoutPage from './pages/checkout/CheckoutPage';

import Header from './components/header/Header';

import { selectCurrentUser } from './redux/user/UserSelector';
import { checkUserSession } from './redux/user/UserAction';


class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact 
            path="/signin" 
            render={()=> 
              this.props.currentUser ? (
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
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
})


const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
