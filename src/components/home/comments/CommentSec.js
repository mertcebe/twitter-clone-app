import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled as styledForStyles } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import profileImg from '../../../images/twitterProfileImg.png';
import { useDispatch } from 'react-redux';
import { toggleCommentSec } from '../../../reducers/commentReducers/CommentActions';
import database, { auth } from '../../../firebase/firebaseConfig';
import MoodIcon from '@mui/icons-material/Mood';
import ImageIcon from '@mui/icons-material/Image';
import styled from '@emotion/styled';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router';
import TweetCommentsPage from './TweetCommentsPage';
import { sendNotification } from '../../rightbar/RightBar';

const BootstrapDialog = styledForStyles(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

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

const CommentSec = ({ owner }) => {
    let [text, setText] = useState();

    let navigate = useNavigate();

    useEffect(() => {
        console.log(owner)
    }, [])
    const [open, setOpen] = useState(true);
    let dispatch = useDispatch();

    const handleClose = () => {
        toggleCommentSec(dispatch, false, null);
    };

    const randomEmoji = () => {
        const emojiesList = ['&#x1F600;', '&#x1F601;', '&#x1F602;', '&#x1F603;', '&#x1F604;', '&#x1F605;', '&#x1F606;', '&#x1F606;', '&#x1F607;', '&#x1F608;', '&#x1F609;', '&#x1F60A;', '&#x1F60B;', '&#x1F60C;', '&#x1F60D;', '&#x1F60E;', '&#x1F60F;', '&#x1F610;', '&#x1F611;', '&#x1F612;', '&#x1F613;', '&#x1F614;'];
        let randomNumber = Math.floor(Math.random() * (21));
        setText(text + emojiesList[randomNumber]);
        // '/\p{&#x1F600;}+/gu'
    }

    const replyTweetFunc = () => {
        const { displayName, uid, email } = auth.currentUser;
        let comment = {
            sender: {
                displayName: displayName,
                email: email,
                uid: uid
            },
            commentText: text,
            dateSended: new Date().getTime()
        }
        addDoc(collection(database, `allTweets/${owner.id}/comments`), {
            ...comment
        })
            .then((snapshot) => {
                setDoc(doc(database, `users/${owner.uid}/tweets/${owner.id}/comments/${snapshot.id}`), {
                    ...comment
                })
            })
            .then((snapshot) => {
                navigate(`/home/posts/${owner.id}`);
                toggleCommentSec(dispatch, false, owner);
            })
            .then(async () => {
                const myAccount = {
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    uid: auth.currentUser.uid,
                    photoURL: auth.currentUser.photoURL
                };
                const data = {
                    ...(await getDoc(doc(database, `allTweets/${owner.id}`))).data(),
                    id: owner.id
                };
                sendNotification(`${auth.currentUser.displayName} commented on your tweet! '${text}'`, 'comment', owner.uid, myAccount, data)
            })
    }

    return (
        <div style={{ position: "fixed" }}>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <div style={{ width: "500px", padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "10px" }}>
                            <img src={owner.profileImg ? owner.profileImg.src : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", position: "relative", zIndex: 100 }} />
                        </div>
                        <small style={{ marginRight: "6px" }}><b>{owner.name}</b></small>
                        <small>@{owner.email}</small>
                    </div>
                    <div style={{ position: "relative" }}>
                        <span style={{ position: 'absolute', top: "-20px", left: "20px", width: "2px", height: "80px", background: "#dfdfdf", zIndex: 1 }}></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", marginTop: "30px" }}>
                        <div style={{ marginRight: "10px" }}>
                            <img src={auth.currentUser.photoURL ? auth.currentUser.photoURL : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", position: "relative", zIndex: 100 }} />
                        </div>
                        <div>
                            <textarea cols='52' value={text} onChange={(e) => {
                                setText(e.target.value);
                            }} style={{ maxHeight: "80px", height: "80px", outline: "none", resize: "none", border: "none", borderBottom: "1px solid #dfdfdf" }} placeholder="Tweet your reply"></textarea>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <IconButton onClick={randomEmoji}>
                                        <MoodIcon />
                                    </IconButton>
                                </div>
                                <MyColoredButton disabled={text ? false : true} style={{ background: text ? '' : 'grey' }} onClick={replyTweetFunc}>Reply</MyColoredButton>
                            </div>
                        </div>
                    </div>
                </div>
            </BootstrapDialog>
        </div>
    );
}

export default CommentSec