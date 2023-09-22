export const refreshTweets = (dispatch, value) => {
    dispatch({
        type: 'REFRESH_TWEETS',
        payload: value
    });
}