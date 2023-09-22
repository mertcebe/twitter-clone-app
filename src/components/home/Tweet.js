import React, { Children, useState } from 'react'
import profileImg from '../../images/twitterProfileImg.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from '@emotion/styled';
import { deleteDoc, doc } from 'firebase/firestore';
import database, { auth } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCommentSec } from '../../reducers/commentReducers/CommentActions';

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

const MyActionButton = ({ icon, text, type, owner }) => {
    let dispatch = useDispatch();
    return (
        <ActionButton onClick={() => {
            if (type === 'comment') {
                toggleCommentSec(dispatch, true, owner);
            }
        }} color={type === 'comment' ? '#2bafdc' : type === 'retweet' ? 'green' : type === 'like' ? 'red' : '#2bafdc'} back={type === 'comment' ? '#dcf6ff' : type === 'retweet' ? '#dfffdf' : type === 'like' ? '#ffc5c5' : '#dcf6ff'}>
            <MyIcon id='myIcon'>{icon}</MyIcon>
            {
                type === 'istatistics' || type === 'share' ?
                    <></>
                    :
                    <small>{text}</small>
            }
        </ActionButton>
    )
}

const Tweet = ({ tweet, onlyShown = false }) => {
    const { text, img, dateAdded, owner, id } = tweet;

    let navigate = useNavigate();

    // options
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteTweetFunc = () => {
        handleClose();
        deleteDoc(doc(database, `allTweets/${id}`))
            .then(() => {
                deleteDoc(doc(database, `users/${auth.currentUser.uid}/tweets/${id}`))
                    .then(() => {
                        toast.dark('This tweet has been deleted!');
                    })
            })
    }

    return (
        <Link to={`/home/posts/${id}`} style={{ textDecoration: "none", color: "#000" }}>
            <div className={`d-flex align-items-start ${style.tweetContainer}`}>
                <div style={{ marginRight: "10px" }}>
                    <img src={owner.photoURL ? owner.photoURL : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "5px" }} />
                </div>
                <div>
                    <div>
                        <NavLink to={`/profile/${owner.uid}`} className={style.tweetOwnerName}><b>{owner.name}</b></NavLink>
                        <NavLink to={`/profile/${owner.uid}`} className={style.tweetOwnerEmail}>@{owner.email}</NavLink>

                        {
                            onlyShown ?
                                <></>
                                :
                                <>
                                    <span style={{ position: "relative" }}><i className="fa-solid fa-circle" style={{ fontSize: "3px", position: "absolute", top: "55%", left: "-5px", color: "grey" }}></i></span>
                                    <span>{new Date(dateAdded).toLocaleDateString()}</span>
                                </>
                        }
                    </div>
                    <p className='m-0'>{text}</p>
                    <IconButton
                        style={{ position: "absolute", top: "5px", right: "10px" }}
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    {/* <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: 48 * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            Report this tweet
                        </MenuItem>
                        {
                            auth.currentUser.uid === owner.uid ?
                                <MenuItem onClick={deleteTweetFunc}>
                                    Delete
                                </MenuItem>
                                :
                                <></>
                        }
                    </Menu> */}
                    {
                        img ?
                            <img src={img.src} alt="" style={{ width: "100%", margin: "10px 0", borderRadius: "10px" }} />
                            :
                            <></>
                    }
                    {
                        onlyShown && <small className='text-muted'>{new Date(dateAdded).toLocaleString()}</small>
                    }
                    {/* comment retweet like istatistics share */}
                    <NavLink to={''} className='d-flex justify-content-between align-items-center' style={{ textDecoration: "none" }}>
                        <MyActionButton type={'comment'} owner={{ ...owner, id }} icon={<i className="fa-regular fa-comment"></i>} text={'5.283'} />
                        <MyActionButton type={'retweet'} owner={{ ...owner, id }} icon={<i className="fa-solid fa-retweet"></i>} text={'36,7B'} />
                        <MyActionButton type={'like'} owner={{ ...owner, id }} icon={<i className="fa-regular fa-heart"></i>} text={'275,8B'} />
                        <MyActionButton type={'istatistics'} owner={{ ...owner, id }} icon={<i className="fa-solid fa-signal"></i>} />
                        <MyActionButton type={'share'} owner={{ ...owner, id }} icon={<i className="fa-solid fa-arrow-up-from-bracket"></i>} />
                    </NavLink>
                </div>
            </div>

        </Link>
    )
}

export default Tweet