import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoggedInHeader from './LoggedInComponents/LoggedInHeader.js';
import React, { useState, useEffect } from 'react';
import FilterCompleted from './FilterCompleted.js';
import CardHeader from '@mui/material/CardHeader';

const defaultTheme = createTheme();

export default function CompletedProjects() {
  const [tasks, setTasks] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [tasksResponse, statusUpdatesResponse] = await Promise.all([
        fetch("http://localhost:8081/tasks"),
        fetch("http://localhost:8081/status-updates")
      ]);

      const tasksData = await tasksResponse.json();
      const statusUpdatesData = await statusUpdatesResponse.json();

      setTasks(tasksData);
      setStatusUpdates(statusUpdatesData);
    }

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <LoggedInHeader />
      </AppBar>
      <main>
        <Box sx={{ bgcolor: 'transparent', pt: 2, pb: 1 }}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="white" gutterBottom>
              Completed Projects
            </Typography>
            <FilterCompleted />
          </Container>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Link to="/create-project" style={{ textDecoration: 'none' }}>
              <Button variant="contained">
                Create New Project
              </Button>
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
            {tasks.filter(task => !task.is_active).map((task) => (
              <Grid item key={task.id} xs={12}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Container>
                        <CardHeader
                          action={
                            <Typography variant="body2" color="textSecondary" component="p">
                              Creation Date: {task.creation_date} -------------- Due Date: {task.due_date} -------------- Completion Date: {task.completion_date}
                            </Typography>
                          }
                        />
                        <Typography
                          sx={{ fontSize: '2rem', textDecoration: 'underline' }}
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
                          sx={{ border: '1px solid #000', p: 6, maxHeight: '200px', overflowY: 'auto' }}
                          align='left'
                        >
                          <Typography>
                            {task.task_description}
                          </Typography>
                        </Container>
                        <Container>
                          <Typography gutterBottom variant="h5" component="h2" align="center">
                            Description
                          </Typography>
                        </Container>
                      </Grid>
                      <Grid item xs={8}>
                        <Container
                          sx={{ border: '1px solid #000', p: 6, maxHeight: '200px', overflowY: 'auto' }}
                          align='left'
                        >
                          {statusUpdates.filter(update => update.task_id === task.id).map(update => (
                            <Typography key={update.id}>
                              {update.timestamp}: {update.update_text}
                            </Typography>
                          ))}
                        </Container>
                        <Container align='center'>
                          <Typography gutterBottom variant="h5" component="h2" align="center">
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
      <Box sx={{ bgcolor: 'transparent', p: 6 }} component="footer">
        <Typography variant="subtitle1" align="center" color="white" component="p">
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
