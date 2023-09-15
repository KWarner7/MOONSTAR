/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_table', table => {
        table.increments();
        table.string('first_name', 250).notNullable();
        table.string('last_name', 250).notNullable();
        table.string('rank', 250).notNullable();
        table.string('role', 250).notNullable();
        table.string('flight', 250).notNullable();
        table.string('section', 250).notNullable();
     } )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_table');
};
