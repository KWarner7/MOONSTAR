exports.up = function (knex) {
	return knex.schema.createTable('tasks_table', (table) => {
			table.increments();
			table.string('task_name', 250).notNullable();
			table.string('task_description', 550).notNullable();
			table.string('task_requirement', 550).notNullable();
			table.timestamp('creation_date').defaultTo(knex.fn.now()).notNullable();
			table.dateTime('due_date');
			table.timestamp('completion_date');
			table.boolean('is_active').notNullable().defaultTo(true);
			table.string('priority', 250).notNullable();
			table.integer('assigned_to').notNullable();
			table.integer('assigned_by').notNullable();
	})
	.alterTable('tasks_table', (table) => {
			table.foreign('assigned_to').references('user_table.id').onDelete('CASCADE').onUpdate('CASCADE');
			table.foreign('assigned_by').references('user_table.id').onDelete('CASCADE').onUpdate('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('tasks_table');
};
