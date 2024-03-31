import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth0 } from '@auth0/auth0-react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function Checks() {

    const [data, setData] = useState('');
    const [formData, setFormData] = useState('');
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = user.email
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/link/${email}`)
                console.log("Dt is: ", response.data);
                const dt = response.data.map((dt) => {
                    const id = dt.id
                    const status = dt.update_status;
                    const formData = JSON.parse(dt.data)
                    return { id, formData, status }
                })
                console.log(dt);
                setData(dt);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [])



    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {
                            isAuthenticated && data ? data.map((dt, index) => (
                                <Card key={dt.id} sx={{ minWidth: 275, marginTop: '1rem', cursor: 'pointer' }}
                                    onClick={() => { navigate('/review', { state: { data: data[index] } }) }}
                                >
                                    <CardContent>
                                        <Typography gutterBottom>
                                            Form ID: {dt?.id}
                                        </Typography>
                                        <Typography component="div">
                                            Name: {dt?.formData?.c_name}
                                        </Typography>
                                        <Typography >
                                            <span>Status: </span>
                                            <span style={{ color: dt?.status == 's' && 'green' }}>{dt?.status == 's' ? 'Review Request' : null}</span>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button>Review</Button>
                                    </CardActions>
                                </Card>

                            )) : <h1>No Any Request</h1>
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}

// export default Checks;

export default withAuthenticationRequired(Checks)
