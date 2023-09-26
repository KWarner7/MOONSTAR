import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Autocomplete } from '@mui/material';
import { Link } from 'react-router-dom';
// import Link from '@mui/material/Link';
import LoggedInHeader from './LoggedInComponents/LoggedInHeader.js';
import { useState, useEffect} from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { green } from '@mui/material/colors';


export default function NewTask() {
// const navigate = useNavigate();
// const { showSnackbar } = useSnackbar();


const [error, setError] = useState(null);
const [task, setTask] = useState(null);
const { taskId } = useParams();
const color = green[500];

const { data } = FetchData(`http://localhost:8081/tasks/${taskId}`);
const { data: taskData, error: userError } = FetchData(
	'http://localhost:8081/users'
);

const [taskRequirements, setTaskRequirements] = useState([]);



	useEffect(() => {
		fetch('http://localhost:8081/users')
			.then(response => response.json())
			.then(data => {
				setTask(data);
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

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const taskData = {
			project_name: data.get('Project Name'),
			assigned_by: data.get('Assigned By'),
			assigned_to: data.get('Assigned To'),
			priority: data.get('Priority'),
			due_date_time: data.get('Due Date/Time'),
			project_description: data.get('Project Description'),
		};

		console.log(taskData);

		try {
			const response = await fetch('http://localhost:8081/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(taskData)
			});

			const result = await response.json();

			if (response.ok) {
				console.log("New task posted successfully:", result);
				navigate("/active-projects");
			} else {
				console.error("Error creating new task:", result);
			}

		} catch (error) {
			console.error("There was an error:", error);
		}
	};

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
							{/* <>
								<Autocomplete
									options= taskData || []}
									getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
									value= taskData?.find((user) => user.email === task?.assigned_by)}
									onChange={(event, newValue) => {
										setTask({ ...task, assigned_by: newValue?.email });
									}}
									renderInput={(params) => (
										<TextField {...params} label='Assigned By' variant='outlined' fullWidth />
									)}
								/>
	<br></br>
								<Autocomplete
									options= taskData || []}
									getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
									value= taskData?.find((user) => user.email === task?.assigned_to)}
									onChange={(event, newValue) => {
										setTask({ ...task, assigned_to: newValue?.email });
									}}
									renderInput={(params) => (
										<TextField {...params} label='Assigned To' variant='outlined' fullWidth />
									)}
								/> */}
							{/* </> */}

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