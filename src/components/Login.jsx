import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../store/authSlice'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { authService } from '../mysql/auth'
import { useAuth0 } from '@auth0/auth0-react'
import Img from '../assets/images/pana.png'
import Sidebar from '../partials/Sidebar'
import Header from '../partials/Header'
import Illustrate from '../assets/Illustration1.png'
import Right from '../assets/images/Right.png'
import { Container } from '@mui/material'
import axios from 'axios'
import { Try } from '@mui/icons-material'
function Login() {
    const navigate = useNavigate()
    const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const authStatus = useSelector((state) => state.auth.status)

    const { register, handleSubmit, watch } = useForm();

    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/request');
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (isAuthenticated) {
            const calling = async () => {
                try {
                    const response = await axios.post('http://localhost:3000/api/0auth', { user })
                    console.log(response.data);
                    // navigate();
                } catch (error) {
                    console.log(error.message);
                }
            }
            calling();
        }
    }, [isAuthenticated])

    const authToken = async () => {
        if (isAuthorized) {
            try {
                const token = await getAccessTokenSilently();
                console.log(token);
                const response = await axios.post('http://localhost:3000/0auth', { user });
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    async function onSubmit(data) {
        console.log("The data is: ", data);
        try {
            const user = await authService.login(data)
            if (user) {
                dispatch(login())
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <>
            {/* <Header /> */}
            {/* <div style={{
                display: 'flex',
                justifyContent: 'center', alignItems: 'center',
                width: '100%',
                marginTop: '3rem'
            }}>
                <div className='login' sx={{ border: '1px solid black' }}>
                    <div style={{ width: '100%', display: '', justifyContent: 'center', alignItems: 'center', padding: '1rem', height: '400px' }}>
                        <img src={Img} alt="" style={{ height: '100%', width: '100%' }} />
                    </div>
                    <Button
                        variant='contained'
                        onClick={loginWithRedirect}
                        sx={{ marginTop: '1rem', marginLeft: '1rem' }}
                    >
                        Login
                    </Button> */}
            <Container maxWidth='md' sx={{ display: 'flex', padding: '5rem' }}>
                <div style={{ width: '70%' }}>
                    <h1 style={{ color: '', fontSize: '3rem' }}>Invest With Confidence</h1>
                    <h1 style={{ color: 'primary', fontSize: '3rem' }}>Form Essentials</h1>
                    <p style={{ color: '#717171', marginTop: '1rem' }}>Investing in the digital age where the bytes meets bonds</p>
                    <Button
                        variant='contained'
                        onClick={loginWithRedirect}
                        style={{
                            marginTop: '2rem',
                            backgroundColor: 'primary',
                            color: '#YourTextColorHere',
                            padding: '1rem',
                            borderRadius: '0px'
                        }}
                    >
                        {console.log("The Person is: ", isAuthenticated)}
                        <p>Create Account</p> <img src={Right} alt="" />
                    </Button>
                    {/* <Button
                        variant='contained'
                        onClick={authToken}
                        style={{
                            marginTop: '2rem',
                            backgroundColor: 'primary',
                            color: '#YourTextColorHere',
                            padding: '1rem',
                            borderRadius: '0px'
                        }}
                    >
                        <p>Hit Request</p> <img src={Right} alt="" />
                    </Button> */}
                </div>
                <div style={{ width: '30%' }}>
                    <img src={Illustrate} alt="" />
                </div>
            </Container>


            {/* <span>{isAuthenticated ? 'Authorized' : 'Unauthorized'}</span> */}
            {console.log(JSON.stringify(user))}
            {/* <form action="" onSubmit={handleSubmit(onSubmit)} >
                    <div style={{ padding: '2rem', }} className='animate__fadeInLeft'>
                        <TextField

                            id="standard-basic" label="Email" variant="standard"
                            placeholder='Enter valid mail address'
                            style={{
                                margin: '1rem'
                            }}
                            {...register("email", { required: true })}
                        />
                        <br />
                        <TextField
                            id="standard-basic" label="Password" variant="standard"
                            placeholder='Enter password'
                            style={{
                                margin: '1rem'
                            }}
                            type={'password'}
                            {...register("password", { required: true })}
                        />
                        <br />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button
                                variant='contained'
                                type='submit'
                                style={{
                                    margin: '1rem',
                                    backgroundColor: '#4CAF4F',
                                    color: '#YourTextColorHere'
                                }}
                            >
                                Login
                            </Button> <span onClick={() => setregisters(!registers)} style={{ marginRight: '1rem', cursor: 'pointer' }}>registers</span>

                        </div>
                        {console.log(watch())}
                    </div>
                </form> */}
            {/* </div>
            </div> */}
        </>
    )
}

export default Login