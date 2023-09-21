/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('status_updates').del();
	await knex('status_updates').insert([
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "it's not done yet",
			task_id: 1,
		},
		{
			timestamp: '2023-09-15 12:30:00',
			update_text: "it's not done yet",
			task_id: 2,
		},
		{
			timestamp: '2023-09-15 13:30:00',
			update_text: "it's not done yet",
			task_id: 3,
		},
		{
			timestamp: '2023-09-16 11:30:00',
			update_text: 'working on it',
			task_id: 1,
		},
		{
			timestamp: '2023-09-16 12:30:00',
			update_text: 'still not done',
			task_id: 2,
		},
		{
			timestamp: '2023-09-16 13:30:00',
			update_text: 'instructions unclear',
			task_id: 3,
		},
		{
			timestamp: '2023-09-17 17:30:00',
			update_text: 'waiting on reply from SSGT Snuffy',
			task_id: 1,
		},
		{
			timestamp: '2023-09-17 15:30:00',
			update_text: 'I quit',
			task_id: 2,
		},
		{
			timestamp: '2023-09-17 19:30:00',
			update_text: "I'm hungry",
			task_id: 3,
		},
	]);
};
