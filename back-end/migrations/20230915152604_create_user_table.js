exports.up = function (knex) {
	return knex.schema.createTable('user_table', (table) => {
		table.increments();
		table.varchar('email', 250).notNullable();
		table.varchar('password', 250).notNullable();
		table.string('first_name', 250).notNullable();
		table.string('last_name', 250).notNullable();
		table.string('rank', 250).notNullable();
		table.string('role', 250).notNullable();
		table.string('flight', 250).notNullable();
		table.string('section', 250).notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('user_table');
};
