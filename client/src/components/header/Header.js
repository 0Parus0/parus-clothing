import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';
import { selectCartHidden } from '../../redux/cart/CartSelectors';
import { selectCurrentUser } from '../../redux/user/UserSelector';
import { signOutStart } from '../../redux/user/UserAction';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer, OptionDiv} from './Header.styles'


const Header = ({ currentUser, hidden, signOutStart }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink  to="/shop">
          SHOP
        </OptionLink>
        <OptionLink  to="/contact">
          CONTACT
        </OptionLink>
        {
          currentUser ?
          (
            <OptionDiv  onClick={signOutStart} >SIGN OUT</OptionDiv>
          )  
          : 
          (
            <OptionLink to="/signin">SIGN IN</OptionLink>
          )
        }
        <CartIcon />
      </OptionsContainer>
      {
        hidden ? null :
        <CartDropdown />
      }
    </HeaderContainer>
  )
};

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);