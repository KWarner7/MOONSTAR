import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LoggedInHeader from './LoggedInComponents/LoggedInHeader.js';
import { useState, useEffect } from 'react';
import FetchData from './FetchData.js';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Autocomplete from '@mui/material/Autocomplete';
import { useParams } from 'react-router-dom';
import './projectStatus.css';
import { TextareaAutosize } from '@mui/base';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const CardStyle = {
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	borderRadius: '10px',
	borderColor: '#ddd',
	background:
		'linear-gradient(45deg, #B0C4DE 0%, #CFCFCF 40%, #808080 70%, #696969 100%)',
};

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

export default function StatusUpdate() {
	const { taskId } = useParams();
	const navigate = useNavigate();
	const { data, error } = FetchData(`http://localhost:8081/tasks/${taskId}`);
	const { data: userData, error: userError } = FetchData(
		'http://localhost:8081/users'
	);
	const { data: updateData, error: updateError } = FetchData(
		`http://localhost:8081/status-updates/${taskId}`
	);

	const [statusUpdate, setStatusUpdate] = useState([]);
	const [newStatusUpdate, setNewStatusUpdate] = useState('');
	const [task, setTask] = useState(null);
	const [assignedBy, setAssignedBy] = useState('');
	const [assignedByUserId, setAssignedByUserId] = useState(null);
	const [assignedTo, setAssignedTo] = useState('');
	const [assignedToUserId, setAssignedToUserId] = useState(null);

	useEffect(() => {
		if (data && data.length > 0 && userData) {
			setTask(data[0]);

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

	useEffect(() => {
		if (updateData && updateData.length > 0) {
			setStatusUpdate(updateData);
		}
	}, [updateData]);

	async function handleAddStatusUpdate() {
		if (newStatusUpdate.trim() === '') {
			return;
		}

		try {
			const response = await fetch(`http://localhost:8081/status-updates/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					timestamp: new Date().toISOString(),
					update_text: newStatusUpdate,
					task_id: taskId,
				}),
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log('Response:', responseData);

				setNewStatusUpdate('');

				setStatusUpdate((prevStatuses) => [
					...prevStatuses,
					{
						timestamp: new Date().toISOString(),
						update_text: newStatusUpdate,
					},
				]);
			} else {
				console.error('Failed to save status update.');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<Box
				bgcolor="black"
				style={{
					backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_1280.jpg)',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					minHeight: '100%',
					minWidth: '100%',

				}}
			>
				<ThemeProvider theme={defaultTheme}>
					<CssBaseline />
					<AppBar position='relative'>
						<LoggedInHeader />
					</AppBar>
					<main>
						<Box sx={{ bgcolor: 'transparent', pt: 7, pb: 10 }}>
							<Container maxWidth='sm'>
								<Typography
									component='h1'
									variant='h2'
									align='center'
									color='white'
									gutterBottom
								>
									Update Status
								</Typography>

								{task && (
									<Card variant='outlined' sx={CardStyle}>
										<CardContent>
											<Typography variant='h6' sx={{ marginBottom: "6px", fontWeight: "bold" }}>
												{task.task_name}
											</Typography>

											<div className='flexFieldsContainer'>
												<div className='flexField'>
													<FormControl variant='outlined' margin='normal' fullWidth>
														<Autocomplete
															options={userData}
															getOptionLabel={(option) =>
																`${option.first_name} ${option.last_name}`
															}
															value={userData.find(
																(user) => user.id === assignedByUserId
															)}
															renderInput={(params) => (
																<TextField
																	{...params}
																	label='Assigned By'
																	variant='outlined'
																	InputProps={{
																		readOnly: true,
																		style: {
																			cursor: 'default',
																			userSelect: 'none',
																			pointerEvents: 'none',
																			color: 'inherit',
																		},
																	}}
																/>
															)}
														/>
													</FormControl>
												</div>

												<div className='flexField'>
													<FormControl variant='outlined' margin='normal' fullWidth>
														<Autocomplete
															options={userData}
															getOptionLabel={(option) =>
																`${option.first_name} ${option.last_name}`
															}
															value={userData.find(
																(user) => user.id === assignedToUserId
															)}
															renderInput={(params) => (
																<TextField
																	{...params}
																	label='Assigned To'
																	variant='outlined'
																	InputProps={{
																		readOnly: true,
																		style: {
																			cursor: 'default',
																			userSelect: 'none',
																			pointerEvents: 'none',
																			color: 'inherit',
																		},
																	}}
																/>
															)}
														/>
													</FormControl>
												</div>
												<div className='flexField'>
													<FormControl variant='outlined' margin='normal' fullWidth>
														<TextField
															label='Priority'
															value={task.priority}
															InputProps={{
																readOnly: true,
																style: {
																	cursor: 'default',
																	userSelect: 'none',
																	pointerEvents: 'none',
																	color: 'inherit',
																},
															}}
														/>
													</FormControl>
												</div>

												<div className='flexField'>
													<TextField
														margin='normal'
														label='Due By'
														size='large'
														fullWidth
														value={new Date(task.due_date).toLocaleString()}
														InputProps={{
															readOnly: true,
															style: {
																cursor: 'default',
																userSelect: 'none',
																pointerEvents: 'none',
																color: 'inherit',
															},
														}}
													/>
												</div>
											</div>
											<div className='flexDescriptionContainer'>
												<div>
													<CardContent>
														<div
															className='flexDescriptionContainer'
															style={{
																display: 'flex',
																width: '100%',
															}}
														>
															<div
																className='addStatusUpdateContainer'
																style={{
																	width: '40%',
																	paddingRight: '10px',
																}}
															>
																<Typography variant='h6' gutterBottom>
																	Add Status Update
																</Typography>
																<TextField
																	fullWidth
																	label='Add Status Update'
																	variant='outlined'
																	value={newStatusUpdate}
																	onChange={(e) => setNewStatusUpdate(e.target.value)}
																/>
																<Button
																	variant='contained'
																	color='success'
																	fullWidth
																	onClick={handleAddStatusUpdate}
																	sx={{ marginTop: '10px', bgcolor: 'green' }}
																>
																	Save Status Update
																</Button>
																<Button
																	variant='contained'
																	color='error'
																	fullWidth
																	onClick={() => navigate(-1)}
																>
																	Back to Project Details
																</Button>
															</div>
															<div className='statusUpdatesContainer' style={{}}>
																<Typography variant='h6' gutterBottom>
																	Status Updates
																</Typography>
																<div
																	style={{
																		maxHeight: '200px',
																		minWidth: '55%',
																		overflowY: 'auto',
																		padding: '10px',
																		border: '1px solid rgb(0,0,0,0.2)',
																		borderRadius: '5px',
																		wordWrap: 'break-word',
																		overflowWrap: 'break-word',
																		whiteSpace: 'pre-wrap',
																	}}
																>
																	{statusUpdate && statusUpdate.length > 0 ? (
																		[...statusUpdate]
																			.reverse()
																			.map((update, index) => {
																				if (!update || !update.timestamp) return null;
																				return (
																					<div key={index} style={{ marginBottom: '16px' }}>
																						<Typography variant="body2" color="textSecondary">
																							{new Date(update.timestamp).toLocaleString()}
																						</Typography>
																						<Typography variant="body2">
																							{update.update_text}
																						</Typography>
																					</div>
																				);
																			})
																	) : (
																		<Typography variant="body2" color="textSecondary">No updates yet.</Typography>
																	)}
																</div>
															</div>
														</div>
													</CardContent>
												</div>
											</div>
										</CardContent>
									</Card>
								)}
							</Container>
						</Box>
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
				</ThemeProvider>
			</Box>
		</>
	);
}
