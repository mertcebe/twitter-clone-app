import React, { useEffect } from 'react'
import '../styles/style.scss'
import { BrowserRouter, Routes, Route, useSearchParams, useLocation } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import HomePage from '../components/HomePage'
import SignInPage from '../components/login/SignInPage'
import useAuthorized from '../useAuth/useAuthorized';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading'
import SideBar from '../components/SideBar'
import { auth } from '../firebase/firebaseConfig'
import TweetCommentsPage from '../components/home/comments/TweetCommentsPage'
import RightBar from '../components/rightbar/RightBar'
import ProfilePage from '../components/profile/ProfilePage'
import NotificationsPage from '../components/notifications'
import ExplorePage from '../components/explore'
import BookMarksPage from '../components/bookmarks'
import MessagesPage from '../components/messages'

const AppRouter = () => {
    let { isAuthorized, loading } = useAuthorized();
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <BrowserRouter>
            <div className={isAuthorized && 'container'} id='allBody' style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                {
                    isAuthorized && <SideBar />
                }
                <Routes>
                    <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
                        <Route path={`/home`} element={<HomePage />} />
                        <Route path={`/search`} element={<ExplorePage />} />
                        <Route path={`/notifications`} element={<NotificationsPage />} />
                        <Route path={`/messages`} element={<MessagesPage />} />
                        <Route path={`/bookmarks`} element={<BookMarksPage />} />
                        <Route path={`/profile/:uid`} element={<ProfilePage />} />
                        <Route path={`/home/posts/:id`} element={<TweetCommentsPage />} />
                    </Route>

                    <Route element={<PublicRoute isAuthorized={isAuthorized} />}>
                        <Route path={`/`} element={<SignInPage />} />
                    </Route>
                </Routes>
                {
                    isAuthorized && <RightBar />
                }
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BrowserRouter>
    )
}

export default AppRouter