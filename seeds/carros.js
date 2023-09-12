/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('carros').del()
  await knex('carros').insert([
  {id: 1, descricao: 'carro 1', marca: 'marca 1', valor: 3.5},
  {id: 2, descricao: 'carro 2', marca: 'marca 2', valor: 10.99},
  {id: 3, descricao: 'carro 3', marca: 'marca 3', valor: 78.99},
  {id: 4, descricao: 'carro 4', marca: 'marca 4', valor: 15.50}
  ]);
  };
