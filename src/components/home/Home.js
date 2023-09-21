import React from 'react'
import AddPostContainer from './AddPostContainer';
import TweetsContainer from './TweetsContainer';



const Home = () => {
  return (
    <div style={{ width: "60%", marginRight: "100px" }}>
      <div style={{ border: "1px solid #efefef", height: "40px", lineHeight: "40px", padding: "0 10px" }}>
        <h5 className='d-inline-block'><b>Home</b></h5>
      </div>
      <AddPostContainer />
      <TweetsContainer />
    </div>
  )
}

export default Home