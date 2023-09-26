import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase/firebaseConfig'
import SideBar from './SideBar'
import Home from './home/Home'
import RightBar from './rightbar/RightBar'
import { useSelector } from 'react-redux'
import CommentSec from './home/comments/CommentSec'

const HomePage = () => {
  return (
    <>
      <Home />
    </>

  )
}

export default HomePage