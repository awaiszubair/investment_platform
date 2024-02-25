import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { formService } from '../mysql/form';
import { Container } from '@mui/material';
import { useForm } from 'react-hook-form'
import pointsChecker from '../../src/Points_array';
import PdfGeneration from '../components/PdfGeneration/PdfGeneration';
import { pdf } from '@react-pdf/renderer';
import QuestionForm from '../components/QuestionForm/QuestionForm';

const steps = ['Investment Goals', 'Risk Appetite', 'Investment Experience'];

function Request() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loader, setLoader] = useState(true);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [inputValues, setInputValues] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const searchForm = async () => {
        try {
            const data = await formService.fetchForm(search)
            if (data) {
                setLoader(false)
            }
            setData(data);

        } catch (error) {
            console.log(error)
        }
    }

    const mailPdf = async () => {
        if (activeStep == steps.length - 1) {
            const userData = pointsChecker(inputValues);
            // console.log("Pointing the points: ", userData);
            console.log("The input Values is: ", inputValues);
            try {
                const blob = await pdf(<PdfGeneration data={userData} inputValues={inputValues} />).toBlob();
                const pdfFile = new File([blob], 'document.pdf', { type: 'application/pdf' });
                const formData = new FormData();
                formData.append('pdfFile', pdfFile);
                formData.append('userData', JSON.stringify(userData));
                formData.append('email', JSON.stringify(search))
                const response = await fetch('http://localhost:3000/api/mail/broker', {
                    method: 'POST',
                    headers: {
                        'x-auth-token': localStorage.getItem('token') // Replace 'your-auth-token-value' with your actual token
                    },
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error('Failed to upload PDF file');
                }
                console.log('PDF file uploaded successfully');
            } catch (error) {
                console.error('Error uploading PDF:', error);
            }
        }
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Welcome banner */}
                        <WelcomeBanner />

                        {/* Dashboard actions */}


                        <Box>
                            <TextField
                                variant='filled'
                                id="outlined-basic"
                                label={"search"}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <Button variant='contained' sx={{ margin: '1rem' }}
                                onClick={searchForm}
                            >Search</Button>
                            {console.log(data)}
                        </Box>
                        {
                            data && <Container maxWidth="md" sx={{ padding: '2rem' }}>
                                <Box sx={{ width: '100%' }}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            const stepProps = {};
                                            const labelProps = {};
                                            if (isStepOptional(index)) {
                                                labelProps.optional = (
                                                    <Typography variant="caption"></Typography>
                                                );
                                            }
                                            if (isStepSkipped(index)) {
                                                stepProps.completed = false;
                                            }
                                            return (
                                                <Step key={label} {...stepProps}>
                                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    {activeStep === steps.length ? (
                                        <React.Fragment>
                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                All steps completed - you&apos;re finished
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <Button onClick={handleReset}>Reset</Button>
                                            </Box>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                                            {activeStep == 0 && <QuestionForm handleInputChange={handleInputChange} inputValues={inputValues} isactive={activeStep} data={data} setInputValues={setInputValues} />}
                                            {activeStep && <QuestionForm handleInputChange={handleInputChange} inputValues={inputValues} isactive={activeStep} data={data} setInputValues={setInputValues} />}

                                            {/* {activeStep === 2 && <ThirdPage register={register} />} */}
                                            {console.log(watch())}
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Button
                                                    color="inherit"
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                                <Box sx={{ flex: '1 1 ' }} />

                                                <Button variant="contained" onClick={() => { handleNext(); mailPdf() }}>
                                                    {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                                                </Button>

                                            </Box>
                                        </React.Fragment>
                                    )}
                                </Box>
                            </Container>



                        }
                    </div>
                </main>

                {/* <Banner /> */}
            </div>
        </div>
    );
}

export default Request;
