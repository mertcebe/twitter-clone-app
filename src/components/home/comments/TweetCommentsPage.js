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
                console.log(snapshot.data(), id);
                setTweet({
                    ...snapshot.data(),
                    id: id
                });
            })
    }
    useEffect(() => {
        getComments()
        getTweet();
        console.log('qwdqwdqwd')
    }, []);

    if (!allComments || !tweet) {
        return (
            <Loading />
        )
    }
    return (
        <div style={{ width: "45%", marginRight: "100px" }}>
            <div style={{ border: "1px solid #efefef", height: "40px", padding: "0 10px", lineHeight: "40px", position: "sticky", top: "0", zIndex: 100, background: "#fff" }}>
                <IconButton sx={{ position: "relative", top: "-2px", marginRight: "10px" }} onClick={() => {
                    navigate('/home');
                }}>
                    <ArrowBackIcon sx={{ fontSize: "20px", color: "#000" }} />
                </IconButton>
                {/* <path d='M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z'></path> */}
                <h5 className='d-inline-block' style={{ width: "90%", cursor: "pointer" }} onClick={() => {
                    window.scrollTo(0, 0);
                }}><b>Tweet</b></h5>
            </div>

            <div>
                <Tweet tweet={tweet} onlyShown={true} />
            </div>

            <div style={{ paddingBottom: "1000px" }}>
                {
                    allComments ?
                        <>
                            {
                                allComments.map((comment) => {
                                    return (
                                        <p>{comment.commentText}</p>
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