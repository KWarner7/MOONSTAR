exports.up = function (knex) {
	return knex.schema.createTable('tasks_table', (table) => {
		table.increments();
		table.string('task_name', 250).notNullable();
		table.string('task_description', 550).notNullable();
		table.string('task_requirement', 550).notNullable();
		table.timestamp('creation_date').notNullable();
		table.dateTime('due_date').notNullable();
		table.timestamp('completion_date').notNullable();
		table.boolean('is_active').notNullable();
		table.string('priority', 250).notNullable();
		table.integer('assigned_to').notNullable();
		table.foreign('assigned_to').references('user_table.id');
		table.integer('assigned_by').notNullable();
		table.foreign('assigned_by').references('user_table.id');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('tasks_table');
};
