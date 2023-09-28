import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router'
import CommentSec from '../components/home/comments/CommentSec';
import EditSec from '../components/profile/EditSec';

const PrivateRoute = ({ isAuthorized }) => {
    let [isCommentSecOpen, commentOwner] = useSelector((state) => {
        return [state.commentReducer.isCommentSecOpen, state.commentReducer.commentOwner];
    })
    let [isEditSecOpen, editOwner] = useSelector((state) => {
        return [state.profileReducer.isEditSecOpen, state.profileReducer.editOwner];
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
        </>
    )
}

export default PrivateRoute