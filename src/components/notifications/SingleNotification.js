import React from 'react'
import defaultProfileImg from '../../images/twitterProfileImg.png'
import Moment from 'react-moment'
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import style from './style.module.css'
import { NavLink } from 'react-router-dom'
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { deleteDoc, doc } from 'firebase/firestore'
import database, { auth } from '../../firebase/firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { refreshNotificationsFunc } from '../../reducers/notificationsReducers/NotificationsActions'

const NotificationType = ({ type }) => {
    return (
        <Tooltip title={type}>
            {
                type === 'follow' && <i className="fa-solid fa-user" style={{ color: "#1d9bf0", fontSize: "18px", cursor: "pointer" }}></i>
            }
            {
                type === 'like' && <i className="fa-solid fa-heart" style={{ color: "red", fontSize: "18px", cursor: "pointer" }}></i>
            }
            {
                type === 'comment' && <i className="fa-solid fa-comment" style={{ color: "#1d9bf0", fontSize: "18px", cursor: "pointer" }}></i>
            }
        </Tooltip>
    )
}

const SingleNotification = ({ notification }) => {
    const refreshNotifications = useSelector((state) => {
        return state.notificationReducer.refreshNotifications;
    })
    let dispatch = useDispatch();

    const deleteNotification = () => {
        deleteDoc(doc(database, `users/${auth.currentUser.uid}/notifications/${notification.id}`))
            .then(() => {
                refreshNotificationsFunc(dispatch, !refreshNotifications);
            })
    }

    return (
        <div className={style.SingleNotificationContainer} id={notification.id}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{ margin: "auto 0", marginRight: "10px" }}>
                    {
                        <NotificationType type={notification.type} />
                    }
                </div>
                <div style={{ marginRight: "10px" }}>
                    <NavLink className={style.singleNotificationNavLink} to={`/profile/${notification.sender.uid}`}>
                        <img src={notification.sender.photoURL ? notification.sender.photoURL : defaultProfileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", pointerEvents: "none" }} />
                    </NavLink>
                </div>
                <div>
                    <div>
                        <NavLink className={style.singleNotificationNavLink} to={`/profile/${notification.sender.uid}`}><small style={{ display: "inline-block", marginRight: "10px" }}><b>{notification.sender.name}</b></small></NavLink>
                        <NavLink className={style.singleNotificationNavLink} to={`/profile/${notification.sender.uid}`}><small className='text-muted' style={{ display: "inline-block", marginRight: "5px" }}>@{notification.sender.email}</small></NavLink>
                        <small className='text-muted' style={{ fontSize: "12px" }}><Moment fromNow>{notification.dateSended}</Moment></small>
                    </div>
                    <p className='m-0' style={{ fontSize: "14px", color: "#505050", wordBreak: "break-word" }}>{notification.message}</p>
                </div>
                {
                    notification.post &&
                    <NavLink to={`/home/posts/${notification.post.id}`} style={{ margin: "auto 10px", height: "100%" }}>
                        {
                            notification.post.img ?
                                <img src={notification.post.img.src} alt="" style={{ height: "36px" }} />
                                :
                                <DriveFileMoveIcon sx={{ color: "#000" }} />
                        }
                    </NavLink>
                }
            </div>

            <div>
                <IconButton onClick={deleteNotification}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default SingleNotification