import React, { useState } from 'react'
import database, { auth } from '../../firebase/firebaseConfig'
import profileImg from '../../images/twitterProfileImg.png';
import ImageIcon from '@mui/icons-material/Image';
import { IconButton } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import style from './style.module.css';
import { uploadImageToStorage } from '../../images/ImageActions';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import Skeleton from './skeleton';
import { refreshTweet, refreshTweets } from '../../reducers/tweetsReducers/TweetActions';
import { useDispatch, useSelector } from 'react-redux';

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

const AddPostContainer = () => {
    let [text, setText] = useState();
    let [file, setFile] = useState();
    let [loading, setLoading] = useState(false);
    let [isSelectedImage, setIsSelectedImage] = useState(false);

    let refreshTweet = useSelector((state) => {
        return state.tweetsReducer.refreshTweet;
    })
    let dispatch = useDispatch();

    const addPostFunc = () => {
        setLoading(true);
        let user = {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid
        };
        let myTags = [];
        text.split(' ').map((word) => {
            if (word.startsWith('#')) {
                myTags.push(word.replace('#', '').replace('.', '').replace(',', '').replace(':', ''));
            }
        })
        if (file) {
            setIsSelectedImage(true);
            uploadImageToStorage(file, auth.currentUser.uid)
                .then((snapshot) => {
                    let tweet = {
                        text: text,
                        tags: myTags,
                        img: snapshot,
                        dateAdded: new Date().getTime()
                    }
                    addDoc(collection(database, `users/${auth.currentUser.uid}/tweets`), {
                        ...tweet
                    })
                        .then((snapshot) => {
                            setDoc(doc(database, `allTweets/${snapshot.id}`), {
                                ...tweet,
                                owner: user
                            })
                            setLoading(false);
                            refreshTweets(dispatch, !refreshTweet);
                        })
                })
        }
        else {
            setIsSelectedImage(false);
            let tweet = {
                text: text,
                tags: myTags,
                img: null,
                dateAdded: new Date().getTime()
            };
            addDoc(collection(database, `users/${auth.currentUser.uid}/tweets`), {
                ...tweet
            })
                .then((snapshot) => {
                    setDoc(doc(database, `allTweets/${snapshot.id}`), {
                        ...tweet,
                        owner: user
                    })
                        .then(() => {
                            setLoading(false);
                            refreshTweets(dispatch, !refreshTweet);
                        })
                })
        }
        setFile();
        document.getElementById('fileInput1').value = '';
        setText('');
    }

    return (
        <div>
            <div style={{ padding: "10px", display: "flex", alignItems: "flex-start", width: "100%", border: "1px solid #efefef" }}>
                <div style={{ marginRight: "10px" }}>
                    <img src={auth.currentUser.photoURL ? auth.currentUser.photoURL : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", pointerEvents: "none" }} />
                </div>
                <div style={{width: "100%"}}>
                    <textarea value={text} onChange={(e) => {
                        setText(e.target.value);
                    }} style={{ maxHeight: "80px", width: "100%", height: "80px", outline: "none", resize: "none", border: "none", borderBottom: "1px solid #dfdfdf" }} placeholder="What's happening?"></textarea>
                    {
                        file ?
                            <div className={style.addFileContainer}>
                                <span className={style.fileSpan}></span>
                                <IconButton onClick={() => {
                                    setFile();
                                    document.getElementById('fileInput1').value = '';
                                }} sx={{ position: "absolute", top: "10px", left: "10px", zIndex: "10" }}>
                                    <CloseIcon sx={{ fontSize: "16px", color: "#fff" }} />
                                </IconButton>
                                <img src={file.url} alt="" className={style.twitterProfileImg} />
                            </div>
                            :
                            <></>
                    }
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <input type="file" id='fileInput1' style={{ display: "none" }} onChange={(e) => {
                                let file = e.target.files[0];
                                let url = URL.createObjectURL(file);
                                setFile({
                                    name: file.name,
                                    url: url,
                                    self: file,
                                    type: file.type
                                });
                            }} />
                            <label htmlFor="fileInput1" style={{ cursor: "pointer" }}>
                                <ImageIcon sx={{ color: "grey" }} />
                            </label>
                            <IconButton>
                                <MoodIcon />
                            </IconButton>
                        </div>
                        <MyColoredButton disabled={text || file ? false : true} style={{ background: text || file ? '' : 'grey' }} onClick={addPostFunc}>Tweet</MyColoredButton>
                    </div>
                </div>
            </div>
            {
                loading ?
                    <Skeleton hasImg={isSelectedImage} />
                    :
                    <></>
            }
        </div>
    )
}

export default AddPostContainer