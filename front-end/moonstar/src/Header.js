import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4TwoToneIcon from '@mui/icons-material/Brightness4TwoTone';
import { SpinningIcon } from './Animations';

const defaultTheme = createTheme();

export default function Header() {
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
							<Link to='/Signin' style={{ textDecoration: 'none' }}>
								<Button
									sx={{
										color: 'white',
										textShadow: '0px 0px 10px rgba(178, 243, 172, 0.9)',
									}}
								>
									Sign In
								</Button>
							</Link>
						</Toolbar>
					</AppBar>
				</Box>
			</ThemeProvider>
		</>
	);
}
