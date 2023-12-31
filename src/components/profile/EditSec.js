import React, { useEffect, useReducer, useState } from 'react';
import Button from '@mui/material/Button';
import { styled as styledForStyles } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import profileImg from '../../images/noImgPhoto.png';
import backImg from '../../images/noBackImg.jpg';
import { useDispatch } from 'react-redux';
import MoodIcon from '@mui/icons-material/Mood';
import ImageIcon from '@mui/icons-material/Image';
import styled from '@emotion/styled';
import { Navigate, useNavigate } from 'react-router';
import { toggleEditSec } from '../../reducers/profileReducers/ProfileActions';
import { TextField } from '@mui/material';
import { updateProfile } from 'firebase/auth';
import database, { auth } from '../../firebase/firebaseConfig';
import { uploadImageToStorage } from '../../images/ImageActions';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import loadingImg from '../../images/twitterLoadingGif.gif'
import style from './style.module.css';

const BootstrapDialog = styledForStyles(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const MyColoredButton = styled.button`
  width: 100px;
  padding: 8px 0;
  background: #1d9bf0;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  border: none;
  margin: 10px 0;
  transition: all 0.2s ease;
  &:hover{
    filter: brightness(0.9);
  }
`;

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_VALUES':
            return {
                ...state,
                [action.key]: action.value
            };
        default:
            return state
    }
}

const EditSec = ({ owner }) => {
    let [backFile, setBackFile] = useState();
    let [profileFile, setProfileFile] = useState();
    let [loading, setLoading] = useState(false);

    let initialState = {
        name: owner.name,
        description: owner.description,
        location: owner.location,
        tag: owner.tag
    }

    const [stateForEdit, dispatchForEdit] = useReducer(reducer, initialState);

    const setValues = (key, value) => {
        dispatchForEdit({
            type: 'SET_VALUES',
            key: key,
            value: value
        });
    }

    let navigate = useNavigate();

    useEffect(() => {
        console.log(owner)
    }, [])
    const [open, setOpen] = useState(true);
    let dispatch = useDispatch();

    const handleClose = () => {
        toggleEditSec(dispatch, false, null);
    };

    const updateFunc = (snapshotForProfileImg = null, snapshotForBackImg = null) => {
        updateProfile(auth.currentUser, {
            displayName: stateForEdit.name ? stateForEdit.name : owner.name,
            photoURL: snapshotForProfileImg?.src
        })
        updateDoc(doc(database, `users/${auth.currentUser.uid}`), {
            ...stateForEdit,
            profileImg: snapshotForProfileImg ? snapshotForProfileImg : owner.profileImg,
            backImg: snapshotForBackImg ? snapshotForBackImg : owner.backImg
        })
            .then(() => {
                handleClose();
                setLoading(false);
                toast.dark('Your profile is editted!');
            })
    }

    const saveFunc = () => {
        setLoading(true);
        if (profileFile) {
            uploadImageToStorage(profileFile, auth.currentUser.uid)
                .then((snapshotForProfileImg) => {
                    if (backFile) {
                        uploadImageToStorage(backFile, auth.currentUser.uid)
                            .then((snapshotForBackImg) => {
                                updateFunc(snapshotForProfileImg, snapshotForBackImg);
                            })
                    }
                    else {
                        updateFunc(snapshotForProfileImg);
                    }
                })
        }
        else if (backFile) {
            uploadImageToStorage(backFile, auth.currentUser.uid)
                .then((snapshotForBackImg) => {
                    if (profileFile) {
                        uploadImageToStorage(profileFile, auth.currentUser.uid)
                            .then((snapshotForProfileImg) => {
                                updateFunc(snapshotForProfileImg, snapshotForBackImg);
                            })
                    }
                    else {
                        updateFunc(null, snapshotForBackImg);
                    }
                })
        }
        else {
            updateFunc(null, null);
        }
    }

    return (
        <div style={{ position: "fixed" }}>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <div className={style.editContainer} style={{ width: "500px" }}>
                    {
                        loading ?
                            <div style={{width: "100%"}}>
                                <img src={loadingImg} alt="" style={{width: "100%"}} />
                            </div>
                            :
                            <>
                                <div style={{ padding: "14px" }}>
                                    <h5 style={{ fontSize: "18px" }}><b>Edit Profile</b></h5>
                                </div>

                                <div style={{ marginBottom: "100px" }}>
                                    <div>
                                        <input type="file" style={{ display: "none" }} id='fileInputBack' onChange={(e) => {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setBackFile({
                                                name: e.target.files[0].name,
                                                type: e.target.files[0].type,
                                                noStorageURL: url,
                                                self: e.target.files[0]
                                            })
                                        }} />
                                        <label htmlFor="fileInputBack" style={{width: "100%"}}>
                                            <img className={style.backImgContainer} src={backFile ? backFile.noStorageURL : backImg} alt="" style={{ width: "500px", height: "180px", cursor: "pointer", filter: "brightness(0.9)" }} />
                                        </label>
                                    </div>
                                    <div style={{ width: "100%", background: "red", position: "relative" }}>
                                        <input type="file" style={{ display: "none" }} id='fileInputProfile' onChange={(e) => {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setProfileFile({
                                                name: e.target.files[0].name,
                                                type: e.target.files[0].type,
                                                noStorageURL: url,
                                                self: e.target.files[0]
                                            })
                                        }} />
                                        <label htmlFor="fileInputProfile" style={{ position: "absolute", top: "-70px", left: "20px", borderRadius: "50%", border: "5px solid #fff" }}>
                                            <img src={profileFile ? profileFile.noStorageURL : profileImg} alt="" style={{ width: "120px", height: "120px", cursor: "pointer", borderRadius: "50%", filter: "brightness(0.8)" }} />
                                        </label>
                                    </div>
                                </div>

                                <div style={{ padding: "0 20px", marginBottom: "20px" }}>
                                    <TextField onChange={(e) => {
                                        setValues('name', e.target.value)
                                    }} size='small' fullWidth variant='filled' label='Name' sx={{ mb: "14px" }} />
                                    <TextField onChange={(e) => {
                                        setValues('description', e.target.value)
                                    }} size='small' fullWidth variant='filled' label='Description' sx={{ mb: "14px" }} />
                                    <TextField onChange={(e) => {
                                        setValues('location', e.target.value)
                                    }} size='small' fullWidth variant='filled' label='Location' sx={{ mb: "14px" }} />
                                    <TextField onChange={(e) => {
                                        setValues('tag', e.target.value)
                                    }} size='small' fullWidth variant='filled' label='Tag' sx={{ mb: "14px" }} />
                                    <div style={{ textAlign: "end" }}>
                                        <Button onClick={saveFunc}>Save</Button>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </BootstrapDialog>
        </div>
    );
}

export default EditSec