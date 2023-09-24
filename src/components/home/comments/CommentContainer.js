import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import profileImg from '../../../images/twitterProfileImg.png';
import style from './style.module.css';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import database, { auth } from '../../../firebase/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
import { refreshTweets } from '../../../reducers/tweetsReducers/TweetActions';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';

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
  width: 30px;
  height: 30px;
  color: #7e7e7e;
  background: transparent;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  transition: all 0.2s ease;
  margin-right: 5px;
`;

const MyActionButton = ({ icon, text, type, comment }) => {
    let refreshTweet = useSelector((state) => {
        return state.tweetsReducer.refreshTweet;
    })
    let dispatch = useDispatch();
    const { id } = useParams();
    return (
        <ActionButton onClick={() => {
            if (type === 'delete') {
                deleteDoc(doc(database, `users/${comment.owner.uid}/tweets/${id}/comments/${comment.id}`))
                    .then(() => {
                        deleteDoc(doc(database, `allTweets/${id}/comments/${comment.id}`))
                            .then(() => {
                                refreshTweets(dispatch, !refreshTweet);
                                toast.info('Comment has been deleted!');
                            })
                    })
            }
        }} color={type === 'delete' ? '#bdbd4a' : type === 'retweet' ? 'green' : type === 'like' ? 'red' : '#2bafdc'} back={type === 'delete' ? '#ffffa0' : type === 'retweet' ? '#dfffdf' : type === 'like' ? '#ffc5c5' : '#dcf6ff'}>
            <MyIcon id='myIcon'>{icon}</MyIcon>
            {
                type === 'istatistics' || type === 'delete' || type === 'share' ?
                    <></>
                    :
                    <small>{text}</small>
            }
        </ActionButton>
    )
}

const CommentContainer = ({ comment, owner }) => {
    const { commentText, dateSended, sender } = comment;
    return (
        <div style={{ marginBottom: "20px", borderTop: "1px solid #efefef", paddingTop: "10px" }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{ marginRight: "10px" }}>
                    <img src={sender.photoURL ? sender.photoURL : profileImg} alt="" style={{ width: "30px", height: "30px", borderRadius: "5px" }} />
                </div>
                <div className='w-100' style={{ position: "relative" }}>
                    <NavLink to={`/profile/${sender.uid}`} className={style.tweetOwnerName}><b>{sender.displayName}</b></NavLink>
                    <NavLink to={`/profile/${sender.uid}`} className={style.tweetOwnerEmail}>@{sender.email}</NavLink>
                    <span style={{ position: "relative" }}><i className="fa-solid fa-circle" style={{ fontSize: "3px", position: "absolute", top: "55%", left: "-5px", color: "grey" }}></i></span>
                    <span><small><Moment fromNow>{dateSended}</Moment></small></span>

                    <p className='m-0'>{commentText}</p>

                    {
                        owner.uid === sender.uid ? <Tooltip title='Owner of tweet'><span style={{ fontSize: "12px", display: "inline-block", color: "#3b81e3", position: "absolute", top: "5px", right: "25px", cursor: "pointer" }}><i className="fa-solid fa-anchor"></i></span></Tooltip> : <></>
                    }

                    <div className='d-flex justify-content-between align-items-center' style={{ textDecoration: "none" }}>
                        {
                            sender.uid === auth.currentUser.uid && <MyActionButton type={'delete'} comment={{ ...comment, owner }} icon={<i className="fa-solid fa-trash"></i>} />
                        }
                        <MyActionButton type={'retweet'} comment={{ ...comment }} icon={<i className="fa-solid fa-retweet"></i>} text={'36,7B'} />
                        <MyActionButton type={'like'} comment={{ ...comment }} icon={<i className="fa-regular fa-heart"></i>} text={'275,8B'} />
                        <MyActionButton type={'istatistics'} comment={{ ...comment }} icon={<i className="fa-solid fa-signal"></i>} />
                        <MyActionButton type={'share'} comment={{ ...comment }} icon={<i className="fa-solid fa-arrow-up-from-bracket"></i>} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentContainer