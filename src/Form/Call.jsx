import React, { Component, useState } from 'react'
import Section from './Section/Section'
import RadioButtonComponent from './RadioButtonComponent/RadioButtonComponent';
import TextBoxComponent from './TextBoxComponent/TextBoxComponent';
import SelectComponent from './SelectComponent/SelectComponent';
import SubSection from './SubSection/SubSection';
import CheckBoxComponent from './CheckBoxComponent/CheckBoxComponent';
import { Button, Box, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Stepper } from 'react-form-stepper';
import BulletPointsComponent from './BulletPointsComponent/BulletPointsComponent';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useId } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import BootstrapDialog from './BootstrapDialog/BootstrapDialog';
import { useEffect } from 'react';
import countries from '../Countries';








// import { Stepper } from '@mui/material';
let times = 0;
function Call() {
    const component = [];
    const [state, setState] = useState(0);
    const [count, setCount] = useState(0);
    const { user } = useAuth0();
    const { register, watch, handleSubmit } = useForm();
    const [buttonState, setButtonState] = useState(false);
    const [link, setLink] = useState('');



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setLink('')
    }, [])

    const generateLink = async (data) => {
        try {
            const formData = data;
            const response = await axios.post('http://localhost:3000/api/link', { id, user, formData })
            console.log(response.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const submit = async (data) => {
        times++
        // try {
        //     const formData = JSON.stringify(data)
        //     const response = await axios.post('http://localhost:3000/api/form', { user, formData })
        //     console.log(response.data);
        //     setButtonState(true)
        // } catch (error) {
        //     console.log(error.message);
        // }
        // if (times == 2) {

        const id = uuidv4();
        try {
            const formData = JSON.stringify(data);
            const response = await axios.post('http://localhost:3000/api/link', { id, user, formData })
            // const sanitizedToken = token.replace(/\./g, '-');
            const tempLink = `http://localhost:5174/${response.data.id}`
            setLink(tempLink)
            console.log(response.data)
        } catch (error) {
            console.log(error.message);
        }
        // }

    }



    const prev = () => {
        if (state === 0) {
            console.log("State is already at 0");
            return; // Exit the function early if already at the first component
        }
        setState(state - 1)
        if (state === 4 || state === 3) {
            return
        }
        setCount(count - 1)
    }
    const next = () => {
        if (state === component.length) {
            return
        }
        setState(state + 1)

        // Include the steps that you want to stop stepper for the subCategories
        if (state === 2 || state === 3) {
            return
        }
        setCount(count + 1)
    }
    console.log(state)







    // END

    // Section 2
    component.push(
        <>
            <Section heading='User Info'>
                <SubSection heading='Client Info'>
                    <TextBoxComponent name='c_name' placeholder='Enter Your Name' label='FullName' register={register} watch={watch} />
                    <RadioButtonComponent heading='Select Gender' name='c_gender' options={['male', 'female']} register={register} watch={watch} />
                    <TextBoxComponent name='c_birth' placeholder='' label='PlaceOfBirth' register={register} watch={watch} />
                    <TextBoxComponent name='c_permanentResidence' placeholder='' label='PermanentResidence' register={register} watch={watch} />
                    <TextBoxComponent type='email' name='c_email' placeholder='' label='Email' register={register} watch={watch} />
                    <TextBoxComponent name='c_phoneNumber' placeholder='' label='PhoneNumber' register={register} watch={watch} />
                    <SelectComponent name='c_nationality' label='Select Country' options={countries} register={register} />
                    <SubSection heading="Address">
                        <TextBoxComponent name='c_documentNumber' placeholder='' label='DocumentNumber' register={register} watch={watch} />
                        <TextBoxComponent name='c_documentIssue' placeholder='' label='DocumentIssuedBy' register={register} watch={watch} />
                        <TextBoxComponent type='Date' name='c_phoneNumber' register={register} />
                    </SubSection>
                    <SelectComponent name='c_taxResidency' label='Tax Residency' options={countries} register={register} />
                    <TextBoxComponent name='c_taxId' placeholder='' label='Tax Id' register={register} watch={watch} />
                    <RadioButtonComponent heading='Copy of Document Obtained' name='c_documentCopy' options={['Yes', 'No']} register={register} watch={watch} />
                    <RadioButtonComponent heading='Politically Exposed Person' name='c_politicalPerson' options={['Yes', 'No']} register={register} watch={watch} />

                </SubSection>
                <SubSection heading='Broker Info'>
                    <TextBoxComponent name='b_name' placeholder='Enter Your Name' label='FullName' register={register} />
                    <RadioButtonComponent heading='Select Gender' name='b_gender' options={['male', 'female']} register={register} watch={watch} />
                    <TextBoxComponent name='b_birth' placeholder='' label='PlaceOfBirth' register={register} />
                    <TextBoxComponent name='b_permanentResidence' placeholder='' label='PermanentResidence' register={register} />
                    <TextBoxComponent type='email' name='b_email' placeholder='' label='Email' register={register} />
                    <TextBoxComponent name='b_phone' placeholder='' label='Phone' register={register} />
                    <SelectComponent name='b_nationality' label='Select Country' options={countries} register={register} />
                    <SubSection heading="Address">
                        <TextBoxComponent name='b_documentNumber' placeholder='' label='DocumentNumber' register={register} />
                        <TextBoxComponent name='b_documentIssue' placeholder='' label='DocumentIssuedBy' register={register} />
                        <TextBoxComponent type='Date' name='c_date' register={register} />
                    </SubSection>
                    <SelectComponent name='b_taxResidency' label='Tax Residency' options={countries} register={register} />
                    <TextBoxComponent name='b_taxId' placeholder='' label='Tax Id' register={register} />
                    <RadioButtonComponent heading='Copy of Document Obtained' name='b_documentCopy' options={['Yes', 'No']} register={register} />
                    <RadioButtonComponent heading='Politically Exposed Person' name='b_politicalPerson' options={['Yes', 'No']} register={register} />

                </SubSection>
            </Section>
        </>
    )
    // End




    // Section 3
    // Subsection 1
    component.push(
        <>
            <Section heading='Investment objectives'>
                <RadioButtonComponent
                    name='name1'
                    question='What investment goals do you plan to achieve?'
                    options={[
                        'I want to grow my invested capital (e.g., by increasing the value of stocks / equity funds, which typically outperforms returns from regular bank deposits by several percentage points in the long term).',
                        'I seek passive income (e.g., through dividends from stocks or interest from bonds).',
                        'I aim to preserve my invested capital to a reasonable extent (e.g., I aim to slightly exceed the returns from regular bank deposits).',
                        'OTHER'
                    ]}
                    register={register}
                />
                <RadioButtonComponent
                    name='name2'
                    question='For how long do you plan to hold the purchased investment products at a minimum?'
                    options={[
                        "I don't know, it depends on the market price development of the investment products (I want to choose according to the situation).",
                        'Long-term, i.e., for more than 5 years, but preferably 8 years or more (I need the invested funds for example in my non-productive age).',
                        'Medium-term, i.e., for a period of 3 to 5 years (e.g., I have medium-term plans that I need to finance subsequently).',
                        "Short-term, i.e., for a period of 1 to 3 years (e.g., I have short-term plans that I need to finance).",
                        "Very short-term, i.e., up to 1 year.",
                        "OTHER"
                    ]}
                    register={register}
                />

            </Section>
        </>
    )

    // subSection 2

    component.push(
        <Section heading='Tolerance Of Risks'>
            <RadioButtonComponent
                name='name3'
                question='Imagine that you hold an investment product (or invest through the investment component of life insurance) that naturally fluctuates in market value (its price changes depending on market movements). However, in recent months, the price has not developed according to expected scenarios and your expectations, and it consistently decreases (e.g., minus 25% from the original value). How would you react?'
                options={[
                    'I consider such a decline as an opportunity for further investments at a better price (discount).',
                    'I know that such situations occur in markets, but I also know that declines are usually compensated by growth. I will stick to my planned investment horizon (my original strategy).',
                    "I'm hesitant to push my limits, but I won't rush to sell. I will first gather enough information to make an informed decision.",
                    "Such a development is unacceptable to me; I will sell as soon as the investment declines for the first time.",
                    "OTHER"
                ]}
                watch={watch}
                register={register}
            />
        </Section>
    )


    //  SubSection 3

    component.push(
        <Section heading='Financial Background'>
            <RadioButtonComponent
                name='name4'
                question='Do you have financial reserves that cover regular expenses (including commitments such as loans, etc.)?'
                options={[
                    'less than 3 months',
                    '3-6 months',
                    "6-12 months",
                    "12 months a více",
                ]}
                register={register}
            />
            <RadioButtonComponent
                name='name5'
                question='What are your main sources of regular income?'
                options={[
                    'Employment.',
                    'Business.',
                    "Yields from investment assets (e.g. regular income, dividends, rents, and others).",
                    "I do not have regular income.",
                    "OTHER"
                ]}
                register={register}
            />
            <TextBoxComponent
                name='name6'
                question='What is the amount of your regular expenses (i.e. mortgage, loan, leasing, and others)?'
                label='Enter amount'
                inputProps={true}
                register={register}
            />
            <TextBoxComponent
                name='name7'
                question='What is the total value of your assets excluding real estate for own housing (i.e. bank deposits, building savings, pension savings, other investments, investment properties, movable assets and others)?'
                label='Enter amount'
                inputProps={true}
                register={register}
            />
        </Section>
    )
    // END

    // Section 4
    component.push(
        <Section heading='Knowledge'>
            <RadioButtonComponent
                name='name8'
                question="An equity fund with an annual return of 8% compared to a money market fund with an annual return of 2% is generally?"
                options={[
                    "More risky.",
                    "The risk is the same.",
                    "Less risky.",
                    "I don't know."
                ]}
                register={register}
            />
            <RadioButtonComponent
                name='name9'
                question="What are the characteristics of open-end mutual funds?"
                options={[
                    "By diversifying investments into multiple underlying investments.",
                    "Guarantee of return from the fund manager.",
                    "Investor's obligation to maintain a minimum investment horizon of at least 5 years.",
                    "I don't know."
                ]}
                register={register}
            />
            <RadioButtonComponent
                name='name10'
                question="Do you know what investment-linked life insurance is?"
                options={[
                    "A product that combines life insurance with investment, where the return is usually not guaranteed and loss can occur.",
                    "A savings product where the invested funds are protected against loss",
                    "Don't know."
                ]}
                register={register}
            />
            <RadioButtonComponent
                name='name11'
                question="If your domestic (reference) currency is CZK, in which case are you generally not exposed to currency exchange risk?"
                options={[
                    "Czech government bonds in CZK.",
                    "Bonds in USD issued by an American bank.",
                    "Bonds in EUR issued by a German company.",
                    "Don't know."
                ]}
                register={register}
            />
            <RadioButtonComponent
                name='name23'
                question="A bond is a valuable security usually associated with the right of an investor to:"
                options={[
                    "receive interest payments (usually annually) and repayment of the nominal value on the maturity date.",
                    "participate in the management of the company through voting at the general meeting, including in the company's profits or losses.",
                    "Don't know."
                ]}
                register={register}
            />
            <RadioButtonComponent
                name='name24'
                question="Stocks are securities that are usually associated with the right of an investor to:"
                options={[
                    "to receive interest payments (usually annually) and to repay the nominal value of the bond on the maturity date.",
                    "to participate in the management of the company through voting at the general meeting, including in the company's profits or losses.",
                    "in a corresponding portion of the assets of a mutual fund that issues mutual fund units.",
                    "I don't know."
                ]}
                register={register}
            />
        </Section>
    )
    // END


    // Section 5
    component.push(
        <Section heading='Investor Profile'>
            <RadioButtonComponent
                name='name12'
                question='Do you have education in financial markets (relevant if not older than 15 years)?'
                options={
                    [
                        "Yes, through investing personal funds or self-study.",
                        "Yes, through studying at a university with a focus on financial markets.",
                        "Yes, by passing a professional exam or course focused on trading investment instruments.",
                        "No"
                    ]
                }
                register={register}
            />
            <RadioButtonComponent
                name='name13'
                question='What is specific about the service of accepting and executing instructions for the purchase, transfer, or sale of an investment?'
                options={
                    [
                        "I decide on submitting the instruction myself, not the intermediary.",
                        "The intermediary decides on submitting the instruction, not me.",
                        "I don't know."
                    ]
                }
                register={register}
            />
            <RadioButtonComponent
                name='name14'
                question='Do you have education in financial markets (relevant if not older than 15 years)?'
                options={
                    [
                        "Yes, through investing personal funds or self-study.",
                        "Yes, through studying at a university with a focus on financial markets.",
                        "Yes, by passing a professional exam or course focused on trading investment instruments.",
                        "No"
                    ]
                }
                register={register}
            />
            <RadioButtonComponent
                name='name15'
                question='Do you have education in financial markets (relevant if not older than 15 years)?'
                options={
                    [
                        "Yes, through investing personal funds or self-study.",
                        "Yes, through studying at a university with a focus on financial markets.",
                        "Yes, by passing a professional exam or course focused on trading investment instruments.",
                        "No"
                    ]
                }
                register={register}
            />
        </Section>
    )
    // END

    // Section 6
    component.push(
        <Section heading='Investment Experience'>
            <RadioButtonComponent
                name='name16'
                question='Have you invested in the past (investing can also be considered as the case of investing in an investment component within life insurance)?'
                options={
                    [
                        "No",
                        "Yes, Regularly",
                        "Yes, Once",
                        "Yes, both regularly and both"
                    ]
                }
                register={register}
            />
            {/* Question20 remaining */}

            {/* Question21 remaining */}

            <RadioButtonComponent
                name='name17'
                question='Do you currently work or have you previously (less than 10 years ago) worked in a field related to investment products (e.g., as an investment advisor, portfolio manager)?'
                options={
                    [
                        'Yes',
                        'No'
                    ]
                }
                register={register}
            />
        </Section>
    )
    // END


    // Section 7
    component.push(
        <Section heading='ESG'>
            <RadioButtonComponent
                name='name18'
                question='Do you prefer investments in companies or projects that prioritize environmental and social responsibility while simultaneously adhering to principles of good governance (often abbreviated as "ESG" or "sustainability")?'
                options={
                    [
                        'Yes',
                        'No'
                    ]
                }
                register={register}
            />

            {/* If Question3 is Above question is answered then allow the next below question */}
            <SubSection heading='Question A'>
                <CheckBoxComponent
                    name='name19'
                    question='I want to invest in companies that generally consider at least one specific indicator (such as measuring carbon footprint, generating energy from renewable sources, emissions into water sources, or ratio of hazardous waste) in accordance with Commission Delegated Regulation (EU) 2022/1288 ("PAI"). Select Specific Indicators'
                    options={
                        [
                            'Greenhouse Gas Emissions',
                            " Biodiversity",
                            "Water",
                            "Fossil Fuels",
                            " Energy Self-Sufficiency",
                            "Social and Employee Matters."
                        ]
                    }
                    register={register}
                />
            </SubSection>
            <SubSection heading='Question B'>
                <TextBoxComponent
                    name={'name21'}
                    question="I want to invest in companies whose products generally support sustainability, whether sustainability is or isn't the primary or sole objective of these companies (Regulation of the European Parliament and of the Council (EU) 2019/2088 ('SFDR'))."
                    label='Enter Range between (0-100)'
                    placeholder='Your Answer'
                    register={register}
                />
            </SubSection>
            <SubSection heading={'Question C'}>
                <TextBoxComponent
                    name='name22'
                    question="I want to invest in companies whose products support sustainability (currently only environmental aspects), based on a detailed classification system according to Regulation of the European Parliament and of the Council (EU) 2020/852 ('EU Taxonomy'). To be considered a sustainable investment product according to EU taxonomy, it must meet 2 basic conditions: contribute to at least one of the PAI objectives and not cause significant harm in other aspects ('no harm to others'), while also ensuring compliance with fundamental human rights and labor standards. It's essentially a stricter version of SFDR, but currently focused solely on the environment."
                    label='Enter Range between (0-100)'
                    placeholder='Your Answer'
                    register={register}
                />
            </SubSection>
        </Section>
    )
    // End


    // Final Section
    component.push(
        <Section heading='Final Statement'>
            <BulletPointsComponent
                points={
                    [
                        'By signing or confirming this investment questionnaire as a (potential) Client, you acknowledge, agree, and confirm that:',
                        'You have understood the content of the investment questionnaire and that the information provided by you is true, complete, and without distortion;',
                        "Before investing, it is generally recommended to always have a minimum of 3 months' financial reserves to cover your regular expenses;",
                        "Investing is generally associated with the fact that the return of the originally invested amount is not guaranteed, nor is it certain that the value of the invested amount will increase in the future or that the investment goals will be achieved;"
                    ]
                }
            />
        </Section>
    )


    const stepperStyle = {

        activeBgColor: '#1565c0',
        completedBgColor: '#90caf9'
    };
    return (
        <>
            <Stepper

                steps={[
                    { label: 'User Information' },
                    { label: 'Basic form' },
                    { label: 'Knowledge' },
                    { label: 'Investor Profile' },
                    { label: 'Investor’s Experience' },
                    { label: 'ESG' },
                    { label: 'Final statements' },
                ]
                }
                styleConfig={{ ...stepperStyle }}
                activeStep={count}
            />
            <Container maxWidth='lg' >

                <form onSubmit={handleSubmit(submit)} >
                    {
                        component[state]
                    }
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type='button' variant='outlined' disabled={state == 0 && true} onClick={prev}
                        >Prev</Button>
                        <Box>
                            <Button
                                type='submit'
                                variant='contained'
                                onClick={handleClickOpen}
                                sx={{ marginRight: '1rem' }}
                            >Share</Button>
                            {state === component.length - 1 ? <Button variant='contained' onClick={handleClickOpen} type='submit'>Confirm</Button> :
                                !buttonState && <Button type='button' variant='contained'
                                    onClick={next}
                                >Next</Button>
                            }

                        </Box>
                        {/* <Button variant="outlined" onClick={handleClickOpen}>
                            Copy Link
                        </Button> */}
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                Copy Link
                            </DialogTitle>
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
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    {link}
                                </Typography>

                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    Close
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>




                        {/* {buttonState &&
                            <Button
                                variant='contained'
                                type='Submit'
                            >
                                Share
                            </Button>} */}
                    </Box>
                </form>

            </Container>
        </>
    )
}

export default Call