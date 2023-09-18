import React from 'react'
import twitterNewLogo from '../images/twitterNewLogo.png';

const Loading = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", height: "90vh", alignItems: "center"}}>
        <img src={twitterNewLogo} alt="" style={{width: "50px"}} />
    </div>
  )
}

export default Loading