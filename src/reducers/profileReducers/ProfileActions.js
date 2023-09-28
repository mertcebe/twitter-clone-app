export const toggleEditSec = (dispatch, value, owner) => {
    dispatch({
        type: 'TOGGLE_EDIT_SEC',
        payload: {
            toggle: value,
            owner: owner
        }
    });
}