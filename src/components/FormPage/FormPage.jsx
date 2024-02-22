import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, } from '@mui/material';
import FirstPage from '../FirstPage/FirstPage';
import SecondPage from '../SecondPage/SecondPage';
import ThirdPage from '../ThirdPage/ThirdPage';
import { useForm } from "react-hook-form"
import Input from '../../components/Input';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import axios from 'axios';
import config from '../../Config_array';
import { useState } from 'react';

const steps = ['Investment', 'Goal', 'Asset'];

export default function HorizontalLinearStepper() {

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
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    React.useEffect(() => { console.log("Parent component re-rendering") }, [activeStep])
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

    React.useEffect(() => {
        if (activeStep == steps.length) {
            const hell = async () => {
                try {
                    var token = localStorage.getItem('token');
                    // axios.defaults.headers.common['x-auth-token'] = token;
                    console.log(token)
                    const response = await axios.post('http://localhost:3000/api/form', { config },
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        })
                    if (response) {
                        console.log(response.data);
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            hell();
        }

    }, [activeStep])

    return (
        <Container maxWidth="md" sx={{ padding: '2rem' }}>
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
                        {activeStep === 0 && <QuestionForm handleInputChange={handleInputChange} inputValues={inputValues} isactive={activeStep} />}
                        {activeStep === 1 && <QuestionForm handleInputChange={handleInputChange} inputValues={inputValues} isactive={activeStep} />}
                        {activeStep === 2 && <ThirdPage register={register} />}
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
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button variant="contained" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Container>
    );
}