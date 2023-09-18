import React from 'react'
import { auth } from '../firebase/firebaseConfig'
import profileImg from '../images/twitterProfileImg.png';
import ImageIcon from '@mui/icons-material/Image';
import { IconButton } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import styled from '@emotion/styled';

const MyColoredButton = styled.button`
  width: 100px;
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

const Home = () => {
  return (
    <div style={{ width: "60%", marginRight: "100px", border: "1px solid #dfdfdf" }}>
      <div style={{ border: "1px solid #dfdfdf", height: "40px", lineHeight: "40px", padding: "0 10px" }}>
        <h5 className='d-inline-block'><b>Home</b></h5>
      </div>
      <div style={{ padding: "10px", display: "flex", alignItems: "flex-start", width: "100%" }}>
        <div style={{ marginRight: "10px" }}>
          <img src={auth.currentUser.photoURL ? auth.currentUser.photoURL : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", pointerEvents: "none" }} />
        </div>
        <div>
          <textarea cols='50' style={{ maxHeight: "80px", height: "80px", outline: "none", resize: "none", border: "none", borderBottom: "1px solid #dfdfdf" }} placeholder="What's happening?"></textarea>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <IconButton>
                <ImageIcon />
              </IconButton>
              <IconButton>
                <MoodIcon />
              </IconButton>
            </div>
            <MyColoredButton>Tweet</MyColoredButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home