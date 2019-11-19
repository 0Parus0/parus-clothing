import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';

import { googleSignInStart, emailSignInStart } from '../../redux/user/UserAction';

import { 
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
 } from './SignIn.styles';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {

  const [userCredentials, setCredentials ] = useState({ email: '', password: ''});

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = userCredentials;

    emailSignInStart(email, password);
   
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials(() => ({
      ...userCredentials,
      [name]: value
    }))
  }

  
  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email" 
          type="email" 
          value={email} 
          handleChange={handleChange}
          label="email"
          required />
        <FormInput 
          name="password" 
          type="password" 
          value={password} 
          handleChange={handleChange}
          label="password"
          required />
        <ButtonsBarContainer>
          <CustomButton type="submit"> Sign In</CustomButton> 
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
            Sign in with Google
          </CustomButton> 
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  )
}


const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart:(email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);