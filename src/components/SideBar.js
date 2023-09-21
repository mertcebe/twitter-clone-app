import React from 'react'
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
  return (
    <div className='shadow sidebar' style={{width: "25%", padding: "10px", marginRight: "50px"}}>
        <NavLink to={'/home'} style={{textDecoration: "none"}}><img src={twitterNewLogo} alt="" style={{width: "30px", pointerEvents: "none"}} /></NavLink>
        <ul className='sidebarUl' style={{listStyle: "none", margin: "0", padding: "0", marginTop: "40px"}}>
            <NavLink className='sidebarMenuItem' to={'/home'} style={{padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center"}}><HomeIcon sx={{marginRight: "10px", width: "30px"}} />Home</NavLink>
            <NavLink className='sidebarMenuItem' to={'/explore'} style={{padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center"}}><TagIcon sx={{marginRight: "10px", width: "30px"}} />Explore</NavLink>
            <NavLink className='sidebarMenuItem' to={'/notifications'} style={{padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center"}}><NotificationsIcon sx={{marginRight: "10px", width: "30px"}} />Notifications</NavLink>
            <NavLink className='sidebarMenuItem' to={'/messages'} style={{padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center"}}><MessageIcon sx={{marginRight: "10px", width: "30px"}} />Messages</NavLink>
            <NavLink className='sidebarMenuItem' to={'/bookmarks'} style={{padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center"}}><BookMarksIcon sx={{marginRight: "10px", width: "30px"}} />Bookmarks</NavLink>
            <NavLink className='sidebarMenuItem' to={'/lists'} style={{padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center"}}><ListAltIcon sx={{marginRight: "10px", width: "30px"}} />Lists</NavLink>
            <NavLink className='sidebarMenuItem' to={'/profile'} style={{padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center"}}><PersonIcon sx={{marginRight: "10px", width: "30px"}} />Profile</NavLink>
            <NavLink className='sidebarMenuItem' to={'/more'} style={{padding: "5px 0px", textDecoration: "none", color: "#454545", fontSize: "18px", margin: "10px 0", display: "flex", alignItems: "center"}}><MoreHorizIcon sx={{marginRight: "10px", width: "30px"}} />More</NavLink>
        </ul>
        <MyColoredButton>Tweet</MyColoredButton>
    </div>
  )
}

export default SideBar