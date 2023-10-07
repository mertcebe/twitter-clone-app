import { Box, Fade, Grow, IconButton, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import style from './style.module.css'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import database, { auth } from '../../firebase/firebaseConfig';
import SingleNotification from './SingleNotification';
import { useSelector } from 'react-redux';

const NotificationsPage = () => {
    let [notifications, setNotifications] = useState();
    const [value, setValue] = useState('all');

    const refreshNotifications = useSelector((state) => {
        return state.notificationReducer.refreshNotifications;
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getDocs(query(collection(database, `users/${auth.currentUser.uid}/notifications`), orderBy('dateSended', 'desc')))
            .then((snapshot) => {
                let items = [];
                snapshot.forEach((item) => {
                    items.push({
                        ...item.data(),
                        id: item.id
                    });
                })
                setNotifications(items);
            })
        window.scrollTo(0, 0);
    }, [refreshNotifications]);

    if (!notifications) {
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <div className={style.notificationContainer} style={{ width: "45%", position: "relative" }}>
            <div style={{ border: "1px solid #efefef", height: "50px", padding: "0 10px", lineHeight: "40px", position: "sticky", top: "0", zIndex: 100, background: "#fff" }}>
                <h5 className='d-inline-block mt-1' style={{ width: "100%", height: "40px", lineHeight: "40px", cursor: "pointer" }} onClick={() => {
                    window.scrollTo(0, 0);
                }}>
                    <b className='d-block'>Notifications</b>
                </h5>
            </div>
            <Box sx={{ width: '100%', display: "flex", alignItems: "center", position: "sticky", top: "50px", background: "#fff", zIndex: "100" }}>
                <Tabs
                    style={{ width: "90%" }}
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="primary tabs example"
                >
                    <Tab value="all" label="All" />
                    <Tab value="follow" label="Follow" />
                    <Tab value="likes" label="Likes" />
                    <Tab value="comments" label="Comments" />
                </Tabs>
                <div style={{ width: "10%", textAlign: "center" }}>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </Box>

            <div>
                {
                    value === 'all' &&
                    <Fade in={value} style={{ transformOrigin: '0 0 0' }}
                        {...(value ? { timeout: 500 } : {})}>
                        <div>
                            {
                                notifications.map((notification) => {
                                    return (
                                        <SingleNotification notification={notification} />
                                    )
                                })
                            }
                        </div>
                    </Fade>
                }
                {
                    value === 'follow' &&
                    <Fade in={value} style={{ transformOrigin: '0 0 0' }}
                        {...(value ? { timeout: 500 } : {})}>
                        <div>
                            {
                                notifications.map((notification) => {
                                    if (notification.type === 'follow') {
                                        return (
                                            <SingleNotification notification={notification} />
                                        )
                                    }
                                })
                            }
                        </div>
                    </Fade>
                }
                {
                    value === 'likes' &&
                    <Fade in={value} style={{ transformOrigin: '0 0 0' }}
                        {...(value ? { timeout: 500 } : {})}>
                        <div>
                            {
                                notifications.map((notification) => {
                                    if (notification.type === 'like') {
                                        return (
                                            <SingleNotification notification={notification} />
                                        )
                                    }
                                })
                            }
                        </div>
                    </Fade>
                }
                {
                    value === 'comments' &&
                    <Fade in={value} style={{ transformOrigin: '0 0 0' }}
                        {...(value ? { timeout: 500 } : {})}>
                        <div>
                            {
                                notifications.map((notification) => {
                                    if (notification.type === 'comment') {
                                        return (
                                            <SingleNotification notification={notification} />
                                        )
                                    }
                                })
                            }
                        </div>
                    </Fade>
                }
            </div>
        </div>
    )
}

export default NotificationsPage