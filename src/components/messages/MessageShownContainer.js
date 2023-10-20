import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import database, { auth } from '../../firebase/firebaseConfig';
import profileImg from '../../images/twitterProfileImg.png';
import { useSearchParams } from 'react-router-dom';
import Loading from '../Loading';
import { IconButton, TextField, Tooltip } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SendIcon from '@mui/icons-material/Send';
import verificationIcon from '../../images/twitterVerificationIcon.png';
import { ShortInfo } from '../profile/ProfilePage';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToStorage } from '../../images/ImageActions';
import SingleMessageContainer from './SingleMessageContainer';

const MessageShownContainer = ({ uid }) => {
    let [user, setUser] = useState();
    const searchParams = useSearchParams()[0].get('id');
    let [messages, setMessages] = useState();
    let [followings, setFollowings] = useState();
    let [followers, setFollowers] = useState();
    let [messageText, setMessageText] = useState();
    let [imageFirstView, setImageFirstView] = useState();

    const getUser = (uid) => {
        getDoc(doc(database, `users/${uid}`))
            .then((snapshot) => {
                setUser(snapshot.data());
            })
    }

    const getMessagesWith = (userUid) => {
        getDocs(query(collection(database, `users/${auth.currentUser.uid}/messages/messageAll/${userUid}`), orderBy('dateSended', 'asc')))
            .then((snapshot) => {
                let messages = [];
                snapshot.forEach((message) => {
                    messages.push({
                        ...message.data(),
                        id: message.id
                    });
                });
                setMessages(messages);
            })
    }

    const getMyFollowings = async (uid) => {
        getDocs(query(collection(database, `users/${uid}/followings`)))
            .then((snapshot) => {
                let followers = [];
                snapshot.forEach((item) => {
                    followers.push(item.id);
                });
                setFollowings(followers)
            })
    }

    const getMyFollowers = async (uid) => {
        getDocs(query(collection(database, `users/${uid}/followers`)))
            .then((snapshot) => {
                let followers = [];
                snapshot.forEach((item) => {
                    followers.push(item.id);
                });
                setFollowers(followers)
            })
    }

    useEffect(() => {
        setUser();
        getUser(uid);
        getMyFollowers(uid);
        getMyFollowings(uid);
        getMessagesWith(uid);
    }, [searchParams]);

    const sendMessageFunc = (e) => {
        e.preventDefault();
        const date = new Date().getTime();
        if (imageFirstView) {
            uploadImageToStorage(imageFirstView, `messages`)
                .then((snapshot) => {
                    addDoc(collection(database, `users/${uid}/messages/messageAll/${auth.currentUser.uid}`), {
                        messageText: messageText,
                        dateSended: date,
                        owner: {
                            name: auth.currentUser.displayName,
                            uid: auth.currentUser.uid,
                            email: auth.currentUser.email,
                            profileImg: {
                                src: auth.currentUser.photoURL
                            }
                        },
                        type: 'receive',
                        img: {
                            ...snapshot
                        }
                    })
                        .then((snapshotForId) => {
                            setDoc(doc(database, `users/${auth.currentUser.uid}/messages/messageAll/${uid}/${snapshotForId.id}`), {
                                messageText: messageText,
                                dateSended: date,
                                toUserUid: uid,
                                type: 'send',
                                img: {
                                    ...snapshot
                                }
                            })
                        })
                        .then(() => {
                            updateDoc(doc(database, `users/${auth.currentUser.uid}`), {
                                lastMessageDate: date
                            })
                            updateDoc(doc(database, `users/${uid}`), {
                                lastMessageDate: date
                            })
                            getMessagesWith(uid);
                        })
                })
        }
        else {
            addDoc(collection(database, `users/${uid}/messages/messageAll/${auth.currentUser.uid}`), {
                messageText: messageText,
                dateSended: date,
                owner: {
                    name: auth.currentUser.displayName,
                    uid: auth.currentUser.uid,
                    email: auth.currentUser.email,
                    profileImg: {
                        src: auth.currentUser.photoURL
                    }
                },
                type: 'receive',
                img: null
            })
                .then((snapshotForId) => {
                    setDoc(doc(database, `users/${auth.currentUser.uid}/messages/messageAll/${uid}/${snapshotForId.id}`), {
                        messageText: messageText,
                        dateSended: date,
                        toUserUid: uid,
                        type: 'send',
                        img: null
                    })
                })
                .then(() => {
                    updateDoc(doc(database, `users/${auth.currentUser.uid}`), {
                        lastMessageDate: date
                    })
                    updateDoc(doc(database, `users/${uid}`), {
                        lastMessageDate: date
                    })
                    getMessagesWith(uid);
                })
        }
        setImageFirstView();
        setMessageText('');
        document.getElementById('fileInputForMessageImg').value = '';

    }

    if (!user || !messages) {
        return (
            <Loading width={'40'} />
        )
    }
    return (
        <div style={{position: "relative"}}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 4px #efefef", padding: "5px 0", position: "sticky", top: "0", zIndex: 140, background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "start" }}>
                    <div style={{ marginRight: "10px" }}>
                        <img src={user.profileImg ? user.profileImg.src : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                    </div>
                    <div>
                        <small className='d-block' style={{ fontSize: "18px" }}><b>{user.name}</b> {user.personalize && <Tooltip title='Verified account'><img src={verificationIcon} alt="" style={{ width: "16px", height: "16px", cursor: "pointer" }} /></Tooltip>}</small>
                        <small className='d-block text-muted' style={{ fontSize: "12px" }}>{user.email}</small>
                    </div>
                </div>
                <div>
                    <IconButton>
                        <ErrorOutlineIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                </div>
            </div>

            {/* messages */}
            <div style={{ background: "#fff", height: "calc(100vh - 105px)", display: "flex", alignItems: "end", position: "relative", overflow: "auto" }}>
                {
                    messages.length !== 0 ?
                        <div style={{ width: "100%", height: "calc(100vh - 105px)" }}>
                            {
                                messages.map((message) => {
                                    return (
                                        <SingleMessageContainer message={message} key={message.id} />
                                    )
                                })
                            }
                        </div>
                        :
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "10px" }}>
                            <div style={{ width: "80%", textAlign: "center" }}>
                                <div>
                                    <small style={{ fontSize: "16px", marginRight: "5px" }}><b>{user.name}</b> {user.personalize && <Tooltip title='Verified account'><img src={verificationIcon} alt="" style={{ width: "16px", height: "16px", cursor: "pointer" }} /></Tooltip>}</small>
                                    <small className='text-muted' style={{ fontSize: "10px" }}>{user.email}</small>
                                </div>
                                <div>
                                    <small className='d-block' style={{ color: "grey", fontSize: "12px" }}>
                                        {user.description}
                                    </small>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "180px", margin: "5px 0" }}>
                                            <ShortInfo icon={`${followings?.length}`} text={'Followings'} type={`/profile/${uid}/following`} />
                                            <ShortInfo icon={`${followers?.length}`} text={'Followers'} type={`/profile/${uid}/followers`} />
                                        </div>
                                    </div>
                                    <ShortInfo icon={<i className="fa-solid fa-calendar-days" style={{ color: "grey" }}></i>} text={`Joined on ${new Date(user.dateAdded).toDateString()}`} />
                                </div>
                            </div>
                        </div>
                }

            </div>

            {/* image container */}
            {
                imageFirstView &&
                <div className='shadow' style={{ width: "90%", background: "#fff", zIndex: 100, position: "absolute", bottom: "56px", left: "0", borderRadius: "30px", borderBottomLeftRadius: "0", boxSizing: "border-box", padding: "10px 30px" }}>
                    <IconButton sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 90 }} onClick={() => {
                        setImageFirstView();
                        document.getElementById('fileInputForMessageImg').value = '';
                    }}>
                        <CloseIcon />
                    </IconButton>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                        <img src={imageFirstView.url} alt="" style={{ width: "50%", marginRight: "10px", borderRadius: "10px" }} />
                        <div>
                            <small className='d-block mb-2'><b>Name:</b> <i>{imageFirstView.file.name}</i></small>
                            <small className='d-block mb-2'><b>Type:</b> <i>{imageFirstView.file.type}</i></small>
                            <small className='d-block'><b>Size:</b> <i>{imageFirstView.file.size} kb</i></small>
                        </div>
                    </div>
                </div>
            }

            {/* input */}
            <form onSubmit={sendMessageFunc} style={{ width: "100%", display: "flex", alignItems: "center", padding: "5px 4px 5px 4px" }}>
                <div style={{ marginRight: "10px" }}>
                    <input type="file" id='fileInputForMessageImg' style={{ display: "none" }} onChange={(e) => {
                        const url = URL.createObjectURL(e.target.files[0]);
                        setImageFirstView({
                            url: url,
                            name: e.target.files[0].name,
                            type: e.target.files[0].type,
                            self: e.target.files[0],
                            file: e.target.files[0]
                        });
                    }} />
                    <label htmlFor="fileInputForMessageImg" style={{ cursor: "pointer" }}><i className="fa-regular fa-image" style={{ color: "#1d9bf0", fontSize: "20px" }}></i></label>
                </div>
                <div style={{ marginRight: "10px" }}>
                    <input type="file" id='fileInputForMessageGif' style={{ display: "none" }} />
                    <label htmlFor="fileInputForMessageGif" style={{ cursor: "pointer", height: "20px" }}><GifBoxIcon sx={{ color: "#1d9bf0", position: "relative", top: "-3.5px" }} /></label>
                </div>
                <TextField size='small' value={messageText} variant='outlined' onChange={(e) => {
                    setMessageText(e.target.value);
                }} InputProps={{ style: { borderRadius: "40px" } }} style={{ marginRight: "2px" }} fullWidth placeholder='Start a new message' />
                <div>
                    <IconButton disabled={messageText || imageFirstView ? false : true} onClick={sendMessageFunc}>
                        <SendIcon sx={{ color: messageText || imageFirstView ? "#1d9bf0" : 'grey' }} />
                    </IconButton>
                </div>
            </form>
        </div>
    )
}

export default MessageShownContainer