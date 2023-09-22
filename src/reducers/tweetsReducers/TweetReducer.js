let initialState = {
    refreshTweet: false
};

const TweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_TWEETS':
            return {
                ...state,
                refreshTweet: action.payload
            };
        default:
            return state
    }
}

export default TweetReducer