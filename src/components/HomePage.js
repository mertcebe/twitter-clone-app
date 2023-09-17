import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase/firebaseConfig'

const HomePage = () => {
  return (
    <div>
      <button onClick={() => {signOut(auth)}}>signOut</button>
    </div>
  )
}

export default HomePage