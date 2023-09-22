import React, { useEffect, useState } from 'react'
import style from './style.module.css';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import database from '../../firebase/firebaseConfig';
import Loading from '../Loading';
import Tweet from './Tweet';
import Skeleton from './skeleton';
import { useSelector } from 'react-redux';

const TweetsContainer = () => {
    let [tweets, setTweets] = useState();

    const getTweets = () => {
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
    }

    let refreshTweet = useSelector((state) => {
        return state.tweetsReducer.refreshTweet;
    })

    useEffect(() => {
        getTweets();
    }, [refreshTweet]);

    if (!tweets) {
        return (
            Array.from([1, 2, 3]).map((item) => {
                return (
                    <Skeleton hasImg={true} />
                )
            })
        )
    }
    return (
        <div className={style.tweetsContainer}>
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