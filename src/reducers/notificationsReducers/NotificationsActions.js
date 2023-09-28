export const refreshNotificationsFunc = (dispatch, value) => {
    dispatch({
        type: 'REFRESH_NOTIFICATION',
        payload: value
    });
}