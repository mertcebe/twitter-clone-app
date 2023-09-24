import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './style.module.css'

const News = ({ news }) => {
    return (
        <NavLink to={news.url} className={style.newsContainer} target='_blank' >
            <div style={{marginRight: "10px"}}>
                <small className='d-block'><b>{news.title}</b></small>
                <small className='text-muted' style={{fontSize: "12px"}}>{news.source.name}</small>
            </div>
            <img src={news.urlToImage} alt="" style={{width: "50px", height: "40px", borderRadius: "5px"}} />
        </NavLink>
    )
}

export default News