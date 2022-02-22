/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("customers").del();
  await knex("customers").insert([
    {
      id: 1,
      company_id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      company_id: 2,
      name: "Jane Doe",
    },

    {
      id: 3,
      company_id: 3,
      name: "Abe Lincoln",
    },
  ]);
};
