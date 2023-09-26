import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoggedInHeader from './LoggedInComponents/LoggedInHeader.js';
import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const defaultTheme = createTheme();

export default function ActiveProjects() {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const [tasks, setTasks] = useState([]);
	const [statusUpdates, setStatusUpdates] = useState([]);
	const [filters, setFilters] = useState({
		assignedTo: 'all',
		assignedBy: 'all',
	});
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const closeMenu = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		async function fetchData() {
			const [tasksResponse, statusUpdatesResponse, userResponse] =
				await Promise.all([
					fetch('http://localhost:8081/tasks'),
					fetch('http://localhost:8081/status-updates'),
					fetch('http://localhost:8081/users'),
				]);

			const tasksData = await tasksResponse.json();
			const statusUpdatesData = await statusUpdatesResponse.json();

			setTasks(tasksData);
			setStatusUpdates(statusUpdatesData);
		}

		fetchData();
	}, []);

	const assignedToNames = [
		...new Set(
			tasks.map(
				(task) => task.assigned_to_first_name + ' ' + task.assigned_to_last_name
			)
		),
	];
	console.log(assignedToNames);
	const assignedByNames = [
		...new Set(
			tasks.map(
				(task) => task.assigned_by_first_name + ' ' + task.assigned_by_last_name
			)
		),
	];

	const handleFilterChange = (type, value) => {
		setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
	};

	const filteredTasks = tasks.filter((task) => {
		const assignedToName =
			task.assigned_to_first_name + ' ' + task.assigned_to_last_name;
		const assignedByName =
			task.assigned_by_first_name + ' ' + task.assigned_by_last_name;
		const taskDueDate = new Date(task.due_date);

		if (filters.assignedTo !== 'all' && assignedToName !== filters.assignedTo)
			return false;
		if (filters.assignedBy !== 'all' && assignedByName !== filters.assignedBy)
			return false;
		if (startDate && taskDueDate < new Date(startDate)) return false;
		if (endDate && taskDueDate > new Date(endDate)) return false;

		return true;
	});

	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<AppBar position='relative'>
				<LoggedInHeader />
			</AppBar>
			<main>
				<Box sx={{ bgcolor: 'transparent', pt: 2, pb: 1 }}>
					<Container maxWidth='sm'>
						<Typography
							component='h1'
							variant='h3'
							align='center'
							color='white'
							gutterBottom
						>
							Active Projects
						</Typography>
						<Button
							onClick={openMenu}
							startIcon={<FilterListIcon color='primary' />}
							color='inherit'
						>
							Filter
						</Button>

						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={closeMenu}
						>
							<Grid
								container
								spacing={2}
								style={{
									backgroundColor: 'white',
									padding: '8px',
									maxHeight: '500px',
									overflowY: 'auto',
								}}
							>
								<Grid item xs={6} style={{ maxWidth: '200px' }}>
									<FormControl variant='outlined' fullWidth margin='normal'>
										<InputLabel>Assigned To</InputLabel>
										<Select
											value={filters.assignedTo}
											onChange={(event) =>
												handleFilterChange('assignedTo', event.target.value)
											}
										>
											<MenuItem value={'all'}>All</MenuItem>
											{assignedToNames.map((name) => (
												<MenuItem key={name} value={name}>
													{name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={6} style={{ maxWidth: '200px' }}>
									<FormControl variant='outlined' fullWidth margin='normal'>
										<InputLabel>Assigned By</InputLabel>
										<Select
											value={filters.assignedBy}
											onChange={(event) =>
												handleFilterChange('assignedBy', event.target.value)
											}
										>
											<MenuItem value={'all'}>All</MenuItem>
											{assignedByNames.map((name) => (
												<MenuItem key={name} value={name}>
													{name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={12} style={{ marginTop: '16px' }}>
									<Typography>Due Date</Typography>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<label htmlFor='start-date' style={{ marginRight: '8px' }}>
											Start Date:
										</label>
										<input
											type='date'
											id='start-date'
											value={startDate} // Assuming you manage this in a state
											onChange={(e) => setStartDate(e.target.value)}
											style={{ marginRight: '16px' }}
										/>

										<label htmlFor='end-date' style={{ marginRight: '8px' }}>
											End Date:
										</label>
										<input
											type='date'
											id='end-date'
											value={endDate} // Assuming you manage this in a state
											onChange={(e) => setEndDate(e.target.value)}
										/>
									</div>
								</Grid>
							</Grid>
							<Button variant='contained' color='primary' onClick={closeMenu}>
								Show Results
							</Button>
						</Menu>
					</Container>
					<Stack direction='row' spacing={2} justifyContent='center'>
						<Link to='/create-project' style={{ textDecoration: 'none' }}>
							<Button variant='contained'>Create New Project</Button>
						</Link>
					</Stack>
				</Box>
				<Container
					sx={{
						py: 1,
						border: '1px solid #ffffff',
						maxHeight: '600px',
						overflowY: 'auto',
						padding: '2rem',
					}}
					maxWidth='lg'
				>
					<Grid container spacing={4}>
						{filteredTasks.map((task, index) => {
							if (task.is_active) {
								return (
									<Grid item key={task.id} xs={12}>
										<Link
											to={`/project-details/${task.id}`}
											style={{ textDecoration: 'none', width: '100%' }}
										>
											<Card
												sx={{
													height: '100%',
													display: 'flex',
													flexDirection: 'column',
												}}
												elevation={3}
											>
												<CardContent sx={{ flexGrow: 1 }}>
													<Grid container spacing={2}>
														<Container>
															<Typography
																variant='body2'
																color='textSecondary'
																component='p'
															>
																Creation Date: {task.creation_date}{' '}
																-------------- Due Date: {task.due_date}
															</Typography>
															<Typography
																sx={{
																	fontSize: '2rem',
																	textDecoration: 'underline',
																}}
																gutterBottom
																variant='h7'
																component='h2'
																align='left'
															>
																{task.task_name}
															</Typography>
														</Container>
														<Grid item xs={4}>
															<Container
																sx={{
																	border: '1px solid #000',
																	p: 6,
																	maxHeight: '200px',
																	overflowY: 'auto',
																}}
																align='left'
															>
																<Typography>{task.task_description}</Typography>
															</Container>
															<Container>
																<Typography
																	gutterBottom
																	variant='h5'
																	component='h2'
																	align='center'
																>
																	Description
																</Typography>
															</Container>
														</Grid>
														<Grid item xs={8}>
															<Container
																sx={{
																	border: '1px solid #000',
																	p: 6,
																	maxHeight: '200px',
																	overflowY: 'auto',
																}}
																align='left'
															>
																{statusUpdates
																	.filter(
																		(update) => update.task_id === task.id
																	)
																	.map((update) => (
																		<Typography key={update.id}>
																			{update.timestamp}: {update.update_text}
																		</Typography>
																	))}
															</Container>
															<Container align='center'>
																<Typography
																	gutterBottom
																	variant='h5'
																	component='h2'
																	align='center'
																>
																	Status Updates
																</Typography>
															</Container>
														</Grid>
													</Grid>
												</CardContent>
											</Card>
										</Link>
									</Grid>
								);
							}
							return null;
						})}
					</Grid>
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
				<Typography variant='body2' color='white' align='center'>
					{'Copyright © '}
					<a
						href='https://mui.com/'
						target='_blank'
						rel='noopener noreferrer'
						style={{ color: 'rgb(0,0,990,1)' }}
					>
						M.O.O.N.S.T.A.R.
					</a>{' '}
					{new Date().getFullYear()}
				</Typography>
			</Box>
		</ThemeProvider>
	);
}
