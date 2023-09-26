import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Autocomplete } from '@mui/material';
import { Link } from 'react-router-dom';
import LoggedInHeader from './LoggedInComponents/LoggedInHeader.js';
import { useState, useEffect } from 'react';
import FetchData from './FetchData.js';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';



function CreateProject() {
	const [task, setTask] = useState({});
	const [taskRequirements, setTaskRequirements] = useState([]);
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);


	useEffect(() => {
		fetch('http://localhost:8081/users')
			.then(response => response.json())
			.then(data => {
				setUserData(data);
			})
			.catch(error => {
				console.error("There was an error fetching the user data:", error);
				setError(error);
			});
	}, []);

	function handleAddTaskRequirement() {
		setTaskRequirements([...taskRequirements, '']);
	}

	function handleDeleteTaskRequirement(index) {
		const updatedRequirements = [...taskRequirements];
		updatedRequirements.splice(index, 1);
		setTaskRequirements(updatedRequirements);
	}

	return (
		<>
			<AppBar position='relative'>
				<LoggedInHeader />
			</AppBar>
			<main>
				<Container maxWidth='sm'>
					<Typography component="h3" variant="h3" align="center" color="white" gutterBottom>
						Create A New Project
					</Typography>

					<Card variant='outlined'>
						<CardContent>
							<TextField
								fullWidth
								label='Project Name'
								margin='normal'
								size='small'
								onChange={e => setTask({ ...task, task_name: e.target.value })}
							/>
							<br></br>
							<>


							<Autocomplete
								options={userData || []}
								getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
								value={userData?.find((user) => user.email === task?.assigned_by)}
								onChange={(event, newValue) => {
									setTask({ ...task, assigned_by: newValue?.email });
								}}
								renderInput={(params) => (
									<TextField {...params} label='Assigned By' variant='outlined' fullWidth />
								)}
							/>
<br></br>
							<Autocomplete
								options={userData || []}
								getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
								value={userData?.find((user) => user.email === task?.assigned_to)}
								onChange={(event, newValue) => {
									setTask({ ...task, assigned_to: newValue?.email });
								}}
								renderInput={(params) => (
									<TextField {...params} label='Assigned To' variant='outlined' fullWidth />
								)}
							/>
						</>

							<FormControl fullWidth variant='outlined' margin='normal'>
								<InputLabel>Priority</InputLabel>
								<Select
									label='Priority'
									value={task?.priority}
									onChange={e => setTask({ ...task, priority: e.target.value })}
								>
									<MenuItem value='Low'>Low</MenuItem>
									<MenuItem value='Medium'>Medium</MenuItem>
									<MenuItem value='High'>High</MenuItem>
								</Select>
							</FormControl>

							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DateTimePicker
									label='Due Date/Time'
									textFieldProps={{ size: 'small' }}
									value={task?.due_date}
									onChange={date => setTask({ ...task, due_date: date })}
								/>
							</LocalizationProvider>

							<TextField
								fullWidth
								margin='normal'
								label='Project Description'
								size='small'
								onChange={e => setTask({ ...task, task_description: e.target.value })}
							/>

							<Typography variant='h6' gutterBottom>
								Task Requirements
							</Typography>
							{taskRequirements.map((req, index) => (
								<div key={index}>
									<TextField
										value={req}
										onChange={e => {
											const newReqs = [...taskRequirements];
											newReqs[index] = e.target.value;
											setTaskRequirements(newReqs);
										}}
									/>
									<Button onClick={() => handleDeleteTaskRequirement(index)}>Delete</Button>
								</div>
							))}
							<Button variant='contained' color='primary' onClick={handleAddTaskRequirement}>
								Add Task Requirement
							</Button>
						</CardContent>

						<CardActions>
							<Link to="/active-projects">
								<Button sx={{ color: 'primary' }} variant="contained"> Cancel</Button>
							</Link>
							<Button variant='contained' fullWidth type='submit' onClick={console.log('save clicked')}>
								Save
							</Button>
						</CardActions>
					</Card>
					<Box sx={{ bgcolor: 'transparent', p: 6 }} component="footer">
						<Typography variant="subtitle1" align="center" color="white" component="p">
							Take your projects to the moon!
						</Typography>
						<Copyright />
					</Box>
				</Container>
			</main>
		</>
	);
}
export default CreateProject;

function Copyright() {
	return (
		<Typography variant="body2" color="white" align="center">
			{'Copyright © '}
			<Link color="rgb(0,0,990,1)" href="https://mui.com/">
				M.O.O.N.S.T.A.R.
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}