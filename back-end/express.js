const express = require('express');

const app = express();
const PORT = process.env.PORT || 8081;
const knex = require('knex')(
	require('./knexfile')[process.env.NODE_ENV || 'development']
);

app.use(express.json());

app.get('/users', function (req, res) {
	knex('user_table')
		.select('*')
		.then((data) => res.status(200).json(data))
		.catch((err) =>
			res.status(404).json({
				message:
					'The user data you are looking for could not be found. Please try again',
			})
		);
});
app.get('/tasks', function (req, res) {
	knex('tasks_table')
		.select('*')
		.then((data) => res.status(200).json(data))
		.catch((err) =>
			res.status(404).json({
				message:
					'The tasks data you are looking for could not be found. Please try again',
			})
		);
});

app.get('/users/:id', async (req, res) => {
	const userId = req.params.id;
	try {
		const userData = await knex('user_table').where({ id: userId });
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json({
			error: `Cannot retrieve user data by the given user ID: ${userId}`,
		});
	}
});

app.get('/tasks/:id', async (req, res) => {
	const taskId = req.params.id;
	try {
		const taskData = await knex('tasks_table').where({ id: taskId });
		res.status(200).json(taskData);
	} catch (err) {
		res.status(500).json({
			error: `Cannot retrieve task data by the given task ID: ${taskId}`,
		});
	}
});

app.post('/users', (req, res) => {
	const newUser = req.body;
	knex('user_table')
		.insert(newUser)
		.then(() =>
			res
				.status(201)
				.json(
					`The new user, ${newUser.first_name} ${newUser.last_name} has been added.`
				)
		)
		.catch((err) => res.status(500).json(err));
});

app.post('/tasks', (req, res) => {
	const newTask = req.body;
	knex('tasks_table')
		.insert(newTask)
		.then(() =>
			res.status(201).json(`The new task, ${newTask.task_name} has been added.`)
		)
		.catch((err) => res.status(500).json(err));
});

app.delete('/users/:id', (req, res) => {
	const id = req.params.id;
	knex('user_table')
		.where('id', id)
		.del()
		.then(() => res.json(`User with id ${id} has been deleted.`))
		.catch((err) => res.status(500).json(err));
});

app.delete('/tasks/:id', (req, res) => {
	const id = req.params.id;
	knex('tasks_table')
		.where('id', id)
		.del()
		.then(() => res.json(`Task with id ${id} has been deleted.`))
		.catch((err) => res.status(500).json(err));
});

app.listen(PORT, () => {
	console.log(`The server is running on ${PORT}`);
});
