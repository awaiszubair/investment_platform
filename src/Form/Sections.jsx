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
import { useParams } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Call from './Call';

const steps = ['Investment Goals', 'Risk Appetite', 'Investment Experience'];

function Sections() {
    const [sidebarOpen, setSidebarOpen] = useState(false);



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
                        <Call />
                    </div>
                </main>

                {/* <Banner /> */}
            </div>
        </div>
    );
}

export default Sections;

// export default withAuthenticationRequired(Sections)
