import React, { useState } from 'react'
import twitterNewLogo from '../images/twitterNewLogo.png';
import HomeIcon from '@mui/icons-material/Home'
import TagIcon from '@mui/icons-material/Tag'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MessageIcon from '@mui/icons-material/MailOutline'
import BookMarksIcon from '@mui/icons-material/BookmarkBorder'
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { Menu, MenuItem } from '@mui/material';
import { signOut } from 'firebase/auth';

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

const SideBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='sidebar' style={{ width: "20%", padding: "10px", position: "sticky", top: "0" }}>
      <NavLink to={'/home'} style={{ textDecoration: "none" }}><img src={twitterNewLogo} alt="" style={{ width: "30px", pointerEvents: "none" }} /></NavLink>
      <ul className='sidebarUl' style={{ listStyle: "none", margin: "0", padding: "0", marginTop: "40px" }}>
        <NavLink className='sidebarMenuItem' to={'/home'} style={{ padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center" }}><HomeIcon sx={{ marginRight: "10px", width: "30px" }} />Home</NavLink>
        <NavLink className='sidebarMenuItem' to={'/search'} style={{ padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center" }}><TagIcon sx={{ marginRight: "10px", width: "30px" }} />Explore</NavLink>
        <NavLink className='sidebarMenuItem' to={'/notifications'} style={{ padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center" }}><NotificationsIcon sx={{ marginRight: "10px", width: "30px" }} />Notifications</NavLink>
        <NavLink className='sidebarMenuItem' to={'/messages'} style={{ padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center" }}><MessageIcon sx={{ marginRight: "10px", width: "30px" }} />Messages</NavLink>
        <NavLink className='sidebarMenuItem' to={'/bookmarks'} style={{ padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center" }}><BookMarksIcon sx={{ marginRight: "10px", width: "30px" }} />Bookmarks</NavLink>
        <NavLink className='sidebarMenuItem' to={'/lists'} style={{ padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center" }}><ListAltIcon sx={{ marginRight: "10px", width: "30px" }} />Lists</NavLink>
        <NavLink className='sidebarMenuItem' to={`/profile/${auth.currentUser.uid}`} style={{ padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center" }}><PersonIcon sx={{ marginRight: "10px", width: "30px" }} />Profile</NavLink>
        <button
          className='sidebarMenuItem'
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{ width: "100%", background: "transparent", border: "none", padding: "5px 0px", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center" }}
        >
          <MoreHorizIcon sx={{ marginRight: "10px", width: "30px" }} />More
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem sx={{ minWidth: "200px", display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => {
            handleClose();
            signOut(auth);
          }}><span>Sign out</span><i className="fa-solid fa-right-from-bracket"></i></MenuItem>
          <MenuItem sx={{ minWidth: "200px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span>Settings</span><i className="fa-solid fa-gear"></i></MenuItem>
        </Menu>
      </ul>
      <MyColoredButton className='tweetBtn'>Tweet</MyColoredButton>
    </div>
  )
}

export default SideBar