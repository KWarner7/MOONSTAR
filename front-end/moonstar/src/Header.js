import React from 'react';
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
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<Button sx={{ color: 'white' }}>Login</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
		</ThemeProvider>
		</>
	);
}
