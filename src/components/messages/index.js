import { IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MessageIcon from '@mui/icons-material/Message';
import MessageContainer from './MessageContainer';
import style from './style.module.css';
import { collection, getDocs, query } from 'firebase/firestore';
import database, { auth } from '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { toggleMessageSec } from '../../reducers/messageReducers/MessageActions';

const MessagesPage = () => {
    let [messages, setMessages] = useState(['user']);
    useEffect(() => {
        // getDocs(query(collection(database, ``)))
    }, []);

    let dispatch = useDispatch();

    const openMessageContainer = () => {
        toggleMessageSec(dispatch, true, auth.currentUser);
    }

    return (
        <div style={{ width: "75%", display: "flex", alignItems: "start" }}>
            {/* messages */}
            <div style={{ width: "40%", border: "1px solid #efefef", borderTop: "none" }}>
                <div style={{position: "sticky", top: "0", zIndex: "100", background: "#fff"}}>
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
                        messages.map((message, index) => {
                            return (
                                <MessageContainer message={message} key={index} />
                            )
                        })
                    }
                </div>
            </div>


            {/* message part */}
            <div style={{ width: "60%", background: "#dfdfdf" }}>
                message part
            </div>
        </div>
    )
}

export default MessagesPage