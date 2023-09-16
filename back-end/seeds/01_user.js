const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('user_table').del();

	const fakeUsers = Array.from({ length: 100 }).map(() => ({
		email: faker.internet.email(),
		password: faker.internet.password(),
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		rank: faker.person.jobTitle(),
		role: faker.person.jobArea(),
		flight: faker.company.name(),
		section: faker.commerce.department(),
	}));

	await knex('user_table').insert(fakeUsers);
};
