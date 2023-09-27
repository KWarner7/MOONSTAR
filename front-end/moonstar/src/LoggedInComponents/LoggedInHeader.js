import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4TwoToneIcon from '@mui/icons-material/Brightness4TwoTone';
import { SpinningIcon } from '../Animations';

const defaultTheme = createTheme();

export default function Header() {
	const [highestIdUser, setHighestIdUser] = useState(null);

	useEffect(() => {
		fetch('http://localhost:8081/users')
			.then((response) => response.json())
			.then((data) => {
				const maxIdUser = data.reduce((acc, user) =>
					user.id > acc.id ? user : acc
				);
				setHighestIdUser(maxIdUser);
			})
			.catch((error) => {
				console.error('Error fetching user data:', error);
			});
	}, []);

	return (
		<>
			<ThemeProvider theme={defaultTheme}>
				<CssBaseline />
				<Box sx={{ flexGrow: 1 }}>
					<AppBar
						position='static'
						sx={{
							backgroundImage: 'url(/pexels-visit-greenland-360912.jpg)',
							backgroundSize: 'cover',
							backgroundRepeat: 'repeat',
							backgroundPosition: '50px center',
						}}
					>
						<Toolbar>
							<Typography
								variant='h6'
								component='div'
								align='left'
								sx={{ flexGrow: 1 }}
							>
								<Link to='/Home' style={{ textDecoration: 'none' }}>
									<Button sx={{ color: 'white', fontSize: '2rem' }}>
										<SpinningIcon show={true}>
											<Brightness4TwoToneIcon
												sx={{
													marginRight: '8px',
													fontSize: '3rem',
													filter:
														'drop-shadow(0px 0px 10px rgba(178, 243, 172, 0.9))',
												}}
											/>
										</SpinningIcon>
										<span
											style={{
												color: 'white',
												textShadow: '0px 0px 10px rgba(178, 243, 172, 0.9)',
											}}
										>
											M.O.O.N.S.T.A.R.
										</span>
									</Button>
								</Link>
							</Typography>
							{highestIdUser && (
								<Typography
									variant='body1'
									component='span'
									sx={{
										marginRight: '1rem',
										textShadow: '0px 0px 10px rgba(178, 243, 172, 0.9)',
									}}
								>
									{highestIdUser.rank} {highestIdUser.first_name}{' '}
									{highestIdUser.last_name}
								</Typography>
							)}
							<Link to='/Home' style={{ textDecoration: 'none' }}>
								<Button
									sx={{
										color: 'white',
										textShadow: '0px 0px 10px rgba(178, 243, 172, 0.9)',
									}}
								>
									Log Out
								</Button>
							</Link>
						</Toolbar>
					</AppBar>
				</Box>
			</ThemeProvider>
		</>
	);
}
