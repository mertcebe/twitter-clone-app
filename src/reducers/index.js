import React from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import SignInReducer from './signInReducers/SignInReducer'
import CommentReducer from './commentReducers/CommentReducer'
import TweetReducer from './tweetsReducers/TweetReducer'


const AppReducer = ({children}) => {
    const store = createStore(
        combineReducers({
            signInReducer: SignInReducer,
            commentReducer: CommentReducer,
            tweetsReducer: TweetReducer
        })
    )

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}




export default AppReducer