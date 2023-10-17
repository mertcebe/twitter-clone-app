import { IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MessageIcon from '@mui/icons-material/Message';
import MessageContainer from './MessageContainer';
import style from './style.module.css';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import database, { auth } from '../../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMessagingUsers, toggleMessageSec } from '../../reducers/messageReducers/MessageActions';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import MessageShownContainer from './MessageShownContainer';

const MyButton = styled.button`
  padding: 6px 14px;
  background: #1d9bf0;
  border-radius: 30px;
  color: #fff;
  font-size: 14px;
  border: none;
  margin: 10px 0;
  transition: all 0.2s ease;
  &:hover{
    opacity: 0.8;
  }
`;

const MessagesPage = () => {
    let [messagingUsers, setMessagingUsers] = useState([]);
    const searchParams = useSearchParams()[0].get('id');

    const activeMessagingUsers = useSelector((state) => {
        return state.messageReducer.activeMessagingUsers;
    })

    const getUsers = async () => {
        return new Promise((resolve) => {
            getDocs(query(collection(database, `users`)))
                .then((snapshot) => {
                    let users = [];
                    snapshot.forEach((item) => {
                        users.push(item.data());
                    })
                    resolve(users);
                })
        })
    }
    useEffect(() => {
        let users = [];
        getUsers()
            .then(async (snapshot) => {
                await snapshot.forEach(async (user) => {
                    await getDocs(query(collection(database, `users/${auth.currentUser.uid}/messages/messageAll/${user.uid}`), orderBy('dateSended', 'desc')))
                        .then(async (snapshotForMessages) => {
                            if (snapshotForMessages.empty !== true) {
                                setMessagingUsers([...messagingUsers, { owner: user, lastMessage: snapshotForMessages.docs[0].data() }]);
                                users.push({ owner: user, lastMessage: snapshotForMessages.docs[0].data() });
                            }
                        })
                        .then(() => {
                            setMessagingUsers(users);
                        })
                })
            })
        return () => {
            setActiveMessagingUsers(dispatch, []);
        }
    }, []);

    let dispatch = useDispatch();

    const openMessageContainer = () => {
        toggleMessageSec(dispatch, true, auth.currentUser);
    }

    if (messagingUsers.length === 0) {
        return (
            <h5>loading...</h5>
        )
    }
    else {
        return (
            <div style={{ width: "75%", display: "flex", alignItems: "start" }}>
                {/* messages */}
                <div style={{ width: "40%", border: "1px solid #efefef", borderTop: "none", marginRight: "10px" }}>
                    <div style={{ position: "sticky", top: "0", zIndex: "100", background: "#fff" }}>
                        <div style={{ border: "1px solid #efefef" }}>
                            <div style={{ display: "flex", alignItems: "center", height: "40px", padding: "0 10px", lineHeight: "40px", zIndex: 100, background: "#fff" }}>
                                <h5 className='d-inline-block mt-1' style={{ width: "100%", height: "40px", lineHeight: "40px", cursor: "pointer" }} onClick={() => {
                                    window.scrollTo(0, 0);
                                }}>
                                    <b className='d-block'>Messages</b>
                                </h5>
                                <IconButton onClick={openMessageContainer}>
                                    <MessageIcon sx={{ fontSize: "17px" }} />
                                </IconButton>
                            </div>
                            <div style={{ boxSizing: "border-box", padding: "0 10px", margin: "10px 0", position: "relative" }}>
                                <TextField variant='outlined' size='small' InputProps={{ style: { borderRadius: "20px", paddingLeft: "30px" } }} fullWidth placeholder={`Search Direct Messages`} />
                                <span style={{ position: "absolute", left: "26px", top: "7px" }}><i className="fa-solid fa-magnifying-glass" style={{ color: "grey" }}></i></span>
                            </div>
                        </div>

                        <div>
                            message request
                        </div>
                    </div>

                    <div style={{ border: "1px solid #efefef" }}>
                        {
                            activeMessagingUsers &&
                            <>
                                {
                                    activeMessagingUsers.map((user, index) => {
                                        return (
                                            <MessageContainer message={{ owner: user }} key={index} />
                                        )
                                    })
                                }
                            </>
                        }
                        {
                            messagingUsers.map((message, index) => {
                                return (
                                    <MessageContainer message={message} key={index} />
                                )
                            })
                        }
                    </div>
                </div>


                {/* message part */}
                <div style={{ width: "60%", background: "#fff" }}>
                    {
                        searchParams ?
                            <MessageShownContainer uid={searchParams} />
                            :
                            <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ textAlign: "center" }}>
                                    <p className='m-0' style={{ fontSize: "17px" }}><b>You don't have a message selected</b></p>
                                    <small className='d-block my-2 text-muted' style={{ fontSize: "12px" }}>Choose one from your existing messages, or start a new one.</small>
                                    <MyButton onClick={openMessageContainer}><b>New message</b></MyButton>
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default MessagesPage