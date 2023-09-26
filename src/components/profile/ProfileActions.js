import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import database from "../../firebase/firebaseConfig"

export const getProfile = async (uid) => {
    return new Promise((resolve, reject) => {
        getDoc(doc(database, `users/${uid}`))
            .then((snapshot) => {
                resolve(snapshot.data());
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getUserTweets = async (uid) => {
    return new Promise((resolve, reject) => {
        getDocs(query(collection(database, `users/${uid}/tweets`), orderBy('dateAdded', 'desc')))
            .then((snapshot) => {
                let tweets = [];
                snapshot.forEach((tweet) => {
                    tweets.push({
                        ...tweet.data(),
                        id: tweet.id
                    });
                })
                resolve(tweets);
            })
            .catch((error) => {
                reject(error);
            })
    })
}