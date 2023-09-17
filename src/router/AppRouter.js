import React from 'react'
import '../styles/style.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import HomePage from '../components/HomePage'
import SignInPage from '../components/SignInPage'
import useAuthorized from '../useAuth/useAuthorized';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AppRouter = () => {
    let { isAuthorized } = useAuthorized();
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
                    <Route path={`/home`} element={<HomePage />} />
                </Route>

                <Route element={<PublicRoute isAuthorized={isAuthorized} />}>
                    <Route path={`/`} element={<SignInPage />} />
                </Route>
            </Routes>
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