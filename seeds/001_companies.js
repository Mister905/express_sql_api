/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("companies").del();
  await knex("companies").insert([
    {
      id: 1,
      name: "Microsoft",
    },
    {
      id: 2,
      name: "Google",
    },

    {
      id: 3,
      name: "Amazon",
    },
  ]);
};
