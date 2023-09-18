import React from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import SignInReducer from './signInReducers/SignInReducer'


const AppReducer = ({children}) => {
    const store = createStore(
        combineReducers({
            signInReducer: SignInReducer
        })
    )

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}




export default AppReducer