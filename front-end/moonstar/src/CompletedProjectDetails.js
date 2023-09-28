import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import LoggedInHeader from './LoggedInComponents/LoggedInHeader.js';
import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//
const defaultTheme = createTheme();

const CardStyle = {
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  borderColor: '#ddd',
  background:
    'linear-gradient(45deg, #B0C4DE 0%, #CFCFCF 40%, #808080 70%, #696969 100%)',
};

function CompletedProjectDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the project details based on the provided id
    fetch(`http://localhost:8081/tasks/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Access the data within the array
        if (data.length > 0) {
          setTask(data[0]);
        } else {
          // Handle the case when no data is found for the given id
          console.error(`No data found for task with id ${id}`);
        }
      })
      .catch((error) => {
        console.error('Error fetching project details:', error);
        // Handle the error or display an error message
      });

    // Fetch the status updates based on the provided id
    fetch(`http://localhost:8081/status-updates/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Set the status updates data in the state
        setStatusUpdates(data);
      })
      .catch((error) => {
        console.error('Error fetching status updates:', error);
        // Handle the error or display an error message
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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
          <AppBar position='relative'>
            <LoggedInHeader />
          </AppBar>
          <main>
            <Box sx={{ bgcolor: 'transparent', pt: 2, pb: 1 }}>
              <Container sx={{ bgcolor: 'transparent', pt: 2, pb: 1 }} maxWidth='lg'>
                <Typography
                  component='h1'
                  variant='h2'
                  align='center'
                  color='white'
                  gutterBottom
                >
                  Project Details
                </Typography>
                <div>
                  {loading ? (
                    <div>Loading...</div>
                  ) : task ? (
                    <Card variant='outlined' sx={CardStyle}>
                      <CardContent>
                        <Typography variant="h5" sx={{ marginBottom: "16px", fontWeight: "bold" }}>
                          {task.task_name}
                        </Typography>
                        <>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                              {/* Card for Assigned By */}
                              <Card sx={{ bgcolor: 'transparent', marginBottom: 2, border: "1px solid #e0e0e0" }}>
                                <CardContent>
                                  <Typography sx={{ marginBottom: "5px", fontWeight: "bold" }}>Assigned By:</Typography>
                                  <Typography>
                                    {task.assigned_by_rank}{" "}
                                    {task.assigned_by_first_name}{" "}
                                    {task.assigned_by_last_name}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>

                            <Grid item xs={12} md={3}>
                              {/* Card for Priority */}
                              <Card sx={{ bgcolor: 'transparent', marginBottom: 2, border: "1px solid #e0e0e0" }}>
                                <CardContent>
                                  <Typography sx={{ marginBottom: "5px", fontWeight: "bold" }}>Priority:</Typography>
                                  <Typography>{task.priority}</Typography>
                                </CardContent>
                              </Card>
                            </Grid>

                            <Grid item xs={12} md={3}>
                              {/* Card for Assigned To */}
                              <Card sx={{ bgcolor: 'transparent', marginBottom: 2, border: "1px solid #e0e0e0" }}>
                                <CardContent>
                                  <Typography sx={{ marginBottom: "5px", fontWeight: "bold" }}>Assigned To:</Typography>
                                  <Typography>
                                    {task.assigned_to_rank}{" "}
                                    {task.assigned_to_first_name}{" "}
                                    {task.assigned_to_last_name}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>

                            <Grid item xs={12} md={3}>
                              {/* Card for Due Date */}
                              <Card sx={{ bgcolor: 'transparent', marginBottom: 2, border: "1px solid #e0e0e0" }}>
                                <CardContent>
                                  <Typography sx={{ marginBottom: "5px", fontWeight: "bold" }}>Due Date:</Typography>
                                  <Typography>
                                    {new Date(task.due_date).toLocaleDateString()}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            {/* Description card with scroll */}
                            <Card sx={{ bgcolor: 'transparent', marginBottom: 2, border: "1px solid #e0e0e0" }}>
                              <CardContent
                                sx={{ bgcolor: 'transparent', maxHeight: "200px", overflowY: "auto" }}
                              >
                                <Typography sx={{ marginBottom: "5px", fontWeight: "bold" }}>
                                  Description:
                                </Typography>
                                <Typography>
                                  {task.task_description}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            {/* Requirements card with scroll */}
                            <Card sx={{ bgcolor: 'transparent', marginBottom: 2, border: "1px solid #e0e0e0" }}>
                              <CardContent
                                sx={{ bgcolor: 'transparent', maxHeight: "200px", overflowY: "auto" }}
                              >
                                <Typography
                                  sx={{
                                    marginBottom: "5px", fontWeight: "bold", position: "sticky",
                                    top: "0",
                                    backgroundColor: "transparent",
                                    zIndex: "1",
                                  }}
                                >Requirements:</Typography>
                                {task && task.task_requirement ? (
                                  <Typography>{task.task_requirement}</Typography>
                                ) : (
                                  <Typography>No requirement.</Typography>
                                )}
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={2} md={2}>
                            {/* Status updates card with scroll */}
                            <Card sx={{ bgcolor: 'transparent', marginBottom: 2, border: "1px solid #e0e0e0" }}>
                              <CardContent
                                sx={{ maxHeight: "200px", overflowY: "auto" }}
                              >
                                <Typography
                                  sx={{
                                    marginBottom: "5px",
                                    fontWeight: "bold",
                                    position: "sticky",
                                    top: "0",
                                    backgroundColor: "transparent",
                                    zIndex: "1",
                                  }}
                                >
                                  Status Updates:
                                </Typography>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                  {statusUpdates.length > 0 ? (
                                    <ul style={{
                                      paddingLeft: "20px",
                                      listStyleType: "disc",
                                      textAlign: "center",
                                      maxWidth: "50%",
                                      margin: "0 auto"
                                    }}>
                                      {statusUpdates.map((update, index) => (
                                        <li key={index}>
                                          <Typography>
                                            {update.update_text}{" "}
                                            {new Date(update.timestamp).toLocaleString()}
                                          </Typography>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <Typography>No updates yet.</Typography>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </Grid>

                          {/* Buttons */}
                          <div>
                            <Button
                              variant="contained"
                              component={Link}
                              to={`/project-status/${id}`}
                              style={{ marginRight: "20px", color: "white", backgroundColor: "black" }}
                            >
                              Project Status
                            </Button>
                            <Button
                              variant="contained"
                              component={Link}
                              to={`/edit-project/${id}`}
                              style={{ marginRight: "20px", color: "white", backgroundColor: "black" }}
                            >
                              Edit Project
                            </Button>
                            <Button
                              variant="contained"
                              component={Link}
                              to="/completed-projects"
                              style={{ color: "white", backgroundColor: "red" }}
                            >
                              Return to Completed Projects
                            </Button>
                          </div>
                        </>
                      </CardContent>
                    </Card>
                  ) : (
                    <div>Project not found.</div>
                  )}
                </div>
              </Container>
            </Box>
          </main>
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
        </ThemeProvider>
      </Box>
    </>
  );
}

export default CompletedProjectDetails;



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