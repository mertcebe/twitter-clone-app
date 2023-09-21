import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase/firebaseConfig'
import SideBar from './SideBar'
import Home from './home/Home'
import RightBar from './RightBar'

const HomePage = () => {
  return (
    <div className='container my-2' style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "900px" }}>
      <Home />
      <RightBar />
    </div>
  )
}

export default HomePage