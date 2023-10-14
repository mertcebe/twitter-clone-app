import { Tooltip } from '@mui/material'
import React from 'react'
import Moment from 'react-moment'

const SingleMessageContainer = ({ message }) => {
    if (message.type === 'send') {
        return (
            <div style={{ width: "100%", background: "", textAlign: "end" }}>
                <div style={{ background: "#5fbffe", color: "#fff", display: "inline-block", padding: "5px 14px", borderRadius: "12px", borderBottomRightRadius: "0px", margin: "4px 0" }}>
                    {
                        message.img &&
                        <Tooltip title={message.img.name}>
                            <img src={message.img.src} alt="" style={{ height: "160px", borderRadius: "4px" }} />
                        </Tooltip>
                    }
                    <small className='d-block' style={{ fontWeight: '400', maxWidth: "400px" }}>{message.messageText}</small>
                </div>
                <small className='d-block' style={{color: "grey", fontSize: "9px"}}><Moment calendar>{message.dateSended}</Moment> <i className="fa-solid fa-check"></i></small>
            </div>
        )
    }
    return (
        <div style={{ width: "100%", background: "", textAlign: "start" }}>
            <div style={{ background: "#dfdfdf", color: "#242424", display: "inline-block", padding: "5px 14px", borderRadius: "12px", borderBottomLeftRadius: "0px", margin: "4px 0" }}>
                {
                    message.img &&
                    <Tooltip title={message.img.name}>
                        <img src={message.img.src} alt="" style={{ height: "140px", borderRadius: "4px" }} />
                    </Tooltip>
                }
                <small className='d-block' style={{ fontWeight: '400', maxWidth: "400px" }}>{message.messageText}</small>
            </div>
            <small className='d-block' style={{ color: "grey", fontSize: "9px" }}><Moment calendar>{message.dateSended}</Moment> <i className="fa-solid fa-check"></i></small>
        </div>
    )
}

export default SingleMessageContainer