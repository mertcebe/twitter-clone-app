import { doc, setDoc } from "firebase/firestore"
import database, { auth } from "./firebaseConfig"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const setUserToFirebase = (user) => {
    setDoc(doc(database, `users/`), {
        ...user
    });
}

export const createUser = (user, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
        setDoc(doc(database, `users/${userCredentials.user.uid}`), {
            ...user,
            uid: userCredentials.user.uid
        })
        updateProfile(userCredentials.user, {
            displayName: user.name
        });
    })
}