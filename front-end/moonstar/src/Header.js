import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	const handleSignInClick = () => {
		navigate('/login');
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					{/* <IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton> */}
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						M.O.O.N.S.T.A.R.
					</Typography>
					{/* {user ? (
						<Typography variant='body1' color='inherit'>
							{user.first_name} {user.last_name}
						</Typography>
					) : ( */}
					<Button color='inherit' onClick={handleSignInClick}>
						Sign In
					</Button>
					{/* )} */}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
