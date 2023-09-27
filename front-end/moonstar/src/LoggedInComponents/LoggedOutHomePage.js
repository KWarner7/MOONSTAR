import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Header from '../Header.js';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4TwoToneIcon from '@mui/icons-material/Brightness4TwoTone';
import { SpinningIcon } from '../Animations.js';

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "black"
    }
  }
});

export default function HomePage() {
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
					<AppBar>
						<Header />
					</AppBar>

					<main>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							height="100vh"
						>
							<Box
								width={610}
								height={250}
								bgcolor="transparent"
								color="white"
								display="flex"
								justifyContent="center"
								alignItems="center"
								style={{
									backgroundImage: 'url(https://www.pngall.com/wp-content/uploads/2016/03/Moon-Vector-PNG.png)',
									backgroundPosition: 'center',
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
									minHeight: '600px',
								}}
							>
								<Container maxWidth='sm'>
									<Typography
										component='h1'
										variant='h2'
										align='center'
										color='white'
										gutterBottom
										style={{ textShadow: '10px 10px 15px rgba(0, 0, 0, 5)' }}
									>
										Welcome to M.O.O.N.S.T.A.R.
									</Typography>
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
									<Typography
										variant='h5'
										align='center'
										color='white'
										paragraph
										style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 5)' }}
									>
										Mission Oversight and Organization Network for Space Task
										Assignment and Resource Allocation
									</Typography>
									<Stack
										sx={{ pt: 4 }}
										direction='row'
										spacing={2}
										justifyContent='center'
									>
										<Link to='/active-projects' style={{ textDecoration: 'none' }}>
											<Button variant='contained' color="primary" sx={{ backgroundColor: 'black' }}>
												View Active Projects
											</Button>
										</Link>
										<Link to='/completed-projects' style={{ textDecoration: 'none' }}>
											<Button variant='contained' color="primary" sx={{ backgroundColor: 'black' }}>
												View Completed Projects
											</Button>
										</Link>
									</Stack>
								</Container>
							</Box>
						</Box>
					</main>
					<Box sx={{ bgcolor: 'transparent', p: 2, pb: 12, mt: -20 }} component='footer'>
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
