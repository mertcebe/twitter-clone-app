export const toggleMessageSec = (dispatch, value, owner) => {
    dispatch({
        type: 'TOGGLE_MESSAGE_SEC',
        payload: {
            toggle: value,
            owner: owner
        }
    });
}