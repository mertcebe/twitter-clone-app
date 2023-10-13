import { IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MessageIcon from '@mui/icons-material/Message';
import MessageContainer from './MessageContainer';
import style from './style.module.css';
import { collection, getDocs, query } from 'firebase/firestore';
import database, { auth } from '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { toggleMessageSec } from '../../reducers/messageReducers/MessageActions';
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
    let [messages, setMessages] = useState([{ text: 'qwdqwd qwdqwdqydg qwgdqywtd qywt dywqdfytqwdftyqdw ytqwudgqwu dquwd', owner: { name: 'mert', email: 'web@gmail.com', uid: 'tntISs2m2ggugvbkP7oPizjScA82' }, id: 'qwd12332r32feQ123Uwdqd2', dateSended: '1696663968240' }, { text: 'qwdqwd qwdqwdqydg qwgdqywtd qywt dywqdfytqwdftyqdw ytqwudgqwu dquwd', owner: { name: 'webDev', email: 'webDevwebDev123qwdqdwqwdqwdqwdqwdqwd@gmail.com', uid: 'vCto3lLulcRe2rVjJPN2CiCD3Dp1' }, id: 'qwd12332r32feQ123Uwdqd2', dateSended: '1696663968240' }]);
    const searchParams = useSearchParams()[0].get('id');
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
                        messages.map((message, index) => {
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
                        <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div style={{textAlign: "center"}}>
                                <p className='m-0' style={{fontSize: "17px"}}><b>You don't have a message selected</b></p>
                                <small className='d-block my-2 text-muted' style={{fontSize: "12px"}}>Choose one from your existing messages, or start a new one.</small>
                                <MyButton onClick={openMessageContainer}><b>New message</b></MyButton>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default MessagesPage