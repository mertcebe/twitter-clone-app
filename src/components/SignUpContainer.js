import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from '../firebase/firebaseActions';
import { useDispatch } from 'react-redux';
import { toggleRegister } from '../reducers/signInReducers/SignInActions';

const MyButton = styled.button`
  width: 100%;
  padding: 8px 0;
  background: #000;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  border: 1px solid #efefef;
  margin: 10px 0;
  transition: all 0.2s ease;
  &:hover{
    opacity: 0.8;
  };
`;

const SignUpContainer = () => {
    let [step, setStep] = useState(1);
    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    let [personalize, setPersonalize] = useState(true);

    let dispatch = useDispatch();

    // select component for birthday
    let years = [];
    let days = [];
    for (let i = 2023; i >= 1903; i--) {
        years.push(i);
    }
    for (let i = 1; i <= 31; i++) {
        days.push(i);
    }
    const [month, setMonth] = useState('');
    const handleChangeForMonth = (event) => {
        setMonth(event.target.value);
    };
    const [day, setDay] = useState('');
    const handleChangeForDay = (event) => {
        setDay(event.target.value);
    };
    const [year, setYear] = useState('');
    const handleChangeForYear = (event) => {
        setYear(event.target.value);
    };
    const getMonthNumber = (month) => {
        if (month === 'January') {
            return 0;
        }
        if (month === 'February') {
            return 1;
        }
        if (month === 'March') {
            return 2;
        }
        if (month === 'April') {
            return 3;
        }
        if (month === 'May') {
            return 4;
        }
        if (month === 'June') {
            return 5;
        }
        if (month === 'July') {
            return 6;
        }
        if (month === 'August') {
            return 7;
        }
        if (month === 'September') {
            return 8;
        }
        if (month === 'October') {
            return 9;
        }
        if (month === 'November') {
            return 10;
        }
        if (month === 'December') {
            return 11;
        }
    }

    const register = () => {
        let birthdayDate = new Date(year, getMonthNumber(month), day).getTime();
        let user = {
            name: name,
            email: email,
            birthday: birthdayDate,
            personalize: personalize,
            dateAdded: new Date().getTime()
        };
        createUser(user, email, password);
        toggleRegister(dispatch, false);
    }

    return (
        <div className='signUpMediaContainer' style={{ position: "fixed", top: "50%", left: "50%", backdropFilter: "brightness(0.6)", width: "100%", height: "100vh", transform: "translate(-50%, -50%)", zIndex: "100" }}>
            <div className='signUpMedia' style={{ position: "absolute", top: "50%", left: "50%", background: "#fff", transform: "translate(-50%, -50%)", width: "570px", height: "90vh", padding: "10px", borderRadius: "14px" }}>
                <div className="d-flex" style={{ alignItems: "flex-start" }}>
                    {
                        step !== 1 ?
                            <div style={{ width: "10%" }}>
                                <IconButton onClick={() => {
                                    setStep(step - 1);
                                }}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </div>
                            :
                            <div style={{ width: "10%" }}>
                                <IconButton onClick={() => {
                                    toggleRegister(dispatch, false);
                                }}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                    }

                    <div style={{ margin: "5px 20px", width: "80%", paddingRight: "40px" }}>
                        <p className='m-0'><b>Step {step}</b></p>

                        {/* content */}
                        {/* input */}
                        {
                            step === 1 &&
                            <div style={{ height: "520px" }}>
                                <h4 className='py-3'><b>Create your account</b></h4>
                                <Box sx={{ my: "30px" }}>
                                    <TextField fullWidth id="outlined-basic" defaultValue={name} onChange={(e) => {
                                        setName(e.target.value);
                                    }} label="Name" variant="outlined" sx={{ mb: "16px" }} />
                                    <TextField fullWidth id="outlined-basic" defaultValue={email} type='text' onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} label="Email" variant="outlined" sx={{ mb: "16px" }} />
                                    <TextField fullWidth id="outlined-basic" defaultValue={password} type='password' onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} label="Password" variant="outlined" />
                                </Box >
                                <div className='my-2'>
                                    <p className='m-0 my-1'><b>Birthday</b></p>
                                    <small className='d-block'>
                                        This will not be shown publicly.
                                        Even if this account is for a business, pet,
                                        or something else,
                                        you'll need to verify your own age.
                                    </small>
                                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
                                        <FormControl sx={{ width: "45%" }}>
                                            <InputLabel id="demo-simple-select-label">Month</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={month}
                                                label="Month"
                                                onChange={handleChangeForMonth}
                                            >
                                                <MenuItem value={'January'}>January</MenuItem>
                                                <MenuItem value={'February'}>Februray</MenuItem>
                                                <MenuItem value={'March'}>March</MenuItem>
                                                <MenuItem value={'April'}>April</MenuItem>
                                                <MenuItem value={'May'}>May</MenuItem>
                                                <MenuItem value={'June'}>June</MenuItem>
                                                <MenuItem value={'July'}>July</MenuItem>
                                                <MenuItem value={'August'}>August</MenuItem>
                                                <MenuItem value={'September'}>September</MenuItem>
                                                <MenuItem value={'October'}>October</MenuItem>
                                                <MenuItem value={'November'}>November</MenuItem>
                                                <MenuItem value={'December'}>December</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ width: "25%" }}>
                                            <InputLabel id="demo-simple-select-label">Day</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={day}
                                                label="Day"
                                                onChange={handleChangeForDay}
                                            >
                                                {
                                                    days.map((day) => {
                                                        return (
                                                            <MenuItem value={day}>{day}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ width: "25%" }}>
                                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={year}
                                                label="Year"
                                                onChange={handleChangeForYear}
                                            >
                                                {
                                                    years.map((year) => {
                                                        return (
                                                            <MenuItem value={year}>{year}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* checkbox */}
                        {
                            step === 2 &&
                            <div style={{ height: "520px" }}>
                                <h4 className='py-3'><b>Customize your experience</b></h4>
                                <h5 className='py-1 mt-4'><b>Control where you see X content on the web</b></h5>
                                <div className='mb-5' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <label htmlFor="ch-1">
                                        X uses this data to personalize the experience.
                                        This web browsing history is never stored along with your name,
                                        email or phone number.
                                    </label>
                                    <input type="checkbox" id='ch-1' defaultChecked={personalize} onChange={(e) => {
                                        setPersonalize(e.target.checked);
                                    }} />
                                </div>
                                <small className='d-block'>
                                    By signing up you agree to our <Link to={'/terms'} style={{ color: "#1d9bf0" }}>Terms</Link>,
                                    <Link to={'/privacy-policy'} style={{ color: "#1d9bf0" }}>Privacy Policy</Link> and Use of <Link to={'/cookies'} style={{ color: "#1d9bf0" }}>Cookies</Link>.
                                    X may use your contact information,
                                    including your email address and phone number,
                                    for the purposes set out in our Privacy Policy.
                                    <Link to={'/learn-more'} style={{ color: "#1d9bf0" }}>Learn more</Link>
                                </small>
                            </div>
                        }
                        {
                            step === 3 &&
                            <div style={{ height: "520px" }}>
                                <h4 className='py-3'><b>Create your account</b></h4>
                                <Box sx={{ my: "30px" }}>
                                    <TextField fullWidth id="outlined-basic" value={name} onFocus={(e) => {
                                        setStep(1);
                                    }} label="Name" variant="outlined" sx={{ mb: "16px" }} />
                                    <TextField fullWidth id="outlined-basic" value={email} type='text' onFocus={(e) => {
                                        setStep(1);
                                    }} label="Email" variant="outlined" sx={{ mb: "16px" }} />
                                    <TextField fullWidth id="outlined-basic" value={`${day} ${month} ${year}`} type='text' onFocus={(e) => {
                                        setStep(1);
                                    }} label="Birthday" variant="outlined" />
                                </Box >

                                <small className='d-block mt-5' style={{ fontSize: "12px" }}>
                                    By signing up, you agree to the Terms of Service, Privacy Policy and Cookies. Twitter may use your contact information, including your email address and phone number, for the purposes set out in our Privacy Policy, such as keeping your account secure and personalizing our services, including ads. Learn more. Unless you specify otherwise, others can find you when you enter your e-mail and phone number.
                                </small>
                            </div>
                        }

                        {/* button */}
                        {
                            step === 3 ?
                                <MyButton style={{ background: "#1d9bf0" }} onClick={register}>Register</MyButton>
                                :
                                <MyButton
                                    disabled={name && email && password && day && month && year ? false : true}
                                    style={{ background: name && email && password && day && month && year ? '#000' : 'grey' }}
                                    onClick={() => {
                                        setStep(step + 1);
                                    }}>
                                    Next
                                </MyButton>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUpContainer