const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

async function find() {
  return db("customers");
}

async function find_by_id(id) {
  return db("customers").where({ id });
}

async function find_by_company_id(company_id) {
  return db("customers").where({ company_id });
}

async function create(customer) {
  const id = await db("customers").insert(customer);

  return find_by_id(id);
}

async function update(id, data) {
  return db("customers")
    .where({ id })
    .update(data)
    .then(() => {
      return find_by_id(id);
    });
}

async function remove(id) {
  return db("customers").where({ id }).del();
}

module.exports = {
  find,
  find_by_id,
  find_by_company_id,
  create,
  update,
  remove,
};
