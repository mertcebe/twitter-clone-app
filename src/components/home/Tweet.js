import React, { Children } from 'react'
import profileImg from '../../images/twitterProfileImg.png';
import { NavLink } from 'react-router-dom';
import style from './style.module.css';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from '@emotion/styled';

const ActionButton = styled.button`
  border-radius: 30px;
  color: #7e7e7e;
  background: transparent;
  padding: 5px 10px;
  font-size: 15px;
  border: none;
  margin: 10px 0;
  transition: all 0.2s ease;
  &:hover{
    color: ${props => props.color ? props.color : "grey"};
  };
  &:hover > #${'myIcon'}{
    background: ${props => props.back ? props.back : ""};
    color: ${props => props.color ? props.color : "grey"};
  };
`;

const MyIcon = styled.button`
  width: 34px;
  height: 34px;
  color: #7e7e7e;
  background: transparent;
  border: none;
  border-radius: 50%;
  font-size: 17px;
  transition: all 0.2s ease;
  margin-right: 5px;
`;

const MyActionButton = ({ icon, text, type }) => {
    return (
        <ActionButton onClick={() => {
            console.log(type);
        }} color={type === 'comment' ? '#2bafdc' : type === 'retweet'?'green':type === 'like'?'red':'#2bafdc'} back={type === 'comment' ? '#dcf6ff' : type === 'retweet'?'#dfffdf':type === 'like'?'#ffc5c5':'#dcf6ff'}>
            <MyIcon id='myIcon'>{icon}</MyIcon>
            {
                type === 'istatistics' || type === 'share'?
                <></>
                :
                <small>{text}</small>
            }
        </ActionButton>
    )
}

const Tweet = ({ tweet }) => {
    const { text, img, dateAdded, owner } = tweet;
    return (
        <div className={`d-flex align-items-start ${style.tweetContainer}`}>
            <div style={{ marginRight: "10px" }}>
                <img src={owner.photoURL ? owner.photoURL : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "5px" }} />
            </div>
            <div>
                <div>
                    <NavLink to={`/profile/${owner.uid}`} className={style.tweetOwnerName}><b>{owner.name}</b></NavLink>
                    <NavLink to={`/profile/${owner.uid}`} className={style.tweetOwnerEmail}>@{owner.email}</NavLink>
                    <span style={{ position: "relative" }}><i className="fa-solid fa-circle" style={{ fontSize: "3px", position: "absolute", top: "55%", left: "-5px", color: "grey" }}></i></span>
                    <span>{new Date(dateAdded).toLocaleDateString()}</span>
                </div>
                <p className='m-0'>{text}</p>
                <IconButton style={{ position: "absolute", top: "5px", right: "10px" }}>
                    <MoreHorizIcon />
                </IconButton>
                {
                    img ?
                        <img src={img.src} alt="" style={{ width: "100%", margin: "10px 0", borderRadius: "10px" }} />
                        :
                        <></>
                }
                {/* comment retweet like istatistics share */}
                <div className='d-flex justify-content-between align-items-center'>
                    <MyActionButton type={'comment'} icon={<i className="fa-regular fa-comment"></i>} text={5.283} />
                    <MyActionButton type={'retweet'} icon={<i className="fa-solid fa-retweet"></i>} text={'36,7B'} />
                    <MyActionButton type={'like'} icon={<i className="fa-regular fa-heart"></i>} text={'275,8B'} />
                    <MyActionButton type={'istatistics'} icon={<i className="fa-regular fa-comment"></i>} />
                    <MyActionButton type={'share'} icon={<i className="fa-solid fa-arrow-up-from-bracket"></i>} />
                </div>
            </div>
        </div>
    )
}

export default Tweet