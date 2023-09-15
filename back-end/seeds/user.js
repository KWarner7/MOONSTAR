/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {id: 1, first_name: 'Joel', last_name: '', rank: '', role: '', flight: '', section: '' },
    {id: 2, first_name: 'Galen', last_name: '', rank: '', role: '', flight: '', section: '' },
    {id: 3, first_name: 'Keondre', last_name: '', rank: '', role: '', flight: '', section: '' }
  ]);
};
