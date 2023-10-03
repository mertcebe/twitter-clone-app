import React from 'react'
import { NavLink } from 'react-router-dom'

const SingleExploreImgContainer = ({ tweet }) => {
    return (
        <NavLink to={`/home/posts/${tweet.id}`} className='m-1'>
            <img src={tweet.img.src} alt="" style={{height: "170px", pointerEvents: "none"}} />
        </NavLink>
    )
}

export default SingleExploreImgContainer