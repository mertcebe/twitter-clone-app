import React, { useEffect, useState } from 'react'
import style from './style.module.css';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import database from '../../firebase/firebaseConfig';
import Loading from '../Loading';
import Tweet from './Tweet';

const TweetsContainer = () => {
    let [tweets, setTweets] = useState();
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
    }, []);

    if(!tweets){
        return (
            <Loading width={30} height={50} />
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