import React from 'react'
import AddPostContainer from './AddPostContainer';
import TweetsContainer from './TweetsContainer';



const Home = () => {
  return (
    <div style={{ width: "45%" }}>
      <div style={{ border: "1px solid #efefef", height: "50px", padding: "0 10px", lineHeight: "40px", position: "sticky", top: "0", zIndex: 100, background: "#fff" }}>
        <h5 className='d-inline-block mt-1' style={{ width: "100%", height: "40px", lineHeight: "40px", cursor: "pointer" }} onClick={() => {
          window.scrollTo(0, 0);
        }}>
          <b className='d-block'>Home</b>
        </h5>
      </div>
      <AddPostContainer />
      <TweetsContainer />
    </div>
  )
}

export default Home