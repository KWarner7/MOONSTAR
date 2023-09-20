import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Header from './Header.js';
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
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

function Copyright() {
	return (
		<Typography variant='body2' color='white' align='center'>
			{'Copyright © '}
			<Link color='rgb(0,0,990,1)' href='https://mui.com/'>
				M.O.O.N.S.T.A.R.
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}


export default function CreateProject() {
    const { data, error } = FetchData('http://localhost:8081/tasks/1');
	const [taskRequirements, setTaskRequirements] = useState([]);
	const [task, setTask] = useState(null);

	useEffect(() => {
		if (data) {
			setTask(data[0]);
			setTaskRequirements(data[0].task_requirement.split(', '));
		}
	}, [data]);

	async function handleSave() {
		try {
			const response = await fetch(`http://localhost:8081/tasks/1`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					task_name: task.task_name,
					task_description: task.task_description,
					assigned_to: task.assigned_to,
					task_requirement: taskRequirements.join(', '),
					due_date: task.due_date,
					priority: task.priority,
				}),
			});

			const data = await response.json();
			console.log('Response:', data);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	function handleAddTaskRequirement() {
		setTaskRequirements([...taskRequirements, '']);
	}

	function handleDeleteTaskRequirement() {
		const updatedRequirements = [...taskRequirements];
		updatedRequirements.splice(1);
		setTaskRequirements(updatedRequirements);
	}

	return (
		<>
			<AppBar position='relative'>
				<Header />
			</AppBar>
			<main>
				<Container maxWidth='sm'>
					<Typography
						component='h1'
						variant='h2'
						align='center'
						color='text.primary'
						gutterBottom
					> 
                    <Typography
                      component="h3"
                      variant="h3"
                      align="center"
                      color="white"
                      gutterBottom
                    >
                      Create A New Project
                    </Typography>
					</Typography>

					{(
						<Card variant='outlined'>
							<CardContent>
								<Typography variant='h6' gutterBottom>

									<TextField
										fullWidth
										label='Project Name'
										margin='normal'
										size='small'
									/>
									<Typography variant='body2' gutterBottom>
										<TextField
											fullWidth
											margin='normal'
											size='small'
											label='Assigned By'
											onChange={(e) => {
												const fullName = e.target.value;
												const [first_name, last_name] = fullName.split(' ');
											}}
										/>
									</Typography>
									<Typography variant='body2' gutterBottom>
										<TextField
											fullWidth
											margin='normal'
											size='small'
											label='Assigned To'
											onChange={(e) => {
												const fullName = e.target.value;
												const [first_name, last_name] = fullName.split(' ');
											}}
										/>
									</Typography>
									<FormControl fullWidth variant='outlined' margin='normal'>
										<InputLabel>Priority</InputLabel>
										<Select
											label='Priority'
										>
											<MenuItem value='Low'>Low</MenuItem>
											<MenuItem value='Medium'>Medium</MenuItem>
											<MenuItem value='High'>High</MenuItem>
										</Select>
									</FormControl>
									<Typography variant='body1' gutterBottom>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DateTimePicker
												label='Due Date/Time'
												textFieldProps={{
													size: 'small',
												}}
											/>
										</LocalizationProvider>
									</Typography>
								</Typography>
								<Typography variant='h6' gutterBottom>
									<TextField
										fullWidth
										margin='normal'
										label='Project Description'
										size='small'
									/>
								</Typography>
							</CardContent>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Task Requirements
								</Typography>
								<Button
									variant='contained'
									color='primary'
								>
									Add Task Requirement
								</Button>
							</CardContent>
                            <Link to="/active-projects">
							<Button sx={{ color: 'primary'}} variant= "contained"> Cancel</Button>
						</Link>
							<CardActions>
								<Button
									variant='contained'
									fullWidth
									type='submit'
									onClick={handleSave}
								>
									Save
								</Button>
							</CardActions>
						</Card>
					)}
				</Container>
			</main>
			<Box sx={{ bgcolor: 'transparent', p: 6 }} component='footer'>
				<Typography
					variant='subtitle1'
					align='center'
					color='white'
					component='p'
				>
					Take your projects to the moon!
				</Typography>
				<Copyright />
			</Box>
		</>
	);
}