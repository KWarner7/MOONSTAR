import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';

const CardStyle = {
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: '0.3s',
  borderRadius: '10px',
  borderColor: '#ddd',
  background:
    'linear-gradient(45deg, #B0C4DE 0%, #CFCFCF 40%, #808080 70%, #696969 100%)',
  transform: 'scale(0.98)',
  '&:hover': {
    boxShadow: '0 0 16px rgba(255, 255, 255, 0.9)',
    transform: 'scale(1.0)',
  },
};

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#000000',
    }
  }
});

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      rank: data.get('rank'),
      role: 'User',
      flight: 'Alpha',
      section: 'Operations',
      email: data.get('email'),
      password: data.get('password')
    };

    console.log(userData);

    try {
      const response = await fetch('http://localhost:8081/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", result);
        navigate("/Signin");
      } else {
        console.error("Error registering user:", result);
      }

    } catch (error) {
      console.error("There was an error:", error);
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
              <Card sx={CardStyle}>
                <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5" color="black">
                    Sign up
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="rank"
                          label="Rank"
                          name="rank"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          backgroundColor="#000000"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, backgroundColor: "#000000", color: "#ffffff" }}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Link href="#" variant="body1" align="center" component={RouterLink} to="/Signin" >
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
            </Card>
          </Box>
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
        </main>
      </ThemeProvider>
    </Box>
    </>
  );
}

function Copyright() {
  return (
    <Typography variant='body2' color='black' align='center'>
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
