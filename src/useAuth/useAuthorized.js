import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase/firebaseConfig'

const useAuthorized = () => {
    let [isAuthorized, setIsAuthorized] = useState();
    onAuthStateChanged(auth, (user) => {
        if(user){
            setIsAuthorized(true);
        }
        else{
            setIsAuthorized(false);
        }
    })
    return {isAuthorized};
}

export default useAuthorized