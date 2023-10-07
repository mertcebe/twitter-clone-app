import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import database, { auth } from '../../firebase/firebaseConfig';
import Loading from '../Loading';
import Tweet from '../home/Tweet';
import style from './style.module.css';

const BookMarksPage = () => {
    let [tweets, setTweets] = useState();
    let navigate = useNavigate();
    useEffect(() => {
        getDocs(query(collection(database, `users/${auth.currentUser.uid}/savedTweets`)))
            .then((snapshot) => {
                let tweets = [];
                snapshot.forEach((tweet) => {
                    tweets.push({
                        ...tweet.data(),
                        id: tweet.id
                    });
                })
                setTweets(tweets);
            })
    }, []);

    const deleteAll = () => {
        tweets.forEach((tweet) => {
            deleteDoc(doc(database, `users/${auth.currentUser.uid}/savedTweets/${tweet.id}`))
        })
    }

    if (!tweets) {
        return (
            <Loading />
        )
    }
    return (
        <div className={style.bookmarksContainer} style={{ width: "45%", border: "1px solid #efefef" }}>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #efefef", height: "50px", padding: "0 10px", lineHeight: "50px", position: "sticky", top: "0", zIndex: 100, background: "#fff" }}>
                <h5 className='d-inline-block' style={{ width: "92%", cursor: "pointer" }} onClick={() => {
                    window.scrollTo(0, 0);
                }}>
                    <b className='d-block'>Bookmarks</b>
                </h5>
                <Tooltip title='delete all'>
                    <IconButton onClick={(deleteAll)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <div>
                {
                    tweets.length === 0 ?
                        <div style={{width: "100%", height: "40px", textAlign: "center", lineHeight: "40px"}}>
                            <small>There is no bookmarks!</small>
                        </div>
                        :
                        <>
                            {
                                tweets.map((tweet) => {
                                    return (
                                        <Tweet tweet={tweet} />
                                    )
                                })
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default BookMarksPage