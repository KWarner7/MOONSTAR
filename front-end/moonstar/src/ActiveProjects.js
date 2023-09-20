import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header.js';
import React, { useState, useEffect } from 'react';
import FilterActive from './FilterActive.js';

const defaultTheme = createTheme();

export default function ActiveProjects() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8081/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Header />
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'transparent',
            pt: 2,
            pb: 1
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="white"
              gutterBottom
            >
              Active Projects
            </Typography>
            <FilterActive />
          </Container>
          <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/create-project" style={{ textDecoration: 'none' }}>
                <Button variant="contained">Create New Project</Button>
              </Link>
            </Stack>
        </Box>
        <Container
          sx={{
            py: 1,
            border: '1px solid #ffffff',
            maxHeight: '600px',
            overflowY: 'auto',
            padding: '2rem'
          }}
          maxWidth="lg"
        >
          <Grid container spacing={4}>
            {tasks.map((task, index) => (
              <Grid item key={task.id} xs={12}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1
                    }}
                  >
                    <Grid container spacing={2}>
                      <Container>
                        <Typography
                          sx={{
                            fontSize: '2rem',
                            textDecoration: 'underline'
                          }}
                          gutterBottom
                          variant="h7"
                          component="h2"
                          align="left"
                        >
                          {task.task_name}
                        </Typography>
                      </Container>
                      <Grid item xs={4}>
                        <Container
                          sx={{
                            border: '1px solid #000',
                            p: 6,
                            maxHeight: '200px',
                            overflowY: 'auto'
                          }}
                          align='left'
                        >
                          <Typography>
                            {task.task_description}
                          </Typography>
                        </Container>
                        <Container>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            align="center">
                            Description
                          </Typography>
                        </Container>
                      </Grid>
                      <Grid item xs={8}>
                        <Container
                          sx={{
                            border: '1px solid #000',
                            p: 6,
                            maxHeight: '200px',
                            overflowY: 'auto'
                          }}
                          align='left'
                        >
                          <Typography>
                            {task.status_update}
                          </Typography>
                        </Container>
                        <Container align='center'>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2" a
                            lign="center"
                          >
                            Status Updates
                          </Typography>
                        </Container>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box
        sx={{
          bgcolor: 'transparent',
          p: 6
        }}
        component="footer"
      >
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
    </ThemeProvider>
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
