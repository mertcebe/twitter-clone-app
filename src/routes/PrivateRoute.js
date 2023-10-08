import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router'
import CommentSec from '../components/home/comments/CommentSec';
import EditSec from '../components/profile/EditSec';
import SendMessageContainer from '../components/messages/SendMessageContainer';

const PrivateRoute = ({ isAuthorized }) => {
    let [isCommentSecOpen, commentOwner] = useSelector((state) => {
        return [state.commentReducer.isCommentSecOpen, state.commentReducer.commentOwner];
    })
    let [isEditSecOpen, editOwner] = useSelector((state) => {
        return [state.profileReducer.isEditSecOpen, state.profileReducer.editOwner];
    })
    let [isMessageSecOpen, sender] = useSelector((state) => {
        return [state.messageReducer.isMessageSecOpen, state.messageReducer.sender];
    })
    return (
        <>
            {
                isAuthorized ?
                    <Outlet />
                    :
                    <Navigate to={'/'} />
            }
            {
                isCommentSecOpen && <CommentSec owner={commentOwner} />
            }
            {
                isEditSecOpen && <EditSec owner={editOwner} />
            }
            {
                isMessageSecOpen && <SendMessageContainer owner={sender} />
            }
        </>
    )
}

export default PrivateRoute