import React, { useEffect, useState } from 'react'
import style from './style.module.css';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import database from '../../firebase/firebaseConfig';
import Loading from '../Loading';
import Tweet from './Tweet';
import Skeleton from './skeleton';
import CommentSec from './comments/CommentSec';
import { useDispatch, useSelector } from 'react-redux';

const TweetsContainer = () => {
    let [tweets, setTweets] = useState();
    let [isCommentSecOpen, commentOwner] = useSelector((state) => {
        return [state.commentReducer.isCommentSecOpen, state.commentReducer.commentOwner];
    })

    useEffect(() => {
        getDocs(query(collection(database, `allTweets`), orderBy('dateAdded', 'desc')))
            .then((snapshot) => {
                let allTweets = [];
                snapshot.forEach((tweet) => {
                    allTweets.push({
                        ...tweet.data(),
                        id: tweet.id
                    });
                })
                setTweets(allTweets);
            })
    }, [tweets]);

    if (!tweets) {
        return (
            Array.from([1,2,3]).map((item) => {
                return (
                    <Skeleton hasImg={true} />
                )
            })
        )
    }
    return (
        <div className={style.tweetsContainer}>
            {
                isCommentSecOpen&&<CommentSec owner={commentOwner} />
            }
            {
                tweets.map((tweet) => {
                    return (
                        <Tweet tweet={tweet} key={tweet.id} />
                    )
                })
            }
        </div>
    )
}

export default TweetsContainer