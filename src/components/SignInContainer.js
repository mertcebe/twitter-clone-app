import React, { useState } from 'react'
import { toggleSignIn } from '../reducers/signInReducers/SignInActions';
import { useDispatch } from 'react-redux';
import { Box, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import twitterNewLogo from '../images/twitterNewLogo.png';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';

const MyLightButton = styled.button`
  width: 100%;
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
  width: 100%;
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

const SignInContainer = () => {
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    let dispatch = useDispatch();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                toast.dark('Welcome!');
            })
    }

    const signInFunc = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            toast.dark(`${userCredentials.user.displayName}, welcome!`);
        })
        .catch((error) => {
            let errorMsg = error.code.split('/').join(' ').split('-').join(' ');
            toast.dark(errorMsg);
        })
        toggleSignIn(dispatch, false);
    }

    return (
        <div style={{ position: "fixed", top: "50%", left: "50%", backdropFilter: "brightness(0.6)", width: "100%", height: "100vh", transform: "translate(-50%, -50%)", zIndex: "100" }}>
            <div className='signUInMedia' style={{ position: "absolute", top: "50%", left: "50%", background: "#fff", transform: "translate(-50%, -50%)", width: "570px", height: "90vh", padding: "10px", borderRadius: "14px" }}>
                <div className="d-flex" style={{ alignItems: "flex-start" }}>
                    <div style={{ width: "10%" }}>
                        <IconButton onClick={() => {
                            toggleSignIn(dispatch, false);
                        }}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div style={{ width: "60%", textAlign: "center", margin: "10px 50px" }}>
                        <img src={twitterNewLogo} alt="" style={{ width: "30px" }} />
                        <div style={{ textAlign: "left", marginTop: "30px" }}>
                            <h3 className='my-4'><b>Login to X</b></h3>
                            <MyLightButton onClick={signInWithGoogle}><GoogleIcon sx={{ fontSize: "22px" }} /> Sign in with Google</MyLightButton>
                            <MyLightButton><AppleIcon sx={{ fontSize: "26px" }} /> <b>Sign in with Apple</b></MyLightButton>
                            <div style={{ width: "100%", textAlign: "center", marginTop: "10px" }}>or</div>
                            <Box sx={{ my: "20px" }}>
                                <TextField fullWidth id="outlined-basic" defaultValue={email} type='text' onChange={(e) => {
                                    setEmail(e.target.value);
                                }} label="Email" variant="outlined" sx={{ mb: "16px" }} />
                                <TextField fullWidth id="outlined-basic" defaultValue={password} type='password' onChange={(e) => {
                                    setPassword(e.target.value);
                                }} label="Password" variant="outlined" />
                            </Box>
                            <MyColoredButton onClick={signInFunc} disabled={email && password?false:true} style={{background: email && password?'#000':'grey'}}>Sign in</MyColoredButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInContainer