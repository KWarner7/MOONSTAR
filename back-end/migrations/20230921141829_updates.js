/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('status_updates', (table) => {
		table.increments();
		table.timestamp('timestamp').notNullable();
		table.string('update_text', 550).notNullable();
		table.integer('task_id').notNullable();
		table.foreign('task_id').references('tasks_table.id');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists('status_updates');
};
