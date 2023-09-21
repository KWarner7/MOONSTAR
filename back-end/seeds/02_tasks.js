/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('tasks_table').del();
	await knex('tasks_table').insert([
		{
			id: 1,
			task_name: 'sweep',
			task_description: 'Clean the living room',
			task_requirement: 'get it done fast',
			creation_date: '2023-09-15 14:30:00',
			due_date: '2023-09-20 14:30:00',
			completion_date: '2023-09-20 14:30:00',
			is_active: true,
			assigned_to: 1,
			priority: 'Medium',
			assigned_by: 2,
		},
		{
			id: 2,
			task_name: 'hack',
			task_description: 'Work on coding project',
			task_requirement: 'get it done fast',
			creation_date: '2023-09-15 14:30:00',
			due_date: '2023-09-30 14:30:00',
			completion_date: '2023-09-30 14:30:00',
			is_active: true,
			assigned_to: 1,
			priority: 'High',
			assigned_by: 3,
		},
		{
			id: 3,
			task_name: 'eat',
			task_description: 'Have lunch',
			task_requirement: 'get it done fast',
			creation_date: '2023-09-15 14:30:00',
			due_date: '2023-09-15 14:30:00',
			completion_date: '2023-09-15 14:30:00',
			is_active: false,
			assigned_to: 2,
			priority: 'Low',
			assigned_by: 3,
		},
	]);
};
