import { Button, TextField } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import database, { auth } from '../../firebase/firebaseConfig'
import data from '../data.json';
import News from '../news/News';
import style from '../rightbar/style.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { addDoc, collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import defaultProfileImg from '../../images/twitterProfileImg.png';
import { NavLink } from 'react-router-dom';
import Skeleton from './skeleton';
import { toast } from 'react-toastify';

export const sendNotification = (text, type, toWho, sender, post = null) => {
  addDoc(collection(database, `users/${toWho}/notifications`), {
    message: text,
    dateSended: new Date().getTime(),
    type: type,
    sender: sender,
    post: post
  })
}

const RightBar = () => {
  let [newsData, setNewsData] = useState();
  let [users, setUsers] = useState();
  let [sizeForNews, setSizeForNews] = useState(4);
  let [sizeForUsers, setSizeForUsers] = useState(4);
  let [searchText, setSearchText] = useState(4);

  const getNews = (searchText) => {
    setSizeForNews(4);
    const apiKey = '9b1ae7f1661c44299a04af508441f3b7';
    // fetch(`https://newsapi.org/v2/everything?q=${searchText === ''?'technology':searchText}&from=2023-08-26&sortBy=publishedAt&apiKey=${apiKey}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data)
    //     setNewsData(data.articles);
    //   })
    setNewsData(data.articles);
  }

  const getUsers = async () => {
    let snapshot = await getDocs(query(collection(database, `users/${auth.currentUser.uid}/followings`)))
    let allFollowings = [];
    snapshot.forEach((user) => {
      allFollowings.push(user.id);
    })
    await getDocs(query(collection(database, `users`)))
      .then((snapshot) => {
        let allUsers = [];
        snapshot.forEach((user) => {
          if (user.data().uid !== auth.currentUser.uid) {
            if (!allFollowings.includes(user.data().uid)) {
              allUsers.push({
                ...user.data(),
                id: user.id
              });
            }
          }
        })
        setUsers(allUsers);
      })
  }

  const followFunc = (user) => {
    document.getElementById(`followBtn-${user.uid}`).disabled = true;
    document.getElementById(`followBtn-${user.uid}`).style.opacity = 0.5;
    document.getElementById(`followBtn-${user.uid}`).innerHTML = 'Following';

    const myAccount = {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL
    };
    let date = new Date().getTime();

    setDoc(doc(database, `users/${auth.currentUser.uid}/followings/${user.uid}`), {
      ...user,
      dateFollowed: date
    })
      .then(async () => {
        await setDoc(doc(database, `users/${user.uid}/followers/${auth.currentUser.uid}`), {
          ...myAccount,
          dateFollowed: date
        });
      })
      .then(() => {
        sendNotification(`${auth.currentUser.displayName} following you!`, 'follow', user.uid, myAccount);
      })
  }

  useEffect(() => {
    getNews('technology');
    getUsers();
  }, []);

  if (!newsData || !users) {
    return (
      <div style={{ width: "25%" }}>
        <Skeleton />
      </div>
    )
  }
  return (
    <div style={{ width: "25%" }}>
      {/* search bar */}
      <div style={{ boxSizing: "border-box", padding: "12px 0", position: "sticky", top: "0", background: "#fff" }}>
        <form style={{ position: "relative", background: "#fff" }} onSubmit={(e) => {
          e.preventDefault();
          getNews(searchText);
        }}>
          <SearchIcon sx={{ position: "absolute", top: "12px", left: "10px", zIndex: "12" }} />
          <TextField variant='outlined' type='search' InputProps={{ sx: { borderRadius: "10px", height: "50px", paddingLeft: "25px", background: "#fff" } }} fullWidth placeholder='Search Twitter' onChange={(e) => { setSearchText(e.target.value); }} />
        </form>
      </div>

      {/* news */}
      <div style={{ background: "#f9f9f9", padding: "14px", marginBottom: "20px" }}>
        <p className='m-0 mb-2' style={{ fontSize: "18px" }}><b>Whats happening</b></p>
        {
          newsData.slice(0, sizeForNews).map((data) => {
            return (
              <News news={data} />
            )
          })
        }
        {
          newsData.length > sizeForNews ?
            <button className={style.showMoreButton} onClick={() => {
              setSizeForNews(sizeForNews + 3);
            }}>Show more</button>
            :
            <></>
        }
      </div>

      {/* users */}
      <div style={{ background: "#f9f9f9", padding: "14px" }}>
        <p className='m-0 mb-2' style={{ fontSize: "18px" }}><b>Who to follow</b></p>
        {
          users.slice(0, sizeForUsers).map((user) => {
            return (
              <div className={style.userContainer} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "5px", padding: "10px 5px", marginBottom: "5px" }}>
                <NavLink to={`/profile/${user.uid}`} style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#000", width: "100%" }}>
                  <img src={user.profileImg ? user.profileImg.src : defaultProfileImg} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px", pointerEvents: "none" }} />
                  <div>
                    <b style={{ fontSize: "14px" }}>{user.name}</b>
                    <small className='d-block text-muted' style={{ fontSize: "12px" }}>{user.email}</small>
                  </div>
                </NavLink>

                <button id={`followBtn-${user.uid}`} className={style.followBtn} onClick={() => {
                  followFunc(user);
                }}><b>Follow</b></button>
              </div>
            )
          })
        }
        {
          users.length > sizeForUsers ?
            <button className={style.showMoreButton} onClick={() => {
              setSizeForUsers(sizeForUsers + 3);
            }}>Show more</button>
            :
            <></>
        }
      </div>
    </div>
  )
}

export default RightBar