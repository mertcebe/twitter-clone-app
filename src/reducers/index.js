import React from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import SignInReducer from './signInReducers/SignInReducer'
import CommentReducer from './commentReducers/CommentReducer'
import TweetReducer from './tweetsReducers/TweetReducer'
import NotificationReducer from './notificationsReducers/NotificationsReducer'
import ProfileReducer from './profileReducers/ProfileReducer'


const AppReducer = ({children}) => {
    const store = createStore(
        combineReducers({
            signInReducer: SignInReducer,
            commentReducer: CommentReducer,
            tweetsReducer: TweetReducer,
            notificationReducer: NotificationReducer,
            profileReducer: ProfileReducer
        })
    )

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}




export default AppReducer