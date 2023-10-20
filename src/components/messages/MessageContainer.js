import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import profileImg from '../../images/twitterProfileImg.png';
import Moment from 'react-moment';
import style from './style.module.css';

const MessageContainer = ({ message }) => {
  const searchParams = useSearchParams()[0].get('id');
  return (
    <NavLink className={style.messageContainer} to={searchParams === message.owner.uid ? `/messages` : `/messages?id=${message.owner.uid}`} style={{ display: "flex", alignItems: "start", textDecoration: "none", color: "#000", position: "relative", padding: "10px 6px", width: "100%" }}>
      <div style={{ marginRight: "6px" }}>
        <img src={message.owner.profileImg ? message.owner.profileImg.src : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <small style={{ marginRight: "4px", fontSize: "14px" }}><b>{message.owner.name}</b></small>
            <small style={{ fontSize: "11px", color: "grey" }}>@{message.owner.email.slice(0, 46 - (Number(message.owner.name.length) + 14))}{message.owner.email.length >= 46 - (Number(message.owner.name.length) + 14)&&'...'}</small>
          </div>
          <small id='dateSendedContainer' style={{ fontSize: "12px", color: "grey" }}><Moment fromNow>{message.lastMessage?.dateSended}</Moment></small>
        </div>
        <small className='d-block text-muted' style={{ fontSize: "12px" }}>{message.lastMessage?.messageText.slice(0, 40)}{message.lastMessage?.messageText.length >= 30 ? '..' : ''}</small>
      </div>
      {
        searchParams === message.owner.uid &&
        <div style={{ position: "absolute", top: "0", right: "0", width: "3px", height: "100%", background: "#1d9bf0", borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", boxShadow: "-3px 0px 5px lightblue" }}>
        </div>
      }
    </NavLink>
  )
}

export default MessageContainer