const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8081;
const knex = require('knex')(
	require('./knexfile')[process.env.NODE_ENV || 'development']
);

app.use(cors({
  origin: 'http://localhost:3000'
}));

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

app.get('/users/search', async (req, res) => {
	const { name, flight, section } = req.query;

	if (!name && !flight && !section) {
		return res
			.status(400)
			.json({ error: 'You must provide at least one search parameter' });
	}

	try {
		let query = knex('user_table');

		if (name) {
			query = query
				.where('first_name', 'ilike', `%${name}%`)
				.orWhere('last_name', 'ilike', `%${name}%`);
		}

		if (flight) {
			query = query.orWhere('flight', 'ilike', `%${flight}%`);
		}

		if (section) {
			query = query.orWhere('section', 'ilike', `%${section}%`);
		}

		const users = await query;

		if (users.length === 0) {
			return res
				.status(404)
				.json({ message: 'No users found with the provided criteria' });
		}

		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
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

app.patch('/tasks/:id', async (req, res) => {
	const taskId = req.params.id;
	const updates = {};

	if (req.body.task_name !== undefined) {
		updates.task_name = req.body.task_name;
	}
	if (req.body.task_description !== undefined) {
		updates.task_description = req.body.task_description;
	}
	if (req.body.assigned_to !== undefined) {
		updates.assigned_to = req.body.assigned_to;
	}
	if (req.body.task_requirement !== undefined) {
		updates.task_requirement = req.body.task_requirement;
	}
	if (req.body.due_date !== undefined) {
		updates.due_date = req.body.due_date;
	}

	try {
		await knex('tasks_table').where({ id: taskId }).update(updates);
		res.status(200).send({ message: 'Task updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Internal server error' });
	}
});

app.patch('/users/:id', async (req, res) => {
	const userId = req.params.id;
	const updates = {};

	if (req.body.username !== undefined) {
		updates.username = req.body.username;
	}
	if (req.body.password !== undefined) {
		updates.password = req.body.password;
	}
	if (req.body.first_name !== undefined) {
		updates.first_name = req.body.first_name;
	}
	if (req.body.last_name !== undefined) {
		updates.last_name = req.body.last_name;
	}
	if (req.body.rank !== undefined) {
		updates.rank = req.body.rank;
	}
	if (req.body.role !== undefined) {
		updates.role = req.body.role;
	}
	if (req.body.flight !== undefined) {
		updates.flight = req.body.flight;
	}
	if (req.body.section !== undefined) {
		updates.section = req.body.section;
	}

	try {
		await knex('user_table').where({ id: userId }).update(updates);
		res.status(200).send({ message: 'user updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Internal server error' });
	}
});

app.listen(PORT, () => {
	console.log(`The server is running on ${PORT}`);
});
