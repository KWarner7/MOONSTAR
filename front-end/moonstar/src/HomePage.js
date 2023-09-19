import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Header from './Header.js';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <AppBar position="relative">
        <Header />
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome to M.O.O.N.S.T.A.R.
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Mission
              Oversight and
              Organization
              Network for
              Space
              Task
              Assignment and
              Resource Allocation
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/active-projects" style={{ textDecoration: 'none' }}>
                <Button variant="contained">View Active Projects</Button>
              </Link>
              <Link to="/completed-projects" style={{ textDecoration: 'none' }}>
                <Button variant="contained">View Completed Projects</Button>
              </Link>
            </Stack>
          </Container>
        </Box>
      </main>
      <Box sx={{ bgcolor: 'transparent', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
        >
          Take your projects to the moon!
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {'Copyright © '}
      <Link color="rgb(0,0,990,1)" href="https://mui.com/">
        M.O.O.N.S.T.A.R.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}