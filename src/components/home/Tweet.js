import React, { Children, useEffect, useState } from 'react'
import profileImg from '../../images/twitterProfileImg.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from '@emotion/styled';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import database, { auth } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCommentSec } from '../../reducers/commentReducers/CommentActions';
import { refreshTweets } from '../../reducers/tweetsReducers/TweetActions';
import { sendNotification } from '../rightbar/RightBar';
import { getProfile } from '../profile/ProfileActions';
import Skeleton from './skeleton';

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

const MyActionButton = ({ icon, text, type, owner, tweet }) => {
    let [checked, setChecked] = useState(false);
    let [disabled, setDisabled] = useState(false);
    let refreshTweet = useSelector((state) => {
        return state.tweetsReducer.refreshTweet;
    })
    let dispatch = useDispatch();

    useEffect(() => {
        getDoc(doc(database, `users/${auth.currentUser.uid}/myLikes/${owner.id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setChecked(true);
                }
            })
    }, []);

    const likeFunc = async (owner) => {
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 1400);
        setChecked(!checked);
        await getDoc(doc(database, `users/${owner.uid}/tweets/${owner.id}`))
            .then(async (snapshot) => {
                let allLikes = snapshot.data().likes ? snapshot.data().likes : 0;
                await updateDoc(doc(database, `users/${owner.uid}/tweets/${owner.id}`), {
                    likes: !checked ? allLikes + 1 : allLikes - 1
                })
                    .then(async () => {
                        await updateDoc(doc(database, `allTweets/${owner.id}`), {
                            likes: !checked ? allLikes + 1 : allLikes - 1
                        })
                    })
                    .then(async () => {
                        if (checked) {
                            await deleteDoc(doc(database, `users/${auth.currentUser.uid}/myLikes/${owner.id}`))
                        }
                        else {
                            await setDoc(doc(database, `users/${auth.currentUser.uid}/myLikes/${owner.id}`), {
                                ...snapshot.data(),
                                likes: !checked ? allLikes + 1 : allLikes - 1
                            })
                        }
                    })
            })
            .then(() => {
                const myAccount = {
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    uid: auth.currentUser.uid,
                    photoURL: auth.currentUser.photoURL
                };
                if (!checked) {
                    sendNotification(`${auth.currentUser.displayName} liked your tweet!`, 'like', owner.uid, myAccount, tweet)
                }
            })
    }

    return (
        <ActionButton disabled={type === 'like' && disabled} style={{ color: type === 'like' && checked && 'red' }} onClick={() => {
            if (type === 'comment') {
                toggleCommentSec(dispatch, true, owner);
                setTimeout(() => {
                    refreshTweets(dispatch, !refreshTweet);
                }, 3000);
            }
            if (type === 'like') {
                likeFunc(owner);
            }
        }} color={type === 'comment' ? '#2bafdc' : type === 'retweet' ? 'green' : type === 'like' ? 'red' : '#2bafdc'} back={type === 'comment' ? '#dcf6ff' : type === 'retweet' ? '#dfffdf' : type === 'like' ? '#ffc5c5' : '#dcf6ff'}>
            <MyIcon id='myIcon' style={{ color: type === 'like' && checked && 'red' }}>{icon}</MyIcon>
            {
                type === 'istatistics' || type === 'share' ? <></> : <small>{text}</small>
            }
            {
                type === 'like' && <input type="checkbox" id='chForTweetLike' checked={checked} onChange={(e) => { console.log(e.target.checked) }} style={{ display: "none" }} />
            }
        </ActionButton>
    )
}

const Tweet = ({ tweet, onlyShown = false }) => {
    const { text, img, dateAdded, owner: prevOwner, id } = tweet;

    let [commentCount, setCommentCount] = useState('');
    let [likesCount, setLikesCount] = useState('');
    let [textSize, setTextSize] = useState(200);
    let [owner, setOwner] = useState();

    let navigate = useNavigate();

    useEffect(() => {
        getProfile(prevOwner.uid)
            .then((snapshot) => {
                setOwner(snapshot);
            })
        getDocs(collection(database, `allTweets/${tweet.id}/comments`))
            .then((snapshot) => {
                setCommentCount(snapshot.size);
            })
        getDoc(doc(database, `allTweets/${tweet.id}`))
            .then((snapshot) => {
                setLikesCount(snapshot.data().likes);
            })
    }, []);

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

    if (!owner) {
        return (
            Array.from([1, 2, 3]).map((item) => {
                return (
                    <Skeleton hasImg={true} />
                )
            })
        )
    }
    return (
        <Link to={`/home/posts/${id}`} style={{ textDecoration: "none", color: "#000" }}>
            <div className={`d-flex align-items-start ${style.tweetContainer}`}>
                <div style={{ marginRight: "10px" }}>
                    <img src={owner.profileImg ? owner.profileImg.src : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "5px" }} />
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
                    <p className='m-0'>{onlyShown ? text : text.slice(0, textSize)}</p>
                    {
                        !onlyShown &&
                        <>
                            {
                                text.length > 200 &&
                                <>
                                    {
                                        text.length >= textSize &&
                                        <NavLink to={''} style={{ textDecoration: "none", color: "#000" }}>
                                            <button onClick={() => {
                                                setTextSize(textSize + 200);
                                            }} style={{ background: "transparent", border: "none", color: "grey", fontSize: "12px", display: "inline-block", padding: "0", margin: "0" }}>read more</button>
                                        </NavLink>
                                    }
                                </>
                            }
                        </>
                    }
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
                        <MyActionButton type={'comment'} tweet={tweet} owner={{ ...owner, id }} icon={<i className="fa-regular fa-comment"></i>} text={commentCount} />
                        <MyActionButton type={'retweet'} tweet={tweet} owner={{ ...owner, id }} icon={<i className="fa-solid fa-retweet"></i>} text={'36,7B'} />
                        <MyActionButton type={'like'} tweet={tweet} owner={{ ...owner, id }} icon={<i className="fa-regular fa-heart"></i>} text={likesCount} />
                        <MyActionButton type={'istatistics'} tweet={tweet} owner={{ ...owner, id }} icon={<i className="fa-solid fa-signal"></i>} />
                        <MyActionButton type={'share'} tweet={tweet} owner={{ ...owner, id }} icon={<i className="fa-solid fa-arrow-up-from-bracket"></i>} />
                    </NavLink>
                </div>
            </div>

        </Link>
    )
}

export default Tweet