import React, { useState } from 'react'
import { signInWithRedirect, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig';
import { TextField, Box, Button, IconButton } from '@mui/material';
import { setUserToFirebase } from '../firebase/firebaseActions';
import { toast } from 'react-toastify';
import twitterNewLogo from '../images/twitterNewLogo.png';
import styled from '@emotion/styled';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import SignUpContainer from './SignUpContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRegister, toggleSignIn } from '../reducers/signInReducers/SignInActions';
import SignInContainer from './SignInContainer';

const MyLightButton = styled.button`
  width: 300px;
  padding: 8px 0;
  background: transparent;
  border-radius: 30px;
  color: #000;
  font-size: 16px;
  border: 1px solid #dfdfdf;
  margin: 10px 0;
  transition: all 0.2s ease;
  &:hover{
    background: #efefef;
  };
`;

const MyColoredButton = styled.button`
  width: 300px;
  padding: 8px 0;
  background: #1d9bf0;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  border: none;
  margin: 10px 0;
  transition: all 0.2s ease;
  &:hover{
    filter: brightness(0.9);
  }
`;


const SignInPage = () => {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [name, setName] = useState();

  let [isOpenRegister, isOpenSignIn] = useSelector((state) => {
    return [state.signInReducer.isOpenRegister, state.signInReducer.isOpenSignIn];
  })
  let dispatch = useDispatch();

  const toggleRegisterFunc = () => {
    toggleRegister(dispatch, !isOpenRegister);
  }

  const toggleSignInFunc = () => {
    toggleSignIn(dispatch, !isOpenSignIn);
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        toast.dark('Welcome!');
      })
  }

  return (
    <>
      {
        isOpenRegister ?
          <SignUpContainer />
          :
          <></>
      }
      {
        isOpenSignIn ?
          <SignInContainer />
          :
          <></>
      }
      <div className='signInPageContainer' style={{ display: "flex", alignItems: "center" }}>
        <div className='twitterLogoContainer' style={{ width: "50%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img className='twitterLogoImg' src={twitterNewLogo} alt="" style={{ width: "40%" }} />
        </div>
        <div className='contextContainer' style={{ width: "50%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
          <h1 style={{ fontSize: "60px", fontFamily: "sans-serif", maxWidth: "600px" }}><b>What's happening right now</b></h1>
          <h3 style={{ fontFamily: "sans-serif", marginTop: "40px", marginBottom: "20px" }}><b>Join now.</b></h3>
          <MyLightButton onClick={signInWithGoogle}><GoogleIcon sx={{ fontSize: "22px" }} /> Sign in with Google</MyLightButton>
          <MyLightButton><AppleIcon sx={{ fontSize: "26px" }} /> <b>Sign in with Apple</b></MyLightButton>
          <div style={{ width: "300px", textAlign: "center" }}>or</div>
          <MyColoredButton onClick={toggleRegisterFunc}>Create an account</MyColoredButton>
          <small style={{ display: "block", width: "300px", fontSize: "11px" }}>By signing up, you agree to the <Link to={'/terms'} style={{ textDecoration: "none", color: "#1d9bf0" }}>Terms of Service</Link> and <Link to={'/privacy-policy'} style={{ textDecoration: "none", color: "#1d9bf0" }}>Privacy Policy</Link>, including <Link to={'/cookie'} style={{ textDecoration: "none", color: "#1d9bf0" }}>Cookie Use</Link>.</small>
          <div style={{ marginTop: "60px" }}>
            <h5 className='m-0'>Already have an account?</h5>
            <MyLightButton onClick={toggleSignInFunc}>Log in</MyLightButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInPage