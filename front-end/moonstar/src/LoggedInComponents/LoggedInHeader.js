import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme();

export default function Header() {
	const [highestIdUser, setHighestIdUser] = useState(null);

	useEffect(() => {
		fetch("http://localhost:8081/users")
			.then(response => response.json())
			.then(data => {
				const maxIdUser = data.reduce((acc, user) => user.id > acc.id ? user : acc);
				setHighestIdUser(maxIdUser);
			})
			.catch(error => {
				console.error("Error fetching user data:", error);
			});
	}, []);

	return (
		<>
			<ThemeProvider theme={defaultTheme}>
				<CssBaseline />
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position='static'>
						<Toolbar>
							<Typography variant='h6' component='div' align='left' sx={{ flexGrow: 1 }}>
								<Link to="/" style={{ textDecoration: 'none' }}>
									<Button sx={{ color: 'white', fontSize: '2rem' }}> M.O.O.N.S.T.A.R.</Button>
								</Link>
							</Typography>
							{highestIdUser && (
								<Typography variant='body1' component='span' sx={{ marginRight: '1rem' }}>
									{highestIdUser.rank} {highestIdUser.first_name} {highestIdUser.last_name}
								</Typography>
							)}
							<Link to="/Home" style={{ textDecoration: 'none' }}>
								<Button sx={{ color: 'white' }}>Log Out</Button>
							</Link>
						</Toolbar>
					</AppBar>
				</Box>
			</ThemeProvider>
		</>
	);
}
