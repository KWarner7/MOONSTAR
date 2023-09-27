import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import Header from './Header.js';
import AppBar from '@mui/material/AppBar';

function ProjectDetails() {
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
      <AppBar position="fixed">
        <Header />
      </AppBar>
      <main>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : task ? (
            <>
              <Card sx={{ width: 1250, height: 650 , borderRadius: "8px" }}>
                <CardContent>
                  <Typography variant="h5" sx={{ marginBottom: "16px" }}>
                    Task Name: {task.task_name}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      {/* Card for Assigned By */}
                      <Card sx={{ marginBottom: 2,border: "1px solid #e0e0e0" }}>
                        <CardContent>
                          <Typography>Assigned By:</Typography>
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
                      <Card sx={{ marginBottom: 2 , border: "1px solid #e0e0e0"}}>
                        <CardContent>
                          <Typography>Priority:</Typography>
                          <Typography>Priority: {task.priority}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      {/* Card for Assigned To */}
                      <Card sx={{ marginBottom: 2, border: "1px solid #e0e0e0" }}>
                        <CardContent>
                          <Typography>Assigned To:</Typography>
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
                      <Card sx={{ marginBottom: 2 , border: "1px solid #e0e0e0"}}>
                        <CardContent>
                          <Typography>Due Date:</Typography>
                          <Typography>
                            {new Date(task.due_date).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {/* Description card with scroll */}
                    <Card sx={{ marginBottom: 2, border: "1px solid #e0e0e0" }}>
                      <CardContent
                        sx={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        <Typography>
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
                    <Card sx={{ marginBottom: 2 , border: "1px solid #e0e0e0"}}>
                      <CardContent
                        sx={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                       <Typography
                          sx={{
                            position: "sticky",
                            top: "0",
                            backgroundColor: "white",
                            zIndex: "1",
                          }}
                        >Requirement:</Typography>
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
                    <Card sx={{ marginBottom: 2 , border: "1px solid #e0e0e0"}}>
                      <CardContent
                        sx={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        <Typography
                          sx={{
                            position: "sticky",
                            top: "0",
                            backgroundColor: "white",
                            zIndex: "1",
                          }}
                        >
                          Status Updates:
                        </Typography>
                        {statusUpdates.length > 0 ? (
                          <ul
                            style={{
                              paddingLeft: "20px",
                              listStyleType: "disc",
                            }}
                          >
                            {statusUpdates.map((update, index) => (
                              <li key={index} style={{ textAlign: "left" }}>
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
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Buttons */}
                  <div>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/project-status/${id}`}
                      style={{ marginRight: "20px" }}
                    >
                      Project Status
                    </Button>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/edit-project/${id}`}
                      style={{ marginRight: "20px" }}
                    >
                      Edit Project
                    </Button>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/active-projects"
                      
                    >
                      Return to Active Projects
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div>No data found for the task with ID {id}</div>
          )}
        </div>
      </main>
    </>
  );
}

export default ProjectDetails;
