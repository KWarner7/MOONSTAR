import * as React from 'react';
import {
	TextField,
	Button,
	Grid,
	Box,
	Container,
	Typography,
	ThemeProvider,
	MenuItem,
	Select,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LoggedInHeader from './LoggedInComponents/LoggedInHeader.js';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { useSnackbar } from './SnackbarContext';
import { Link } from 'react-router-dom';

const CardStyle = {
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	transition: '0.3s',
	borderRadius: '10px',
	borderColor: '#ddd',
	background:
		'linear-gradient(45deg, #B0C4DE 0%, #CFCFCF 40%, #808080 70%, #696969 100%)',
};

const defaultTheme = createTheme({
	palette: {
		primary: {
			main: '#000000',
		},
		secondary: {
			main: '#000000',
		},
	},
});

function CreateTask() {
	const navigate = useNavigate();
	const { showSnackbar } = useSnackbar();
	const [usersData, setUsersData] = React.useState([]);
	const [assignedTo, setAssignedTo] = React.useState('');
	const [assignedBy, setAssignedBy] = React.useState('');
	const [priority, setPriority] = React.useState('');

	React.useEffect(() => {
		// Fetch user data from the API
		const fetchUsersData = async () => {
			try {
				const response = await fetch('http://localhost:8081/users');
				const data = await response.json();
				setUsersData(data);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUsersData();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const currentDate = new Date(); // Get the current date and time
		const taskData = {
			task_name: data.get('task_name'),
			task_description: data.get('task_description'),
			task_requirement: data.get('task_requirement'),
			creation_date: currentDate.toISOString(), // Convert to ISO string format
			due_date: data.get('due_date'),
			completion_date: null,
			is_active: true,
			priority: data.get('priority'),
			assigned_to: parseInt(assignedTo),
			assigned_by: parseInt(assignedBy),
		};

		try {
			const response = await fetch('http://localhost:8081/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(taskData),
			});

			if (response.ok) {
				const newTask = await response.json();

				console.log('Task created successfully:', newTask);

				navigate(`/active-projects`);
				setTimeout(() => {
					showSnackbar('Project Created Successfully!');
				}, 500);
			} else {
				const errorData = await response.json();

				console.error('Error creating task:', errorData);
			}
		} catch (error) {
			console.error('There was an error:', error);
		}
	};

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
				<Box sx={{ bgcolor: 'transparent', pt: 2, pb: 1 }}>
					<Container maxWidth='sm'>
				<Typography component='h1' variant='h4' align='center'>
					Create New Task
				</Typography>
				<Box
					component='form'
					noValidate
					onSubmit={handleSubmit}
					sx={{
						bgcolor: 'white',
						mt: 3,
						borderRadius: '10px',
						padding: '15px',
						...CardStyle,
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='task_name'
								label='Task Name'
								name='task_name'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='task_description'
								label='Task Description'
								name='task_description'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='task_requirement'
								label='Task Requirement'
								name='task_requirement'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								type='datetime-local'
								id='due_date'
								label='Due Date'
								name='due_date'
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography
								component='h1'
								variant='h6'
								align='left'
								color='black'
							>
								Priority
							</Typography>
							<Select
								required
								fullWidth
								id='priority'
								label='Priority'
								name='priority'
								InputLabelProps={{
									shrink: true,
								}}
								value={priority}
								onChange={(event) => setPriority(event.target.value)}
							>
								<MenuItem value='Low'>Low</MenuItem>
								<MenuItem value='Medium'>Medium</MenuItem>
								<MenuItem value='High'>High</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12}>
							<Typography
								component='h1'
								variant='h6'
								align='left'
								color='black'
							>
								Assigned To
							</Typography>
							<Select
								required
								fullWidth
								id='assignedTo'
								label='Assigned To'
								name='assignedTo'
								InputLabelProps={{
									shrink: true,
								}}
								value={assignedTo}
								onChange={(event) => setAssignedTo(event.target.value)}
							>
								{usersData.map((user) => (
									<MenuItem key={user.id} value={user.id}>
										{user.rank} {user.first_name} {user.last_name}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12}>
							<Typography
								component='h1'
								variant='h6'
								align='left'
								color='black'
							>
								Assigned By
							</Typography>
							<Select
								required
								fullWidth
								id='assignedBy'
								label='Assigned By'
								name='assignedBy'
								InputLabelProps={{
									shrink: true,
								}}
								value={assignedBy}
								onChange={(event) => setAssignedBy(event.target.value)}
							>
								{usersData.map((user) => (
									<MenuItem key={user.id} value={user.id}>
										{user.rank} {user.first_name} {user.last_name}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>

					<Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
						Create Task
					</Button>
					<Button
						variant='contained'
						sx={{ mt: 3, mb: 2, ml: 2, color: 'red' }}
						onClick={() => navigate(-1)}
					>
						Cancel
					</Button>
				</Box>
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
function Copyright() {
	return (
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
			{'.'}
		</Typography>
	);
}

export default CreateTask;
