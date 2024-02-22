import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../store/authSlice'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { authService } from '../mysql/auth'
import Img from '../assets/images/pana.png'

function Login() {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    const { register, handleSubmit, watch } = useForm();

    const dispatch = useDispatch();
    useEffect(() => {
        if (authStatus) {
            navigate('/');
        }
    }, [authStatus])

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

        <div style={{
            display: 'flex',
            justifyContent: 'center', alignItems: 'center',
            width: '100%',
            marginTop: '3rem'
        }}>
            <div className='login'>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                    <img src={Img} alt="" />
                </div>
                <form action="" onSubmit={handleSubmit(onSubmit)} >
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
                </form>
            </div>
        </div>
    )
}

export default Login