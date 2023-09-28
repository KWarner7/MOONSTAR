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
import { Link as RouterLink } from 'react-router-dom';
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

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
                  <Typography component="h1" variant="h5" color="#000000">
                    Sign in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          backgroundColor="#000000"
                        />
                      </Grid>
                      <br></br>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                      </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        component={RouterLink}
                        to="/"
                      >
                        Sign In
                      </Button>
                      <Grid container justifyContent="center">
                        <Grid item>
                          <Link href="#" variant="body1" align="center" component={RouterLink} to="/Signup" >
                            Don't have an account? Sign Up
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
