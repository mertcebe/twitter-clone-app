import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import twitterNewLogo from '../../images/twitterNewLogo.png';
import styled from '@emotion/styled';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import SignUpContainer from './SignUpContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRegister, toggleSignIn } from '../../reducers/signInReducers/SignInActions';
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
      <div>
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
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: "0 14px" }}>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>About</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Help center</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Terms of Service</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Privacy Policy</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Cookie Policy</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Imprint</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Accessibility</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Advertising information</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Blog</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Situation</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Career</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Brand Resources</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Advert</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Marketing</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>X For Businesses</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Developers</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Index</Link>
            <Link to={'/settings'} style={{ textDecoration: "none", color: "grey", fontSize: "14px" }}>Settings</Link>
          </div>
          <div className="text-center my-2">
            <small className='text-secondary' style={{fontSize: "12px"}}>© 2023 X Corp.</small>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInPage