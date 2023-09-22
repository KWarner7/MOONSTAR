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
import Autocomplete from '@mui/material/Autocomplete';
import { useParams } from 'react-router-dom';
import './editproject.css';
import './App.css';
import { TextareaAutosize } from '@mui/base';

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

export default function EditProject() {
	const { taskId } = useParams();
	const { data, error } = FetchData(`http://localhost:8081/tasks/${taskId}`);
	const { data: userData, error: userError } = FetchData(
		'http://localhost:8081/users'
	);

	const [taskRequirements, setTaskRequirements] = useState([]);
	const [task, setTask] = useState(null);
	const [assignedBy, setAssignedBy] = useState('');
	const [assignedByUserId, setAssignedByUserId] = useState(null);
	const [assignedTo, setAssignedTo] = useState('');
	const [assignedToUserId, setAssignedToUserId] = useState(null);

	useEffect(() => {
		if (data && data.length > 0 && userData) {
			setTask(data[0]);
			setTaskRequirements(data[0].task_requirement.split(', '));

			const initialAssignedByUser = userData.find(
				(user) =>
					`${user.first_name} ${user.last_name}` ===
					`${data[0].assigned_by_first_name} ${data[0].assigned_by_last_name}`
			);
			const initialAssignedToUser = userData.find(
				(user) =>
					`${user.first_name} ${user.last_name}` ===
					`${data[0].assigned_to_first_name} ${data[0].assigned_to_last_name}`
			);

			if (initialAssignedByUser) {
				setAssignedByUserId(initialAssignedByUser.id);
				setAssignedBy(
					`${initialAssignedByUser.first_name} ${initialAssignedByUser.last_name}`
				);
			}
			if (initialAssignedToUser) {
				setAssignedToUserId(initialAssignedToUser.id);
				setAssignedTo(
					`${initialAssignedToUser.first_name} ${initialAssignedToUser.last_name}`
				);
			}

			const uniqueAssignedByNames = [
				...new Set(
					data.map(
						(item) =>
							`${item.assigned_by_first_name} ${item.assigned_by_last_name}`
					)
				),
			];
			const uniqueAssignedToNames = [
				...new Set(
					data.map(
						(item) =>
							`${item.assigned_to_first_name} ${item.assigned_to_last_name}`
					)
				),
			];

			setAssignedBy(uniqueAssignedByNames[0] || '');
			setAssignedTo(uniqueAssignedToNames[0] || '');
		}
	}, [data, userData]);

	async function handleSave() {
		try {
			const response = await fetch(`http://localhost:8081/tasks/${taskId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					task_name: task.task_name,
					task_description: task.task_description,
					assigned_by: assignedByUserId,
					assigned_to: assignedToUserId,
					task_requirement: taskRequirements.join(', '),
					due_date: task.due_date,
					priority: task.priority,
				}),
			});

			const responseData = await response.json();
			console.log('Response:', responseData);
		} catch (error) {
			console.error('Error:', error);
		}
	}

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
				<Header />
			</AppBar>
			<main>
				<Container>
					<Typography
						component='h1'
						variant='h2'
						align='center'
						color='white'
						gutterBottom
					>
						Edit Project
					</Typography>

					{task && (
						<Card variant='outlined'>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Project "{task.task_name}"
									<TextField
										fullWidth
										label='Project Name'
										margin='normal'
										size='small'
										value={task.task_name}
										onChange={(e) =>
											setTask({ ...task, task_name: e.target.value })
										}
									/>
								</Typography>

								<div className='flexFieldsContainer'>
									<div className='flexField autocompleteAssignedBy'>
										<Autocomplete
											options={userData}
											getOptionLabel={(option) =>
												`${option.first_name} ${option.last_name}`
											}
											value={userData.find(
												(user) => user.id === assignedByUserId
											)}
											onChange={(event, newValue) => {
												setAssignedByUserId(newValue ? newValue.id : null);
												setTask({
													...task,
													assigned_by_first_name: newValue
														? newValue.first_name
														: '',
													assigned_by_last_name: newValue
														? newValue.last_name
														: '',
												});
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													label='Assigned By'
													variant='outlined'
													fullWidth
												/>
											)}
										/>
									</div>
									<div className='flexField autocompleteAssignedTo'>
										<Autocomplete
											options={userData}
											getOptionLabel={(option) =>
												`${option.first_name} ${option.last_name}`
											}
											value={userData.find(
												(user) => user.id === assignedToUserId
											)}
											onChange={(event, newValue) => {
												setAssignedToUserId(newValue ? newValue.id : null);
												setTask({
													...task,
													assigned_to_first_name: newValue
														? newValue.first_name
														: '',
													assigned_to_last_name: newValue
														? newValue.last_name
														: '',
												});
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													label='Assigned To'
													variant='outlined'
												/>
											)}
										/>
									</div>
									<div className='flexField priorityControl'>
										<FormControl variant='outlined' fullWidth>
											<InputLabel>Priority</InputLabel>
											<Select
												label='Priority'
												value={task.priority}
												onChange={(e) =>
													setTask({ ...task, priority: e.target.value })
												}
											>
												<MenuItem value='Low'>Low</MenuItem>
												<MenuItem value='Medium'>Medium</MenuItem>
												<MenuItem value='High'>High</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className='flexField dueDateControl'>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DateTimePicker
												slotProps={{
													textField: { size: 'large' },
												}}
												fullWidth
												label='Due Date/Time'
												value={new Date(task.due_date)}
												onChange={(date) =>
													setTask({ ...task, due_date: date.toISOString() })
												}
											/>
										</LocalizationProvider>
									</div>
								</div>
								<div className='flexDescriptionContainer'>
									<div className='projectDescription'>
										<Typography variant='h6' gutterBottom>
											Project Description
										</Typography>
										<TextareaAutosize
											minRows={6}
											style={{
												fontFamily: 'Arial',
												fontSize: '1rem',
												width: '100%',
												padding: '10px',
												resize: 'vertical',
											}}
											value={task.task_description}
											onChange={(e) =>
												setTask({ ...task, task_description: e.target.value })
											}
										/>
									</div>

									<div className='taskRequirements'>
										<Typography variant='h6' gutterBottom>
											Task Requirements
										</Typography>
										{taskRequirements.map((requirement, index) => (
											<div
												key={index}
												style={{ display: 'flex', alignItems: 'center' }}
											>
												<TextField
													fullWidth
													margin='normal'
													label={`Task Requirement ${index + 1}`}
													variant='outlined'
													value={requirement}
													onChange={(e) => {
														const updatedRequirements = [...taskRequirements];
														updatedRequirements[index] = e.target.value;
														setTaskRequirements(updatedRequirements);
													}}
												/>
												<Button
													variant='contained'
													color='error'
													onClick={() => handleDeleteTaskRequirement(index)}
												>
													Delete
												</Button>
											</div>
										))}
										<Button
											variant='contained'
											color='primary'
											onClick={handleAddTaskRequirement}
										>
											Add Task Requirement
										</Button>
									</div>
								</div>
							</CardContent>
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
