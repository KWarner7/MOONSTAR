/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks_table', table => {
        table.increments();
        table.string('task_name', 250).notNullable();
        table.string('task_description', 550).notNullable();
        table.timestamp('creation_date', 250).notNullable();
        table.dateTime('due_date', 250).notNullable();
        table.timestamp('completion_date', 250).notNullable();
        table.integer('assigned_to', 250).notNullable();
        table.string('priority', 250).notNullable();
        table.integer('assigned_by', 250).notNullable();
        table.foreign('user_id').references('user.id');
     } )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('user', table => {
        table.dropForeign('user_id')
    })
    .then(function(){
        return knex.schema.dropTableIfExists('tasks');
    });
};
