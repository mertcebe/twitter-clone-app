import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase/firebaseConfig'

const RightBar = () => {
  return (
    <div style={{width: "25%", background: "lightblue"}}>
      <Button onClick={() => {
        signOut(auth);
      }}>sign out</Button>
    </div>
  )
}

export default RightBar