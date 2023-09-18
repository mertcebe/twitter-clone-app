let initialState = {
    isOpenRegister: false,
    isOpenSignIn: false
};

const SignInReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_REGISTER':
            return {
                ...state,
                isOpenRegister: action.payload
            };
        case 'TOGGLE_SIGNIN':
            return {
                ...state,
                isOpenSignIn: action.payload
            };
        default:
            return state
    }
}

export default SignInReducer