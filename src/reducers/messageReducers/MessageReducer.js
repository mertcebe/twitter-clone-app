let initialState = {
    isMessageSecOpen: false,
    sender: null
};

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MESSAGE_SEC':
            return {
                ...state,
                isMessageSecOpen: action.payload.toggle,
                sender: action.payload.owner
            };
        default:
            return state
    }
}

export default MessageReducer