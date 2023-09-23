import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import database, { auth } from '../../../firebase/firebaseConfig';
import Loading from '../../Loading';
import { useNavigate, useParams } from 'react-router';
import Tweet from '../Tweet';
import { IconButton, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Skeleton from '../skeleton';
import CommentContainer from './CommentContainer';

const TweetCommentsPage = () => {
    const { id } = useParams();

    let [allComments, setAllComments] = useState();
    let [tweet, setTweet] = useState();

    let navigate = useNavigate();
    const getComments = async () => {
        getDocs(query(collection(database, `allTweets/${id}/comments`), orderBy('dateSended', 'asc')))
            .then((snapshot) => {
                let comments = [];
                snapshot.forEach((comment) => {
                    comments.push({
                        ...comment.data(),
                        id: comment.id
                    });
                })
                setAllComments(comments);
            })
    }

    const getTweet = async () => {
        getDoc(doc(database, `allTweets/${id}`))
            .then((snapshot) => {
                setTweet({
                    ...snapshot.data(),
                    id: id
                });
            })
    }


    let refreshTweet = useSelector((state) => {
        return state.tweetsReducer.refreshTweet;
    })

    useEffect(() => {
        getComments();
        getTweet();
    }, [refreshTweet]);

    if (!allComments || !tweet) {
        return (
            <div style={{ width: "50%", marginRight: "100px" }}>
                <Loading width={'40'} height={'70'} />
            </div>
        )
    }
    return (
        <div style={{ width: "45%", border: "1px solid #efefef" }}>
            <div style={{ border: "1px solid #efefef", height: "40px", padding: "0 10px", lineHeight: "40px", position: "sticky", top: "0", zIndex: 100, background: "#fff" }}>
                <IconButton sx={{ position: "relative", top: "-2px", marginRight: "10px" }} onClick={() => {
                    navigate(-1);
                }}>
                    <ArrowBackIcon sx={{ fontSize: "20px", color: "#000" }} />
                </IconButton>
                <h5 className='d-inline-block' style={{ width: "90%", cursor: "pointer" }} onClick={() => {
                    window.scrollTo(0, 0);
                }}><b>Tweet</b></h5>
            </div>

            <div>
                <Tweet tweet={tweet} onlyShown={true} />
            </div>

            <div style={{ boxSizing: "border-box", paddingLeft: "60px" }}>
                {
                    allComments ?
                        <>
                            {
                                allComments.map((comment) => {
                                    return (
                                        <CommentContainer comment={comment} owner={tweet.owner} />
                                    )
                                })
                            }
                        </>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

export default TweetCommentsPage