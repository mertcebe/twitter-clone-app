let initialState = {
    isMessageSecOpen: false,
    sender: null,
    activeMessagingUsers: []
};

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MESSAGE_SEC':
            return {
                ...state,
                isMessageSecOpen: action.payload.toggle,
                sender: action.payload.owner
            };
        case 'MESSAGES':
            return {
                ...state,
                activeMessagingUsers: action.payload
            };
        default:
            return state
    }
}

export default MessageReducer