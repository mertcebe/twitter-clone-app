import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Fade, IconButton, Tab, Tabs, TextField } from '@mui/material';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import database from '../../firebase/firebaseConfig';
import Tweet from '../home/Tweet';
import SingleExploreContainer from './SingleExploreContainer';
import SingleExploreImgContainer from './SingleExploreImgContainer';

const Title = ({ title }) => {
    return (
        <h5 className='d-block my-2 mt-4' style={{ fontSize: "18px" }}>{title}</h5>
    )
}

const ExplorePage = () => {
    let [searchText, setSearchText] = useState();
    let [searchByTags, setSearchByTags] = useState();
    let [searchByUser, setSearchByUser] = useState();
    let [searchByPhoto, setSearchByPhoto] = useState();
    let [searchByText, setSearchByText] = useState();

    const [searchList] = useSearchParams();
    const searchParams = searchList.get('q');

    let navigate = useNavigate();

    const getTweetsByTags = () => {
        getDocs(query(collection(database, `allTweets`)))
            .then((snapshot) => {
                let tweets = [];
                snapshot.forEach((tweet) => {
                    let tags = [];
                    tweet.data().text.split(' ').map((word) => {
                        if (word.startsWith('#')) {
                            tags.push(word.replace('#', '').replace('.', ''));
                        }
                    })
                    if (tags.join('').includes(searchParams)) {
                        getDoc(doc(database, `users/${tweet.data().owner.uid}`))
                            .then((snapshotForUser) => {
                                tweets.push({
                                    ...tweet.data(),
                                    owner: snapshotForUser.data(),
                                    id: tweet.id,
                                    tags: tags
                                })
                            })
                    }
                })
                setSearchByTags(tweets);
            })
    }

    const getTopTweets = () => {
        getDocs(query(collection(database, `allTweets`)), orderBy('dateAdded', 'asc'))
            .then((snapshot) => {
                let tweets = [];
                snapshot.forEach((tweet) => {
                    let tags = [];
                    tweet.data().text.split(' ').map((word) => {
                        if (word.startsWith('#')) {
                            tags.push(word.replace('#', '').replace('.', ''));
                        }
                    })
                    getDoc(doc(database, `users/${tweet.data().owner.uid}`))
                        .then((snapshotForUser) => {
                            tweets.push({
                                ...tweet.data(),
                                owner: snapshotForUser.data(),
                                id: tweet.id,
                                tags: tags
                            })
                        })
                })
                setSearchByTags(tweets);
            })
    }

    const getUsers = () => {
        getDocs(query(collection(database, `users`)))
            .then((snapshot) => {
                let users = [];
                snapshot.forEach((user) => {
                    if (user.data().name.toLowerCase().includes(`${searchParams.toLowerCase()}`)) {
                        users.push({
                            ...user.data()
                        })
                    }
                })
                setSearchByUser(users);
            })
    }

    const getPhotos = () => {
        getDocs(query(collection(database, `allTweets`)))
            .then((snapshot) => {
                let photos = [];
                snapshot.forEach((photo) => {
                    if (photo.data().img?.name.split('.')[0].toLowerCase().includes(`${searchParams.toLowerCase()}`)) {
                        photos.push({
                            ...photo.data(),
                            id: photo.id
                        })
                    }
                })
                setSearchByPhoto(photos);
            })
    }

    const getTweetsByText = () => {
        getDocs(query(collection(database, `allTweets`)))
            .then((snapshot) => {
                let tweets = [];
                snapshot.forEach((tweet) => {
                    let tags = [];
                    tweet.data().text.split(' ').map((word) => {
                        if (word.startsWith('#')) {
                            tags.push(word.replace('#', '').replace('.', ''));
                        }
                    })
                    if (tweet.data().text.includes(searchParams)) {
                        getDoc(doc(database, `users/${tweet.data().owner.uid}`))
                            .then((snapshotForUser) => {
                                tweets.push({
                                    ...tweet.data(),
                                    owner: snapshotForUser.data(),
                                    id: tweet.id,
                                    tags: tags
                                })
                            })
                    }
                })
                console.log(tweets)
                setSearchByText(tweets);
            })
    }

    useEffect(() => {
        if (searchParams) {
            getTweetsByTags();
            getUsers();
            getPhotos();
            getTweetsByText();
        }
        else {
            document.getElementById('exploreInput').value = '';
            getTopTweets();
            setSearchByUser();
        }
    }, [searchParams]);

    // tabs section
    const [value, setValue] = useState('top');
    const handleChange = (event, newValue) => {
        if (!searchParams) {
            setValue('top');
        }
        else {
            setValue(newValue);
        }
        window.scrollTo(0, 0);
    };

    return (
        <div style={{ width: "45%" }}>
            {/* search bar */}
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: "0", background: "#fff" }}>
                <div style={{ width: "5%" }}>
                    <IconButton onClick={() => {
                        navigate('/home');
                    }}>
                        <ArrowBackIcon sx={{ fontSize: "22px", color: "#000" }} />
                    </IconButton>
                </div>
                <div style={{ width: "92%", boxSizing: "border-box", padding: "12px 0", position: "sticky", top: "0", background: "#fff" }}>
                    <form style={{ position: "relative", background: "#fff" }} onSubmit={(e) => {
                        e.preventDefault();
                        if (searchText) {
                            navigate(`/search?q=${searchText}`);
                        }
                    }}>
                        <SearchIcon sx={{ position: "absolute", top: "8px", left: "10px", zIndex: "12" }} />
                        <TextField variant='outlined' type='search' id='exploreInput' defaultValue={searchParams} InputProps={{ sx: { borderRadius: "10px", height: "40px", paddingLeft: "25px", background: "#fff" } }} fullWidth placeholder='Search Twitter' onChange={(e) => { setSearchText(e.target.value); }} />
                    </form>
                </div>
            </div>

            <Box sx={{ width: '100%', borderBottom: "1px solid #dfdfdf", position: "sticky", top: "64px", background: "#fff" }}>
                <Tabs
                    centered
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="primary tabs example"
                >
                    <Tab value="top" label="Top" />
                    <Tab value="tags" label="Tags" />
                    <Tab value="people" label="People" />
                    <Tab value="tweet" label="Tweet" />
                    <Tab value="photos" label="Photos" />
                </Tabs>
            </Box>
            <div>
                {
                    value === 'top' &&
                    <Fade in={value} {...(value ? { timeout: 500 } : {})}>
                        <div>
                            {
                                searchParams ?
                                    <>
                                        {
                                            searchByTags?.length !== 0 &&
                                            <Title title={'Tweets'} />
                                        }
                                    </>
                                    :
                                    <Title title={'Tweets for you'} />
                            }
                            {
                                searchByTags ?
                                    <>
                                        {
                                            searchByTags.slice(0, 5).map((tweet) => {
                                                return (
                                                    <SingleExploreContainer tweet={tweet} type={'post'} />
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <></>
                            }

                            <Title title={'People'} />
                            {
                                searchByUser ?
                                    <>
                                        {
                                            searchByUser.map((tweet) => {
                                                return (
                                                    <SingleExploreContainer tweet={tweet} type={'people'} />
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                    </Fade>
                }
                {
                    value === 'tags' &&
                    <Fade in={value} {...(value ? { timeout: 500 } : {})}>
                        <div>
                            {
                                searchByTags ?
                                    <>
                                        {
                                            searchByTags.length === 0 ?
                                                <small>There were no results!</small>
                                                :
                                                <>
                                                    {
                                                        searchByTags.map((tweet) => {
                                                            return (
                                                                <SingleExploreContainer tweet={tweet} />
                                                            )
                                                        })
                                                    }
                                                </>
                                        }
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                    </Fade>
                }
                {
                    value === 'people' &&
                    <Fade in={value} {...(value ? { timeout: 500 } : {})}>
                        <div>
                            {
                                searchByUser ?
                                    <>
                                        {
                                            searchByUser.length === 0 ?
                                                <small>There were no results!</small>
                                                :
                                                <>
                                                    {
                                                        searchByUser.map((tweet) => {
                                                            return (
                                                                <SingleExploreContainer tweet={tweet} type={'people'} />
                                                            )
                                                        })
                                                    }
                                                </>
                                        }
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                    </Fade>
                }
                {
                    value === 'tweet' &&
                    <Fade in={value} {...(value ? { timeout: 500 } : {})}>
                        <div>
                            {
                                searchByTags ?
                                    <>
                                        {
                                            searchByText.length === 0 ?
                                                <small>There were no results!</small>
                                                :
                                                <>
                                                    {
                                                        searchByText.map((tweet) => {
                                                            return (
                                                                <SingleExploreContainer tweet={tweet} />
                                                            )
                                                        })
                                                    }
                                                </>
                                        }
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                    </Fade>
                }
                {
                    value === 'photos' &&
                    <Fade in={value} {...(value ? { timeout: 500 } : {})}>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {
                                searchByPhoto ?
                                    <>
                                        {
                                            searchByPhoto.length === 0 ?
                                                <small>There were no results!</small>
                                                :
                                                <>
                                                    {
                                                        searchByPhoto.map((tweet) => {
                                                            return (
                                                                <SingleExploreImgContainer tweet={tweet} />
                                                            )
                                                        })
                                                    }
                                                </>
                                        }
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                    </Fade>
                }
            </div>
        </div>
    )
}

export default ExplorePage