const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8081;
const knex = require('knex')(
	require('./knexfile')[process.env.NODE_ENV || 'development']
);

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
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

app.get('/tasks/search', async (req, res) => {
	const { assignedByName, assignedToName } = req.query;
	try {
		let query = knex('tasks_table')
			.join(
				'user_table as assignedBy',
				'tasks_table.assigned_by',
				'=',
				'assignedBy.id'
			)
			.join(
				'user_table as assignedTo',
				'tasks_table.assigned_to',
				'=',
				'assignedTo.id'
			);

		if (assignedByName) {
			query = query.where(
				knex.raw("CONCAT(assignedBy.first_name, ' ', assignedBy.last_name)"),
				'ilike',
				`%${assignedByName}%`
			);
		}

		if (assignedToName) {
			query = query.where(
				knex.raw("CONCAT(assignedTo.first_name, ' ', assignedTo.last_name)"),
				'ilike',
				`%${assignedToName}%`
			);
		}

		const tasks = await query.select('tasks_table.*');

		if (tasks.length === 0) {
			return res
				.status(404)
				.json({ message: 'No tasks found with the provided criteria' });
		}

		res.status(200).json(tasks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.get('/tasks', async (req, res) => {
	try {
		const tasksData = await knex('tasks_table')
			.join(
				'user_table as assignedBy',
				'tasks_table.assigned_by',
				'=',
				'assignedBy.id'
			)
			.join(
				'user_table as assignedTo',
				'tasks_table.assigned_to',
				'=',
				'assignedTo.id'
			)
			.select(
				'tasks_table.*',
				'assignedBy.first_name as assigned_by_first_name',
				'assignedBy.last_name as assigned_by_last_name',
				'assignedTo.first_name as assigned_to_first_name',
				'assignedTo.last_name as assigned_to_last_name'
			);

		res.status(200).json(tasksData);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// app.get('/tasks', function (req, res) {
//     knex('tasks_table')
//         .select('*')
//         .then((data) => res.status(200).json(data))
//         .catch((err) =>
//             res.status(404).json({
//                 message:
//                     'The tasks data you are looking for could not be found. Please try again',
//             })
//         );
// });

app.get('/status-updates', function (req, res) {
	knex('status_updates')
		.select('*')
		.then((data) => res.status(200).json(data))
		.catch((err) =>
			res.status(404).json({
				message:
					'The status update data you are looking for could not be found. Please try again',
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

// app.get('/status-updates/:id', async (req, res) => {
// 	const updateId = req.params.id;
// 	try {
// 		const updateData = await knex('status_updates').where({ id: updateId });
// 		res.status(200).json(updateData);
// 	} catch (err) {
// 		res.status(500).json({
// 			error: `Cannot retrieve status update data by the given update ID: ${updateId}`,
// 		});
// 	}
// });

app.get('/status-updates/:taskId', async (req, res) => {
	const taskId = req.params.taskId;

	try {
		// Query the status_updates table to get all updates for the specified task ID
		const updates = await knex('status_updates').where({ task_id: taskId });

		// Return the updates in the response
		res.status(200).json(updates);
	} catch (err) {
		res.status(500).json({
			error: `Cannot retrieve status updates for the given task ID: ${taskId}`,
		});
	}
});

app.get('/tasks/:id', async (req, res) => {
	const taskId = req.params.id;
	try {
		const taskData = await knex('tasks_table')
			.join(
				'user_table as assignedBy',
				'tasks_table.assigned_by',
				'=',
				'assignedBy.id'
			)
			.join(
				'user_table as assignedTo',
				'tasks_table.assigned_to',
				'=',
				'assignedTo.id'
			)
			.where('tasks_table.id', taskId)
			.select(
				'tasks_table.*',
				'assignedBy.rank as assigned_by_rank',
				'assignedBy.first_name as assigned_by_first_name',
				'assignedBy.last_name as assigned_by_last_name',
				'assignedTo.rank as assigned_to_rank',
				'assignedTo.first_name as assigned_to_first_name',
				'assignedTo.last_name as assigned_to_last_name'
			);

		res.status(200).json(taskData);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: `Cannot retrieve task data by the given task ID: ${taskId}`,
		});
	}
});

app.get('/tasks/filter', async (req, res) => {
	const { start_date, end_date } = req.query;

	if (!start_date && !end_date) {
		return res
			.status(400)
			.json({ error: 'You must provide start_date and/or end_date' });
	}

	try {
		let query = knex('tasks_table');

		if (start_date) {
			query = query.where('start_date', '>=', start_date);
		}

		if (end_date) {
			query = query.where('end_date', '<=', end_date);
		}

		const tasks = await query;

		if (tasks.length === 0) {
			return res
				.status(404)
				.json({ message: 'No tasks found with the provided criteria' });
		}

		res.status(200).json(tasks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
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

app.post('/status-updates', (req, res) => {
	const newUpdate = req.body;
	knex('status_updates')
		.insert(newUpdate)
		.then(() =>
			res
				.status(201)
				.json(`The new update, ${newUpdate.update_text} has been added.`)
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
	if (req.body.assigned_by !== undefined) {
		updates.assigned_by = req.body.assigned_by;
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
	if (req.body.priority !== undefined) {
		updates.priority = req.body.priority;
	}
	if (req.body.is_active !== undefined) {
		updates.is_active = req.body.is_active;
	}
	if (req.body.completion_date !== undefined) {
		updates.completion_date = req.body.completion_date;
	}
	if (req.body.status_update !== undefined) {
		updates.status_update = req.body.status_update;
	}
	if (req.body.status_update_timestamp !== undefined) {
		updates.status_update_timestamp = req.body.status_update_timestamp;
	}

	try {
		await knex('tasks_table').where({ id: taskId }).update(updates);
		res.status(200).send({ message: 'Task updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Internal server error' });
	}
});

app.patch('/status-updates/:id', async (req, res) => {
	const statusUpdateId = req.params.id;
	const updates = {};

	const allowedFields = ['timestamp', 'update_text'];

	for (const field of allowedFields) {
		if (req.body[field] !== undefined) {
			updates[field] = req.body[field];
		}
	}

	try {
		await db('status_updates').where({ id: statusUpdateId }).update(updates);
		res.status(200).send({ message: 'Status update updated successfully' });
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
