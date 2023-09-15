/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks_table').del()
  await knex('tasks_table').insert([
    {id: 1, task_name: 'sweep', task_description: 'Clean the living room', creation_date: '2023-09-15', due_date: '2023-09-20', completion_date: '', assigned_to: 'John Doe', priority: 'Medium', assigned_by: 'Alice Smith'},
  {id: 2, task_name: 'hack', task_description: 'Work on coding project', creation_date: '2023-09-15', due_date: '2023-09-30', completion_date: '', assigned_to: 'Eva Johnson', priority: 'High', assigned_by: 'Bob Brown'},
  {id: 3, task_name: 'eat', task_description: 'Have lunch', creation_date: '2023-09-15', due_date: '2023-09-15', completion_date: '', assigned_to: 'Yourself', priority: 'Low', assigned_by: 'Self'}
]);
};
