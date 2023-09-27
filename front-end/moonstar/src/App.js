import React, { useRef, useState } from 'react';
import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage.js';
import Login from './Login.js';
import ActiveProjects from './ActiveProjects.js';
import CompletedProjects from './CompletedProjects.js';
import EditProject from './EditProject';
import Signup from './Signup.js';
import CreateProject from './CreateProject.js';
import StatusUpdate from './StatusUpdate';
import ProjectDetails from './ProjectDetails.js';
import { SnackbarProvider } from './SnackbarContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LoggedOutHomePage from './LoggedInComponents/LoggedOutHomePage.js';



function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
   <SnackbarProvider>
		<Router>
			<div className='App'>
				<header className='App-header'>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/Signin' element={<Login />} />
						<Route path='/Signup' element={<Signup />} />
						<Route path='/active-projects' element={<ActiveProjects />} />
						<Route path='/completed-projects' element={<CompletedProjects />} />
						<Route path='/edit-project/:taskId' element={<EditProject />} />
						<Route path='/create-project' element={<CreateProject />} />
						<Route path='/project-status/:taskId' element={<StatusUpdate />} />
						<Route path='/project-details/:id' element={<ProjectDetails />} />
						<Route path='/Home' element={<LoggedOutHomePage />} />
					</Routes>
				</header>
			</div>
		</Router>
  </SnackbarProvider>
		</LocalizationProvider>
	);
}

export default App;