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
			update_text: "Review in progress",
			task_id: 1,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Encryption process ongoing",
			task_id: 2,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Strategies being evaluated",
			task_id: 3,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Briefing preparation underway",
			task_id: 4,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Equipment check in progress",
			task_id: 5,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Security drill planning in progress",
			task_id: 6,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Data backup in progress",
			task_id: 7,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Analyzing latest intelligence data",
			task_id: 8,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Setting up communication lines",
			task_id: 9,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Training session preparation underway",
			task_id: 10,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Planning the mission brief",
			task_id: 11,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Performing network maintenance",
			task_id: 12,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Checking office supplies",
			task_id: 13,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Compiling field reports",
			task_id: 14,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Redaction of sensitive data in progress",
			task_id: 15,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Decryption of messages ongoing",
			task_id: 16,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Calibrating communication devices",
			task_id: 17,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Reviewing last operation's outcomes",
			task_id: 18,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Upgrading security systems",
			task_id: 19,
		},
		{
			timestamp: '2023-09-15 11:30:00',
			update_text: "Preparing for military conference",
			task_id: 20,
		},
	]);
};
