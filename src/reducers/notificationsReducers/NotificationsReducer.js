let initialState = {
    refreshNotifications: false
};

const TweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_NOTIFICATION':
            return {
                ...state,
                refreshNotifications: action.payload
            };
        default:
            return state
    }
}

export default TweetReducer