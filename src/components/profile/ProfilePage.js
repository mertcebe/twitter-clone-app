import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import database, { auth } from '../../firebase/firebaseConfig';
import { getFollowers, getFollowings, getProfile, getUserTweets } from './ProfileActions';
import defaultBackImg from '../../images/twitterDefaultBackImg.jpg';
import defaultProfileImg from '../../images/twitterProfileImg.png';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import style from './style.module.css';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import Tweet from '../home/Tweet';
import { sendNotification } from '../rightbar/RightBar';
import { toggleEditSec } from '../../reducers/profileReducers/ProfileActions';
import { useDispatch } from 'react-redux';

const ShortInfo = ({ icon, text, type }) => {
    if (typeof icon === 'string') {
        return (
            <NavLink to={`${type}`} className='m-0' style={{ textDecoration: "none", color: "#000" }}><b style={{ marginRight: "6px", fontSize: "16px" }}>{icon}</b><span className='text-muted' style={{ fontSize: "14px" }}>{text}</span></NavLink>
        )
    }
    else {
        return (
            <p className='m-0'><span style={{ marginRight: "6px", fontSize: "14px" }}>{icon}</span><span className='text-muted' style={{ fontSize: "14px" }}>{text}</span></p>
        )
    }
}

const ProfilePage = () => {
    const { uid } = useParams();
    let [user, setUser] = useState();
    let [tweets, setTweets] = useState();
    let [followers, setFollowers] = useState();
    let [followings, setFollowings] = useState();
    let [myFollowings, setMyFollowings] = useState();

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const getMyFollowings = async () => {
        return new Promise((resolve, reject) => {
            getDocs(query(collection(database, `users/${auth.currentUser.uid}/followings`)))
                .then((snapshot) => {
                    let followers = [];
                    snapshot.forEach((item) => {
                        followers.push(item.id);
                    })
                    resolve(followers);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    const followFunc = (user) => {
        // document.getElementById(`followBtn-${user.uid}`).disabled = true;
        // document.getElementById(`followBtn-${user.uid}`).style.opacity = 0.5;
        // document.getElementById(`followBtn-${user.uid}`).innerHTML = 'Following';

        const myAccount = {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            photoURL: auth.currentUser.photoURL
        };

        setDoc(doc(database, `users/${auth.currentUser.uid}/followings/${user.uid}`), {
            ...user,
            dateFollowed: new Date().getTime()
        })
            .then(async () => {
                await setDoc(doc(database, `users/${user.uid}/followers/${auth.currentUser.uid}`), {
                    ...myAccount,
                    dateFollowed: new Date().getTime()
                });
            })
            .then(async () => {
                sendNotification(`${auth.currentUser.displayName} following you!`, 'follow', user.uid, myAccount);
            })
            .then(async () => {
                await getMyFollowings()
                    .then((snapshot) => {
                        setMyFollowings(snapshot);
                    })
            })
    }

    const stopFollowFunc = (user) => {
        // document.getElementById(`stopFollowBtn-${user.uid}`).innerHTML = 'Follow';

        const myAccount = {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            photoURL: auth.currentUser.photoURL
        };

        deleteDoc(doc(database, `users/${auth.currentUser.uid}/followings/${user.uid}`))
            .then(async () => {
                await deleteDoc(doc(database, `users/${user.uid}/followers/${auth.currentUser.uid}`));
            })
            .then(async () => {
                await getMyFollowings()
                    .then((snapshot) => {
                        setMyFollowings(snapshot);
                    })
            })
    }

    useEffect(() => {
        getProfile(uid)
            .then((snapshot) => {
                setUser(snapshot);
            });
        getUserTweets(uid)
            .then((snapshot) => {
                setTweets(snapshot);
            })
        getFollowers(uid)
            .then((snapshot) => {
                setFollowers(snapshot);
            })
        getFollowings(uid)
            .then((snapshot) => {
                setFollowings(snapshot);
            })
        getMyFollowings()
            .then((snapshot) => {
                setMyFollowings(snapshot);
            })
        window.scrollTo(0, 0);
    }, [uid]);


    // tabs section
    const [value, setValue] = useState('tweets');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!user || !tweets || !followers || !followings || !myFollowings) {
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <div style={{ width: "45%", border: "1px solid #efefef" }}>
            <div style={{ border: "1px solid #efefef", height: "50px", padding: "0 10px", lineHeight: "40px", position: "sticky", top: "0", zIndex: 100, background: "#fff" }}>
                <IconButton sx={{ position: "relative", top: "-10px", marginRight: "20px" }} onClick={() => {
                    navigate(-1);
                }}>
                    <ArrowBackIcon sx={{ fontSize: "20px", color: "#000" }} />
                </IconButton>
                <h5 className='d-inline-block' style={{ width: "90%", cursor: "pointer" }} onClick={() => {
                    window.scrollTo(0, 0);
                }}>
                    <b className='d-block mt-1'>{user.name}</b>
                    <small className='d-block' style={{ fontSize: "12px", color: "grey" }}>{tweets.length} tweets</small>
                </h5>
            </div>

            <div style={{ width: "100%", position: "relative" }}>
                <img src={user.backImg ? user.backImg : defaultBackImg} alt="" style={{ width: "100%", height: "200px" }} />
                <img src={user.photoURL ? user.photoURL : defaultProfileImg} alt="" style={{ width: "140px", height: "140px", borderRadius: "10px", border: "5px solid #fff", position: "absolute", top: "130px", left: "14px" }} />
            </div>

            <div style={{ textAlign: "end", width: "100%", height: "80px" }}>
                {
                    uid !== auth.currentUser.uid ?
                        <>
                            {
                                myFollowings.includes(uid) ?
                                    <button id={`stopFollowBtn-${uid}`} onClick={() => {
                                        stopFollowFunc(user);
                                    }} className={style.followBtn} style={{ background: "#737373" }}><b>Stop following</b></button>
                                    :
                                    <button id={`followBtn-${uid}`} onClick={() => {
                                        followFunc(user)
                                    }} className={style.followBtn}><b>Follow</b></button>
                            }
                        </>
                        :
                        <button onClick={() => {
                            toggleEditSec(dispatch, true, user);
                        }} className={style.editBtn}><b>Edit Profile</b></button>
                }
            </div>

            <div style={{ boxSizing: "border-box", padding: "0 18px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <h5 style={{ fontSize: "22px", margin: "0" }}><b>{user.name}</b></h5>
                    <small className='d-block text-muted m-0'>{user.email}</small>
                </div>
                <div>
                    <p className='m-0'>{user.description}</p>
                    <p className='m-0'><i className="fa-solid fa-location-dot text-muted"></i>{user.location}</p>
                    <ShortInfo icon={<i className="fa-solid fa-calendar-days text-muted"></i>} text={`Joined on ${new Date(user.dateAdded).toDateString()}`} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "220px", margin: "10px 0" }}>
                        <ShortInfo icon={`${followings.length}`} text={'Following'} type={'following'} />
                        <ShortInfo icon={`${followers.length}`} text={'Followers'} type={'followers'} />
                    </div>
                </div>
            </div>

            <Box sx={{ width: '100%' }}>
                <Tabs
                    centered
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="primary tabs example"
                >
                    <Tab value="tweets" label="Tweets" />
                    <Tab value="two" label="Item Two" />
                    <Tab value="three" label="Item Three" />
                    <Tab value="four" label="Item four" />
                    <Tab value="five" label="Item five" />
                </Tabs>
            </Box>

            <div>
                {
                    value === 'tweets' &&
                    <div>
                        {
                            tweets.map((tweet) => {
                                return (
                                    <Tweet tweet={{ ...tweet, owner: user }} />
                                )
                            })
                        }
                    </div>
                }
                {
                    value === 'two' && <h5>two</h5>
                }
                {
                    value === 'three' && <h5>three</h5>
                }
            </div>
        </div>
    )
}

export default ProfilePage