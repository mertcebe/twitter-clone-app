import React, { useEffect, useReducer, useState } from 'react';
import Button from '@mui/material/Button';
import { styled as styledForStyles } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import profileImg from '../../images/twitterProfileImg.png';
import backImg from '../../images/noBackImg.jpg';
import { useDispatch } from 'react-redux';
import MoodIcon from '@mui/icons-material/Mood';
import ImageIcon from '@mui/icons-material/Image';
import styled from '@emotion/styled';
import { Navigate, useNavigate } from 'react-router';
import { toggleEditSec } from '../../reducers/profileReducers/ProfileActions';
import { setActiveMessagingUsers, toggleMessageSec } from '../../reducers/messageReducers/MessageActions';
import { TextField, Tooltip } from '@mui/material';
import { addDoc, collection, doc, getDocs, limit, query, setDoc, where } from 'firebase/firestore';
import database, { auth } from '../../firebase/firebaseConfig';
import twitterLoadingGif from '../../images/twitterLoadingGif.gif';
import verificationIcon from '../../images/twitterVerificationIcon.png';
import style from './style.module.css';
import { NavLink } from 'react-router-dom';
import { TagsInput } from "react-tag-input-component";

const BootstrapDialog = styledForStyles(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const MyButton = styled.button`
  width: 80px;
  padding: 4px 0;
  background: #000;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  border: none;
  margin: 10px 0;
  transition: all 0.2s ease;
  &:hover{
    opacity: 0.8;
  }
`;

const SendMessageContainer = ({ owner }) => {
    let [users, setUsers] = useState();
    let [searchText, setSearchText] = useState();
    let navigate = useNavigate();

    const getUsers = (searchText) => {
        getDocs(query(collection(database, `users`)))
            .then((snapshot) => {
                let users = [];
                snapshot.forEach((user) => {
                    if (user.data().name.toLowerCase().includes(searchText.toLowerCase())) {
                        users.push({
                            ...user.data()
                        });
                    }
                })
                setUsers(users);
            })
    }

    useEffect(() => {
        getDocs(query(collection(database, `users`), limit(4)))
            .then((snapshot) => {
                let users = [];
                snapshot.forEach((user) => {
                    users.push({
                        ...user.data()
                    });
                })
                setUsers(users);
            })
    }, []);

    const [open, setOpen] = useState(true);
    let dispatch = useDispatch();

    const handleClose = () => {
        toggleMessageSec(dispatch, false, null);
    };

    // tags section

    const [selected, setSelected] = useState([]);

    const nextFunc = () => {
        setActiveMessagingUsers(dispatch, selected);
        toggleMessageSec(dispatch, false, null);
    }

    if (!users) {
        return (
            <div style={{ position: "fixed" }}>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div style={{ width: "440px" }}>
                        <img src={twitterLoadingGif} alt="" style={{ width: "100%", pointerEvents: "none" }} />
                    </div>
                </BootstrapDialog>
            </div>
        )
    }
    return (
        <div style={{ position: "fixed" }}>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "440px", padding: "0 10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon sx={{ fontSize: "18px" }} />
                        </IconButton>

                        <div className={''}>
                            <h5 className='d-inline-block mt-1' style={{ width: "100%", height: "40px", lineHeight: "40px", fontSize: "17px" }}><b className='d-block'>New message</b></h5>
                        </div>
                    </div>
                    <MyButton disabled={selected.length !== 0 ? false : true} style={{ background: selected.length !== 0 ? '#000' : 'grey' }} onClick={nextFunc}>
                        Next
                    </MyButton>
                </div>

                <div style={{ width: "440px" }}>
                    <div style={{ display: "flex", alignItems: "center", padding: "0 10px", margin: "0 0 10px 0" }}>
                        <span style={{ marginRight: "8px" }}><i className="fa-solid fa-magnifying-glass" style={{ color: "#1d9bf0", fontSize: "15px" }}></i></span>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (searchText) {
                                getUsers(searchText);
                            }
                        }}>
                            <input type="text" style={{ width: "100%", border: "none", outline: "none" }} placeholder='Search people' onChange={(e) => {
                                setSearchText(e.target.value);
                            }} />
                        </form>
                    </div>

                    <div>
                        <TagsInput
                            disableBackspaceRemove
                            value={selected.map((user) => user.name)}
                            onChange={(e) => {
                                let tags = [];
                                selected.forEach((user) => {
                                    if (e.includes(user.name)) {
                                        tags.push({ ...user });
                                    }
                                })
                                setSelected(tags)
                            }}
                            name="tags"
                        />
                    </div>

                    <div>
                        {
                            users.length === 0 ?
                                <div style={{ textAlign: "center", padding: "10px" }}>
                                    <small className='text-muted'>No users found!</small>
                                </div>
                                :
                                <>
                                    {
                                        users.map((user) => {
                                            return (
                                                <div className={style.searchUserContainer} onClick={() => {
                                                    if (!selected.map((user) => user.name).includes(user.name)) {
                                                        setSelected([...selected, { ...user }]);
                                                    }
                                                }}>
                                                    <img src={user.profileImg ? user.profileImg.src : profileImg} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "5px", pointerEvents: "none" }} />
                                                    <div>
                                                        <small style={{ display: "block", fontSize: "12px" }}><NavLink to={`/profile/${user.uid}`} onClick={handleClose} style={{ textDecoration: "none", color: "#000" }}><b>{user.name}</b></NavLink> {user.personalize ? <Tooltip title='Verified account'><img src={verificationIcon} alt="" style={{ width: "12px", height: "12px", cursor: "pointer" }} /></Tooltip> : <></>}</small>
                                                        <small style={{ display: "block", fontSize: "10px", color: "grey" }}><b>{user.email}</b></small>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                        }
                    </div>
                </div>
            </BootstrapDialog>
        </div>
    );
}

export default SendMessageContainer