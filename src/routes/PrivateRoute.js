import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router'
import CommentSec from '../components/home/comments/CommentSec';

const PrivateRoute = ({ isAuthorized }) => {
    let [isCommentSecOpen, commentOwner] = useSelector((state) => {
        return [state.commentReducer.isCommentSecOpen, state.commentReducer.commentOwner];
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
        </>
    )
}

export default PrivateRoute