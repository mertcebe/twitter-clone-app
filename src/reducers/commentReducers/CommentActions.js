export const toggleCommentSec = (dispatch, value, owner) => {
    dispatch({
        type: 'TOGGLE_COMMENT_SEC',
        payload: {
            toggle: value,
            owner: owner
        }
    });
}