import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

function ProjectDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

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
  }, [id]);

  return (
    <div>
      {task ? (
        <>
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5">Task Name: {task.task_name}</Typography>
              <Typography>Priority: {task.priority}</Typography>
              <Typography>Assigned To: {task.assigned_to}</Typography>
              <Typography>
                Due Date: {new Date(task.due_date).toLocaleDateString()}
              </Typography>
              <Typography>Description: {task.task_description}</Typography>
              <Typography>Requirement: {task.task_requirement}</Typography>
              {/* Display other project details as needed */}
            </CardContent>
          </Card>

          {/* Add the buttons */}
          <div>
            <Button
              variant="contained"
              component={Link}
              to={`/project-status/${id}`}
              style={{ marginRight: '10px' }}
            >
              Project Status
            </Button>
            <Button
              variant="contained"
              component={Link}
              to={`/edit-project/${id}`}
              style={{ marginRight: '10px' }}
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
        </>
      ) : (
        <div>Loading...</div>
        // You can customize the loading message as needed
      )}
    </div>
  );
}

export default ProjectDetails;