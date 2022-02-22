const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

async function find() {
  return db("companies");
}

async function find_by_id(id) {
  return db("companies").where({ id });
}

async function create(company) {
  const id = await db("companies").insert(company);

  return find_by_id(id);
}

async function update(id, data) {
  return db("companies")
    .where({ id })
    .update(data)
    .then(() => {
      return find_by_id(id);
    });
}

async function remove(id) {
  return db("companies").where({ id }).del();
}

module.exports = {
  find,
  find_by_id,
  create,
  update,
  remove,
};
