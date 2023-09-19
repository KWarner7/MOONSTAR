import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
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
					<Typography variant='h6' component='div' align='center' sx={{ flexGrow: 1 }}>
						<Link to= "/">
						<Button sx={{ color: 'white'}}> M.O.O.N.S.T.A.R.</Button>
						</Link>
					</Typography>
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<Button sx={{ color: 'white' }}>Login</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
