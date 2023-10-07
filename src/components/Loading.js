import React from 'react'
import twitterNewLogo from '../images/twitterNewLogo.png';

const Loading = ({width, height}) => {
  return (
    <div className='loadingContainer' style={{display: "flex", justifyContent: "center", height: height?`${height}vh`:"90vh", alignItems: "center"}}>
        <img src={twitterNewLogo} alt="" style={{width: width?`${width}px`:"50px"}} />
    </div>
  )
}

export default Loading