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
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Started reading the book.",
			task_id: 4,
	},
	{
			timestamp: '2023-09-15 12:30:00',
			update_text: "Finished the first chapter.",
			task_id: 4,
	},
	{
			timestamp: '2023-09-15 13:30:00',
			update_text: "Completed both chapters as required.",
			task_id: 4,
	},
	{
			timestamp: '2023-09-15 06:00:00',
			update_text: "Started my morning jog.",
			task_id: 5,
	},
	{
			timestamp: '2023-09-15 06:30:00',
			update_text: "Reached 3km mark.",
			task_id: 5,
	},
	{
			timestamp: '2023-09-15 07:00:00',
			update_text: "Completed the 5km run.",
			task_id: 5,
	},
	{
			timestamp: '2023-09-15 09:00:00',
			update_text: "Began writing the report.",
			task_id: 6,
	},
	{
			timestamp: '2023-09-15 11:00:00',
			update_text: "Halfway through the report.",
			task_id: 6,
	},
	{
			timestamp: '2023-09-15 01:00:00',
			update_text: "Finished writing the report with all details.",
			task_id: 6,
	},
	{
			timestamp: '2023-09-15 10:00:00',
			update_text: "Started grocery shopping.",
			task_id: 7,
	},
	{
			timestamp: '2023-09-15 11:00:00',
			update_text: "Picked up most of the essentials.",
			task_id: 7,
	},
	{
			timestamp: '2023-09-15 12:00:00',
			update_text: "Finished shopping. All items purchased.",
			task_id: 7,
	},
	{
			timestamp: '2023-09-15 03:00:00',
			update_text: "Started studying for the exam.",
			task_id: 8,
	},
	{
			timestamp: '2023-09-15 06:00:00',
			update_text: "Covered half the topics.",
			task_id: 8,
	},
	{
			timestamp: '2023-09-15 09:00:00',
			update_text: "Finished studying all topics for the exam.",
			task_id: 8,
	},
	{
		timestamp: '2023-09-15 06:00:00',
		update_text: "Started prepping for dinner.",
		task_id: 9,
},
{
		timestamp: '2023-09-15 07:30:00',
		update_text: "Main course is in the oven.",
		task_id: 9,
},
{
		timestamp: '2023-09-15 08:00:00',
		update_text: "Dinner is ready and it's something special!",
		task_id: 9,
},
{
		timestamp: '2023-09-15 10:00:00',
		update_text: "Started planning the weekend trip.",
		task_id: 10,
},
{
		timestamp: '2023-09-15 12:00:00',
		update_text: "Booked the accommodation.",
		task_id: 10,
},
{
		timestamp: '2023-09-15 01:00:00',
		update_text: "All set for the weekend trip.",
		task_id: 10,
},
{
		timestamp: '2023-09-15 11:00:00',
		update_text: "Started painting the living room with vibrant colors.",
		task_id: 11,
},
{
		timestamp: '2023-09-15 02:00:00',
		update_text: "Halfway through with the painting.",
		task_id: 11,
},
{
		timestamp: '2023-09-15 04:00:00',
		update_text: "Finished painting the living room.",
		task_id: 11,
},
{
		timestamp: '2023-09-15 05:00:00',
		update_text: "At the gym, warming up.",
		task_id: 12,
},
{
		timestamp: '2023-09-15 06:00:00',
		update_text: "Halfway through the full-body workout.",
		task_id: 12,
},
{
		timestamp: '2023-09-15 07:00:00',
		update_text: "Finished a successful workout session.",
		task_id: 12,
},
{
		timestamp: '2023-09-15 06:00:00',
		update_text: "Reached the dance class, warming up.",
		task_id: 13,
},
{
		timestamp: '2023-09-15 07:00:00',
		update_text: "Practicing the new routine.",
		task_id: 13,
},
{
		timestamp: '2023-09-15 08:00:00',
		update_text: "Finished the dance class with the new routine practiced.",
		task_id: 13,
},
	]);
};
