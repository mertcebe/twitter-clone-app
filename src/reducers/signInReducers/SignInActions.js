export const toggleRegister = (dispatch, value) => {
    dispatch({
        type: 'TOGGLE_REGISTER',
        payload: value
    });
}

export const toggleSignIn = (dispatch, value) => {
    dispatch({
        type: 'TOGGLE_SIGNIN',
        payload: value
    });
}