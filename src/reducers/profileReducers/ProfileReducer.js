let initialState = {
    isEditSecOpen: false,
    editOwner: null
};

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_EDIT_SEC':
            return {
                ...state,
                isEditSecOpen: action.payload.toggle,
                editOwner: action.payload.owner
            };
        default:
            return state
    }
}

export default ProfileReducer