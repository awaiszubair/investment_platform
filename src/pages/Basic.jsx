import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import Banner from '../partials/Banner';

function Basic() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Define your own data
    const rows = [
        { id: 1, username: 'John', email: 'john@example.com', country: 'USA', age: 30 },
        { id: 2, username: 'Alice', email: 'alice@example.com', country: 'Canada', age: 25 },
        { id: 3, username: 'Junaid', email: 'junaid@example.com', country: 'Pakistan', age: 32 },
        { id: 4, username: 'Awais', email: 'awais@example.com', country: 'Pakistan', age: 30 },
        { id: 5, username: 'Rahul', email: 'rahul@example.com', country: 'Canada', age: 30 },

        // Add more rows as needed
    ];

    // Define columns for the DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'country', headerName: 'Country', width: 150 },
        { field: 'age', headerName: 'Age', width: 90 },
    ];

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
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            {/* Left: Avatars */}
                            {/* <DashboardAvatars /> */}

                            {/* Right: Actions */}
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                {/* Filter button */}
                                <FilterButton />
                                {/* Datepicker built with flatpickr */}
                                <Datepicker />
                                {/* Add view button */}
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="hidden xs:block ml-2">Add view</span>
                                </button>
                            </div>
                        </div>

                        {/* DataGrid */}
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns} pageSize={5} />
                        </div>
                    </div>
                </main>

                {/* <Banner /> */}
            </div>
        </div>
    );
}

export default Basic;
