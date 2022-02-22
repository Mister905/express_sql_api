const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Company = require("../models/Company");
const Customer = require("../models/Customer");

// @route GET /api/customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    console.log(customers);
    return res.send(customers);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/customers/:customer_id
router.get("/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const customer = await Customer.find_by_id(customer_id);
    return res.send(customer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/customers/company/:company_id
router.get("/company/:company_id", async (req, res) => {
  try {
    const { company_id } = req.params;
    const customers = await Customer.find_by_company_id(company_id);
    console.log(customers);
    return res.send(customers);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/customers
router.post(
  "/",
  [check("name", "Customer name is a required field").not().isEmpty()],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const customer = await Customer.create(req.body);
      return res.send(customer);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/customers/:customer_id
router.put(
  "/:customer_id",
  [check("name", "Customer name is a required field").not().isEmpty()],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { customer_id } = req.params;

    try {
      const updated_customer = await Customer.update(customer_id, req.body);

      return res.send(updated_customer);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route GET /api/customers/:customer_id
router.get("/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const customer = await Customer.find_by_id(customer_id);
    return res.send(customer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /api/customer/:customer_id
router.delete("/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;

    await Customer.remove(customer_id);

    return res.send("Company deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
