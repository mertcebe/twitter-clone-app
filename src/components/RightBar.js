import { Button, TextField } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebaseConfig'
import data from './data.json';
import News from './news/News';
import style from './news/style.module.css'
import SearchIcon from '@mui/icons-material/Search';

const RightBar = () => {
  let [newsData, setNewsData] = useState();
  let [size, setSize] = useState(4);
  let [searchText, setSearchText] = useState(4);

  const getNews = (searchText) => {
    setSize(4);
    const apiKey = '9b1ae7f1661c44299a04af508441f3b7';
    // fetch(`https://newsapi.org/v2/everything?q=${searchText === ''?'technology':searchText}&from=2023-08-24&sortBy=publishedAt&apiKey=9b1ae7f1661c44299a04af508441f3b7`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setNewsData(data.articles);
    //   })
    // setNewsData(data.articles);
  }

  useEffect(() => {
    getNews('technology');
  }, []);

  if (!newsData) {
    return (
      <></>
    )
  }
  return (
    <div style={{ width: "25%" }}>
      <div style={{ boxSizing: "border-box", padding: "12px 0", position: "sticky", top: "0", background: "#fff" }}>
        <form style={{ position: "relative", background: "#fff" }} onSubmit={(e) => {
          e.preventDefault();
          getNews(searchText);
        }}>
          <SearchIcon sx={{ position: "absolute", top: "12px", left: "10px", zIndex: "12" }} />
          <TextField variant='outlined' type='search' InputProps={{ sx: { borderRadius: "10px", height: "50px", paddingLeft: "25px", background: "#fff" } }} fullWidth placeholder='Search Twitter' onChange={(e) => { setSearchText(e.target.value); }} />
        </form>
      </div>

      <div style={{ background: "#f9f9f9", padding: "14px" }}>
        <p className='m-0 mb-2' style={{ fontSize: "18px" }}><b>Whats happening</b></p>
        {
          newsData.slice(0, size).map((data) => {
            return (
              <News news={data} />
            )
          })
        }
        {
          newsData.length > size ?
            <button className={style.showMoreButton} onClick={() => {
              setSize(size + 3);
            }}>Show more</button>
            :
            <></>
        }
      </div>
    </div>
  )
}

export default RightBar