/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_table").del();
  await knex("user_table").insert([
    {
      first_name: "John",
      last_name: "Doe",
      rank: "Private",
      role: "Tech",
      flight: "Bravo",
      section: "First",
    },
    {
      first_name: "2John",
      last_name: "2Doe",
      rank: "Private",
      role: "Tech",
      flight: "Bravo",
      section: "First",
    },
    {
      first_name: "3John",
      last_name: "3Doe",
      rank: "Private",
      role: "Tech",
      flight: "Bravo",
      section: "First",
    },
  ]);
};
