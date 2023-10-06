import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import style from './style.module.css'
import { toast } from 'react-toastify'
import profileImg from '../../images/twitterProfileImg.png'

const HighlightedWord = ({ word }) => {
    return (
        <span style={{ color: "#fff", background: "lightblue" }}>{word}</span>
    )
}

const SingleExploreContainer = ({ tweet, type }) => {
    const searchParams = useSearchParams()[0].get('q');
    let myText = '';
    if (type === 'people') {
        return (
            <div className='d-flex align-items-start shadow-sm' style={{ padding: "10px" }}>
                <div style={{ marginRight: "5px" }}>
                    <img src={tweet.profileImg ? tweet.profileImg.src : profileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", pointerEvents: "none" }} />
                </div>
                <div style={{ width: "100%" }}>
                    <NavLink to={`/search?q=${searchParams}`} style={{ textDecoration: "none", color: "#000", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div>
                            <NavLink to={`/profile/${tweet.uid}`} className='d-block' style={{ fontSize: "14px", textDecoration: "none", color: "#000" }}><b>{tweet.name}</b></NavLink>
                            <small className='d-block' style={{ fontSize: "11px", color: "grey" }}>{tweet.email}</small>
                        </div>
                        {
                            type === 'people' &&
                            <button className={style.followBtn} onClick={() => {
                                toast.dark('qwdqwd')
                            }}>follow</button>
                        }
                    </NavLink>
                    <small className='d-block' style={{ fontSize: "11px", color: "#000" }}>{tweet.description?.slice(0, 200)}{tweet.description?.length > 200 ? '...' : ''}</small>
                </div>
            </div>
        )
    }
    return (
        <NavLink to={`/home/posts/${tweet.id}`} className='d-flex align-items-start shadow-sm' style={{ textDecoration: "none", color: "#000", padding: "10px" }}>
            <div style={{ marginRight: "5px" }}>
                <img src={tweet.owner.profileImg ? tweet.owner.profileImg.src : profileImg} alt="" style={{ width: "50px", height: "50px", borderRadius: "50%", pointerEvents: "none" }} />
            </div>
            <div>
                <NavLink to={searchParams ? `/search?q=${searchParams}` : `/search`} style={{ textDecoration: "none", color: "#000", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div>
                        <NavLink to={`/profile/${tweet.owner.uid}`} className='d-block' style={{ fontSize: "14px", textDecoration: "none", color: "#000" }}><b>{tweet.owner.name}</b></NavLink>
                        <small className='d-block' style={{ fontSize: "11px", color: "grey" }}>{tweet.owner.email}</small>
                    </div>
                    {
                        type === 'people' &&
                        <button className={style.followBtn} onClick={() => {
                            toast.dark('qwdqwd')
                        }}>follow</button>
                    }
                </NavLink>
                {/* <small className='d-block mt-1' style={{ fontSize: "11px", color: "#000" }}>{tweet.text.slice(0, 200)}{tweet.text.length > 200 ? '...' : ''}</small> */}
                <small className='d-block mt-1' style={{ fontSize: "11px", color: "#000", wordBreak: "break-word" }}>{
                    tweet.text.split(' ').map((word) => {
                        if (word.includes(searchParams)) {
                            return (
                                <span><HighlightedWord word={word} /> </span>
                            )
                        }
                        return (
                            <span>{word} </span>
                        )
                    })
                }</small>
                <div style={{ width: "100%", boxSizing: "border-box", padding: "10px 10px 20px 0" }}>
                    <img src={tweet.img?.src} alt="" style={{ width: "100%", pointerEvents: "none" }} />
                </div>
            </div>
        </NavLink>
    )
}

export default SingleExploreContainer