import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  projectCard: {
    marginBottom: theme.spacing(2),

  },
  scrollableCard: {
    maxHeight: '300px',
    overflowY: 'auto',

  },
  navigationButtons: {
    marginTop: theme.spacing(2), 

  },
}));

function ProjectDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProjectData(data);
      })
      .catch((error) => console.error('Error fetching project data:', error));
  }, [id]);

  return (
    <div>
      {projectData ? (
        <>
{/* Project Name Card */}
          <Card className={classes.projectCard}>
            <CardContent>
              <Typography variant="h5">Project Name:</Typography>
              <Typography>{projectData.project_name}</Typography>
            </CardContent>
          </Card>

{/* Priority Card */}
          <Card className={classes.projectCard}>
            <CardContent>
              <Typography variant="h5">Priority:</Typography>
              <Typography>{projectData.priority}</Typography>
            </CardContent>
          </Card>

{/* Assigned To Card */}
          <Card className={classes.projectCard}>
            <CardContent>
              <Typography variant="h5">Assigned To:</Typography>
              <Typography>{projectData.assigned_to}</Typography>
            </CardContent>
          </Card>

{/* Due Date Card */}
          <Card className={classes.projectCard}>
            <CardContent>
              <Typography variant="h5">Due Date:</Typography>
              <Typography>{projectData.due_date}</Typography>
            </CardContent>
          </Card>

{/* Description Card */}
          <Card className={classes.projectCard}>
            <CardContent>
              <Typography variant="h5">Description:</Typography>
              <Typography>{projectData.description}</Typography>
            </CardContent>
          </Card>

{/* Status Updates Card */}
          <Card className={classes.scrollableCard}>
            <CardContent>
              <Typography variant="h5">Status Updates</Typography>
              {/* Display status updates here in a scrollable area */}
            </CardContent>
          </Card>

{/* Task Cards */}
          <Card className={classes.scrollableCard}>
            <CardContent>
              <Typography variant="h5">Task Cards</Typography>
              {/* Display task cards (requirements and due dates) in a scrollable area */}
            </CardContent>
          </Card>

{/* Navigation Buttons */}
          <div className={classes.navigationButtons}>
            <Button variant="contained" color="primary">
              Project Status
            </Button>
            <Button variant="contained" color="primary">
              Edit Project
            </Button>
            <Button variant="contained" color="primary">
              Return to Active Projects
            </Button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ProjectDetails;
