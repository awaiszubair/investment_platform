
import React, { Component, useEffect, useState } from 'react'
import Section from '../Section/Section';
import RadioButtonComponent from '../RadioButtonComponent/RadioButtonComponent';
import TextBoxComponent from '../TextBoxComponent/TextBoxComponent';
import SubSection from '../SubSection/SubSection';
import CheckBoxComponent from '../CheckBoxComponent/CheckBoxComponent';
import { Button, Box, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Stepper } from 'react-form-stepper';
import BulletPointsComponent from '../BulletPointsComponent/BulletPointsComponent';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';
// import { useAuth0 } from '@auth0/auth0-react';
import { useId } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useLocation } from 'react-router-dom';
import { FormatBoldRounded } from '@mui/icons-material';
// import Profile from '../components/Profile/Profile';
import countries from '../../Countries';
// import { Stepper } from '@mui/material';



var times = 0;

function Review() {
    const component = [];
    const [state, setState] = useState(0);
    const [count, setCount] = useState(0);
    const location = useLocation();

    // const { user } = useAuth0();
    const { register, watch, handleSubmit, unregister } = useForm();
    const [buttonState, setButtonState] = useState(false);
    const [link, setLink] = useState('');
    const [formData, setFormData] = useState('');
    const [userData, setUserData] = useState('');
    const [errorFlag, setErrorFlag] = useState(false);
    const [msg, setMsg] = useState(false);
    const { token } = useParams();

    const [questionFlag, setQuestionFlag] = useState('');
    const [broker, setBroker] = useState('');


    useEffect(() => {
        // setFormData(location.state.data.formData)
        const fetch = async () => {
            const id = location.state.data.id;
            try {
                const response = await axios.get(`http://localhost:3000/api/form/data/${id}`)
                console.log(response.data[0].client_data);
                const parse = JSON.parse(response.data[0].client_data)
                console.log("FormData is");
                console.log("FormData: ", parse);
                setFormData(parse)

            } catch (error) {
                console.log(error.message);
            }
        }
        console.log("It is Executed");
        fetch();
    }, [])

    const submit = async (data) => {
        console.log("Times is ", times++);
        console.log("State: ", state);
        if (times === 2) {
            if (errorFlag) {
                try {
                    const data2 = JSON.stringify(data);
                    console.log("The Actual is: ", data);
                    const response = await axios.put('http://localhost:3000/api/link', { id: broker.id, data2 })
                    console.log(response);
                    setMsg(response.data.msg)
                } catch (error) {
                    console.log(error.message);
                }
                return;
            }
            console.log("Data Submitted: ", data);
            setUserData(data)
            setState(state + 1)
            setCount(count + 1)
        }

    }

    useEffect(() => {
        console.log(state)
        if (state === component.length - 1 && errorFlag) {
            return setMsg('Thanks for Submission your form is requested to be reviewed');
        }
    }, [state])

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






    // Section 1
    // Section 1



    // END



    // Section 3
    // Subsection 1

    component.push(
        <>
            <Section heading='Investment objectives'>
                {/* /* {(!formData?.name1 || formData?.name1 === null || formData?.name1 === '') &&  */}
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
                    value={formData?.name1}
                    watch={watch}
                />
                {console.log("The formData 1 is: " + formData?.name1)}
                {console.log("The FormData 2 is: " + formData?.name2)}

                {/* // {formData?.name2 === '' && */}

                {/* {(!formData?.name2 || formData?.name2 === null || formData?.name2 === '') && */}

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
                    watch={watch}
                    register={register}
                    value={formData?.name2}
                    errorFlag={errorFlag}
                    setErrorFlag={setErrorFlag}
                    unregister={unregister}
                />
                {/* } */}
                {/* } */}
                {/* {formData?.name1 && formData?.name2 && <h3 style={{ marginTop: '5rem' }}>This section filled by your broker</h3>} */}
            </Section>
        </>
    )

    // subSection 2

    component.push(
        <Section heading='Tolerance Of Risks'>
            {/* {formData?.name3 === '' && */}

            <RadioButtonComponent
                name='name3'
                question='Imagine that you hold an investment product (or invest through the investment component of life insurance) that naturally fluctuates in market value (its price changes depending on market movements). However, in recent months, the price has not developed according to expected scenarios and your expectations, and it consistently decreases (e.g., minus 25% from the original value). How would you react?'
                options={[
                    'I consider such a decline as an opportunity for further investments at a better price (discount).',
                    'I know that such situations occur in markets, but I also know that declines are usually compensated by growth. I will stick to my planned investment horizon (my original strategy).',
                    "I'm hesitant to push my limits, but I won't rush to sell. I will first gather enough information to make an informed decision.",
                    "Such a development is unacceptable to me; I will sell as soon as the investment declines for the first time.",
                    "OTHER:"
                ]}
                watch={watch}
                register={register}
                // value={location.state.data.formData?.name3}
                value={formData?.name3}



            />
        </Section>
    )


    //  SubSection 3

    component.push(
        <Section heading='Financial Background'>
            {/* {formData?.name4 === '' && */}
            {/* {(!formData?.name4 || formData?.name4 === null || formData?.name4 === '') && */}

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
                watch={watch}
                // value={location.state.data.formData?.name4}
                value={formData?.name4}


            // value={formData?.name4}
            />
            {/* } */}
            {/* {formData?.name5 === '' && */}
            {/* {(!formData?.name5 || formData?.name5 === null || formData?.name5 === '') && */}

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
                // value={formData?.name5}
                // value={location.state.data.formData?.name5}
                value={formData?.name5}


                watch={watch}


            />
            {/* } */}
            {/* {formData?.name6 === '' && */}
            {/* {(!formData?.name6 || formData?.name6 === null || formData?.name6 === '') && */}

            <TextBoxComponent
                name='name6'
                question='What is the amount of your regular expenses (i.e. mortgage, loan, leasing, and others)?'
                label='Enter amount'
                inputProps={true}
                // value={formData?.name5}
                // value={location.state.data.formData?.name6}
                value={formData?.name6}


                register={register}
                watch={watch}
            />
            {/* } */}
            {/* {formData?.name7 === '' && */}
            {/* {(!formData?.name7 || formData?.name7 === null || formData?.name7 === '') && */}

            <TextBoxComponent
                name='name7'
                question='What is the total value of your assets excluding real estate for own housing (i.e. bank deposits, building savings, pension savings, other investments, investment properties, movable assets and others)?'
                label='Enter amount'
                inputProps={true}
                // value={formData?.name5}
                // value={location.state.data.formData?.name7}
                value={formData?.name7}


                register={register}
                watch={watch}
            />
            {/* } */}
            {/* {formData?.name4 && formData?.name4 !== '' && formData?.name5 && formData?.name5 !== '' && formData?.name6 && formData?.name6 !== '' && formData?.name7 !== '' && */}
            {/* <h3 style={{ marginTop: '5rem' }}>This section filled by your broker</h3>} */}
        </Section>
    )
    // END

    // Section 4
    component.push(
        <Section heading='Knowledge'>
            {/* {formData?.name8 === '' && */}
            {/* {(!formData?.name8 || formData?.name8 === null || formData?.name8 === '') && */}

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
                watch={watch}
                // value={formData?.name8}
                // value={location.state.data.formData?.name8}
                value={formData?.name8}



            />
            {/* } */}
            {/* {formData?.name9 === '' && */}
            {/* {(!formData?.name9 || formData?.name9 === null || formData?.name9 === '') && */}

            <RadioButtonComponent
                name='name9'
                question="What are the characteristics of open-end mutual funds?"
                options={[
                    "By diversifying investments into multiple underlying investments.",
                    "Guarantee of return from the fund manager.",
                    "Investor's obligation to maintain a minimum investment horizon of at least 5 years.",
                    "I don't know."
                ]}
                watch={watch}
                register={register}
                // value={formData?.name9}
                // value={location.state.data.formData?.name9}
                value={formData?.name9}



            />
            {/* } */}
            {/* {formData?.name10 === '' && */}
            {/* {(!formData?.name10 || formData?.name10 === null || formData?.name10 === '') && */}

            <RadioButtonComponent
                name='name10'
                question="Do you know what investment-linked life insurance is?"
                options={[
                    "A product that combines life insurance with investment, where the return is usually not guaranteed and loss can occur.",
                    "A savings product where the invested funds are protected against loss",
                    "Don't know."
                ]}
                watch={watch}
                register={register}
                // value={formData?.name10}
                // value={location.state.data.formData?.name10}
                value={formData?.name10}



            />
            {/* } */}

            {/* {formData?.name11 === '' && */}
            {/* {(!formData?.name11 || formData?.name11 === null || formData?.name11 === '') && */}

            <RadioButtonComponent
                name='name11'
                question="If your domestic (reference) currency is CZK, in which case are you generally not exposed to currency exchange risk?"
                options={[
                    "Czech government bonds in CZK.",
                    "Bonds in USD issued by an American bank.",
                    "Bonds in EUR issued by a German company.",
                    "Don't know."
                ]}
                watch={watch}
                register={register}
                // value={formData?.name11}
                // value={location.state.data.formData?.name11}
                value={formData?.name11}



            />

            {/* } */}
            <RadioButtonComponent
                name='name23'
                question="A bond is a valuable security usually associated with the right of an investor to:"
                options={[
                    "receive interest payments (usually annually) and repayment of the nominal value on the maturity date.",
                    "participate in the management of the company through voting at the general meeting, including in the company's profits or losses.",
                    "Don't know."
                ]}
                register={register}
                watch={watch}
                // value={location.state.data.formData?.name23}
                value={formData?.name23}


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
                watch={watch}
                // value={location.state.data.formData?.name24}
                value={formData?.name24}


            />
            {/* {formData?.name9 && formData?.name10 && formData?.name11 && <h3 style={{ marginTop: '5rem' }}>This section filled by your broker</h3>} */}
        </Section>
    )
    // END


    // Section 5
    component.push(
        <Section heading='Investor Profile'>
            {/* {formData?.name12 === '' && */}
            {/* {(!formData?.name12 || formData?.name12 === null || formData?.name12 === '') && */}

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
                watch={watch}
                register={register}
                // value={formData?.name12}
                // value={location.state.data.formData?.name12}
                value={formData?.name12}


            />
            {/* } */}
            {/* {formData?.name13 === '' && */}
            {/* {(!formData?.name13 || formData?.name13 === null || formData?.name13 === '') && */}

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
                watch={watch}
                // value={formData?.name13}
                // value={location.state.data.formData?.name13}
                value={formData?.name13}



            />
            {/* } */}
            {/* {formData?.name14 === '' && */}
            {/* {(!formData?.name14 || formData?.name14 === null || formData?.name14 === '') && */}

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
                watch={watch}
                register={register}
                // value={formData?.name14}
                // value={location.state.data.formData?.name14}
                value={formData?.name14}



            />
            {/* } */}
            {/* {formData?.name15 === '' && */}
            {/* {(!formData?.name15 || formData?.name15 === null || formData?.name15 === '') && */}

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
                watch={watch}
                register={register}
                value={formData?.name15}
            // value={location.state.data.formData?.name15}


            />
            {/* } */}
            {/* {formData?.name12 && formData?.name13 && formData?.name14 && formData?.name15 &&
                <h3 style={{ marginTop: '5rem' }}>This section filled by your broker</h3>
            } */}
        </Section>
    )
    // END

    // Section 6
    component.push(
        <Section heading='Investment Experience'>
            {/* {formData?.name16 === '' && */}
            {/* {(!formData?.name16 || formData?.name16 === null || formData?.name16 === '') && */}

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
                watch={watch}
                register={register}
                value={formData?.name16}
            // value={location.state.data.formData?.name16}


            />
            {/* } */}
            {/* Question20 remaining */}

            {/* Question21 remaining */}

            {/* {formData?.name17 === '' && */}
            {/* {(!formData?.name17 || formData?.name17 === null || formData?.name17 === '') && */}

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
                value={formData?.name17}
                // value={location.state.data.formData?.name17}

                watch={watch}

            />
            {/* } */}
            {formData?.name16 && formData?.name17 && <h3>This section filled by the broker</h3>}
        </Section>
    )
    // END


    // Section 7
    component.push(
        <Section heading='ESG'>
            {/* {formData?.name18 === '' && */}

            <RadioButtonComponent
                name='name18'
                question='Do you prefer investments in companies or projects that prioritize environmental and social responsibility while simultaneously adhering to principles of good governance (often abbreviated as "ESG" or "sustainability")?'
                options={
                    [
                        'Yes',
                        'No'
                    ]
                }
                watch={watch}
                register={register}
                value={formData?.name18}
                // value={location.state.data.formData?.name18}

                questionFlag={questionFlag}
                setQuestionFlag={setQuestionFlag}
            />
            {/* // } */}
            {/* If Question3 is Above question is answered then allow the next below question */}
            {questionFlag &&
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
                        watch={watch}
                        register={register}
                        value={formData?.name19}
                        // value={location.state.data.formData?.name19}

                        questionFlag={questionFlag}
                        setQuestionFlag={setQuestionFlag}
                    />

                </SubSection>
            }
            {questionFlag &&
                <SubSection heading='Question B'>
                    <TextBoxComponent
                        name={'name21'}
                        question="I want to invest in companies whose products generally support sustainability, whether sustainability is or isn't the primary or sole objective of these companies (Regulation of the European Parliament and of the Council (EU) 2019/2088 ('SFDR'))."
                        label='Enter Range between (0-100)'
                        placeholder='Your Answer'
                        register={register}
                        value={formData?.name21}
                    // value={location.state.data.formData?.name21}


                    />
                </SubSection>
            }
            {questionFlag &&
                <SubSection heading={'Question C'}>
                    <TextBoxComponent
                        name='name22'
                        question="I want to invest in companies whose products support sustainability (currently only environmental aspects), based on a detailed classification system according to Regulation of the European Parliament and of the Council (EU) 2020/852 ('EU Taxonomy'). To be considered a sustainable investment product according to EU taxonomy, it must meet 2 basic conditions: contribute to at least one of the PAI objectives and not cause significant harm in other aspects ('no harm to others'), while also ensuring compliance with fundamental human rights and labor standards. It's essentially a stricter version of SFDR, but currently focused solely on the environment."
                        label='Enter Range between (0-100)'
                        placeholder='Your Answer'
                        register={register}
                        value={formData?.name22}
                    // value={location.state.data.formData?.name22}


                    />
                </SubSection>
            }
        </Section>
    )
    // End


    // Final Section


    // component.push(
    //     <Profile data={userData} formData={formData} />
    // )

    const stepperStyle = {
        activeBgColor: '#1565c0',
        completedBgColor: '#90caf9'
    };
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {/*  Site header */}
                    <Header />

                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <Stepper
                                steps={[
                                    { label: 'Basic form' },
                                    { label: 'Knowledge' },
                                    { label: 'Investor Profile' },
                                    { label: 'Investor’s Experience' },
                                    { label: 'ESG' },
                                    { label: 'Profile' }
                                ]
                                }
                                styleConfig={{ ...stepperStyle }}
                                activeStep={count}
                            />
                            <Container maxWidth='lg' >
                                {console.log("ErrorFlag is: ", errorFlag)}
                                {console.log("msg is: ", msg)}

                                <form onSubmit={handleSubmit(submit)} style={{ marginTop: '2rem', marginBottom: '2rem' }} >
                                    {
                                        component[state]
                                    }
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                                        <Button type='button' variant='outlined' disabled={state == 0 ? true : (state === component.length - 1 && true)} onClick={prev}
                                        >Prev</Button>
                                        {state === component.length - 2 ? <Button variant='contained'
                                            disabled={state === component.length - 1 && true}
                                            type='submit'>Confirm</Button> :
                                            !buttonState && <Button type='button' variant='contained'
                                                disabled={state === component.length - 2 && true}
                                                onClick={next}
                                            >Next</Button>
                                        }
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
                        </div>
                    </main>
                </div>
            </div>

        </>
    )
}

export default Review