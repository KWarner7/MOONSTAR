import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import Header from './Header.js';
import AppBar from '@mui/material/AppBar';

const CardStyle = {
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	transition: '0.3s',
	borderRadius: '10px',
	borderColor: '#ddd',
	background:
		'linear-gradient(45deg, #B0C4DE 0%, #CFCFCF 40%, #808080 70%, #696969 100%)',
	transform: 'scale(0.98)',
	// '&:hover': {
	// 	boxShadow: '0 0 16px rgba(255, 255, 255, 0.9)',
	// 	transform: 'scale(1.0)',
	// },
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
      <AppBar position="fixed">
        <Header />
      </AppBar>
      <main>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : task ? (
            <>
            <Typography   style={{ fontWeight: 'bold' }} variant="h4" sx={{ marginBottom: "16px" }}>
                   Completed Project Details
                  </Typography>
              <Card sx={{ ...CardStyle, width: 1250, height: 675 , borderRadius: "8px" , backgroundColor: "#f5f5f5", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"}}>
                <CardContent>
                  <Typography   style={{ fontWeight: 'bold' }} variant="h5" sx={{ marginBottom: "16px" }}>
                    Project Name: {task.task_name}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      {/* Card for Assigned By */}
                      <Card sx={{ background: 'transparent', height: 90 , marginBottom: 2,border: "1px solid #CCCCCC",  }}>
                        <CardContent>
                          <Typography  style={{ fontWeight: 'bold' }}>Assigned By:</Typography>
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
                      <Card sx={{ background: 'transparent', height: 90, marginBottom: 2 , border: "1px solid #CCCCCC"}}>
                        <CardContent>
                          <Typography  style={{ fontWeight: 'bold' }}>Priority:</Typography>
                          <Typography>{task.priority}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      {/* Card for Assigned To */}
                      <Card sx={{ background: 'transparent', height: 90, marginBottom: 2, border: "1px solid #CCCCCC" }}>
                        <CardContent>
                          <Typography  style={{ fontWeight: 'bold' }}>Assigned To:</Typography>
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
                      <Card sx={{ background: 'transparent', height: 90, marginBottom: 2 , border: "1px solid #CCCCCC"}}>
                        <CardContent>
                          <Typography  style={{ fontWeight: 'bold' }}>Due Date:</Typography>
                          <Typography>
                            {new Date(task.due_date).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {/* Description card with scroll */}
                    <Card sx={{background: 'transparent', marginBottom: 2, border: "1px solid #CCCCCC" }}>
                      <CardContent
                        sx={{ height: 100, maxHeight: "200px", overflowY: "auto" }}
                      >
                        <Typography  style={{ fontWeight: 'bold' }}>
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
                    <Card sx={{background: 'transparent', height: 100, marginBottom: 2 , border: "1px solid #CCCCCC"}}>
                      <CardContent
                        sx={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                       <Typography  style={{ fontWeight: 'bold' }}
                          sx={{
                            position: "sticky",
                            top: "0",
                            background: 'transparent',
                            zIndex: "1",
                          }}
                        >Requirements:</Typography>
                        {task && task.task_requirement ? (
                          <Typography>{task.task_requirement}</Typography>
                        ) : (
                          <Typography>No requirements.</Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={2} md={2}>
                    {/* Status updates card with scroll */}
                    <Card sx={{background: 'transparent', marginBottom: 2 , border: "1px solid #CCCCCC"}}>
                      <CardContent
                        sx={{ height: "180px", overflowY: "auto" }}
                      >
                        <Typography  style={{ fontWeight: 'bold' }}
                          sx={{
                            position: "sticky",
                            top: "0",
                            background: 'transparent',
                            zIndex: "1",
                          }}
                        >
                          Status Updates:
                        </Typography>
                        {statusUpdates.length > 0 ? (
                          <ul
                            style={{
                              paddingLeft: "20px",
                              listStyleType: "none",
                            }}
                          >
                            {statusUpdates.map((update, index) => (
                              <li key={index} style={{ textAlign: "center" }}>
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
                      style={{ marginRight: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",  }}
                    >
                      Project Status
                    </Button>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/edit-project/${id}`}
                      style={{ marginRight: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", }}
                    >
                      Edit Project
                    </Button>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/completed-projects"
                      style={{ marginRight: "20px", backgroundColor: "red", color: "white" , boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", }}
                    >
                      Return to Completed Projects
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

export default CompletedProjectDetails;
