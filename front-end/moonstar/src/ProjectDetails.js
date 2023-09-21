import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const { id } = useParams();
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error('Error fetching tasks data:', error));
  }, [id]);

  return (
    <div>
      {tasks ? (
        tasks.map((task) => (
          <div key={task.id}>
            <Card sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5">Task Name: {task.task_name}</Typography>
                <Typography>Priority: {task.priority}</Typography>
                <Typography>Assigned To: {task.assigned_to}</Typography>
                <Typography>Due Date: {new Date(task.due_date).toLocaleDateString()}</Typography>
                <Typography>Description: {task.task_description}</Typography>
                <Typography>Requirement: {task.task_requirement}</Typography>
                <Typography>Status Update: {task.status_update}</Typography>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ProjectDetails;
