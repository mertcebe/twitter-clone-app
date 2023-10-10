import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import database from '../../firebase/firebaseConfig';
import profileImg from '../../images/twitterProfileImg.png';

const MessageShownContainer = ({ uid }) => {
    let [user, setUser] = useState();

    const getUser = (uid) => {
        getDoc(doc(database, `users/${uid}`))
            .then((snapshot) => {
                console.log(snapshot.data())
                setUser(snapshot.data());
            })
    }

    useEffect(() => {
        getUser(uid);
    }, []);

    if (!user) {
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <div>
            <div style={{ display: "flex", alignItems: "start" }}>
                <div style={{marginRight: "10px"}}>
                    <img src={user.profileImg ? user.profileImg.src : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                </div>
                <div>
                    <small className='d-block' style={{fontSize: "18px"}}><b>{user.name}</b></small>
                    <small className='d-block text-muted' style={{fontSize: "12px"}}>{user.email}</small>
                </div>
            </div>
        </div>
    )
}

export default MessageShownContainer