import logo from './logo.svg';
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

function App() {
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/active-projects' element={<ActiveProjects />} />
						<Route path='/completed-projects' element={<CompletedProjects />} />
						<Route path='/edit-project' element={<EditProject />} />
						<Route path='/create-project' element={<CreateProject />} />
						<Route path='/project-status' element={<StatusUpdate />} />
					</Routes>
				</header>
			</div>
		</Router>
	);
}

export default App;
