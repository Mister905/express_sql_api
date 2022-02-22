const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Company = require("../models/Company");

// @route GET /api/companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    return res.send(companies);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/companies/:company_id
router.get("/:company_id", async (req, res) => {
  try {
    const { company_id } = req.params;
    const company = await Company.find_by_id(company_id);
    return res.send(company);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/companies
router.post(
  "/",
  [check("name", "Company name is a required field").not().isEmpty()],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const company = await Company.create(req.body);
      return res.send(company);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/companies/:company_id
router.put(
  "/:company_id",
  [check("name", "Company name is a required field").not().isEmpty()],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { company_id } = req.params;

    try {
      const updated_company = await Company.update(company_id, req.body);

      return res.send(updated_company);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route DELETE /api/companies/:company_id
router.delete("/:company_id", async (req, res) => {
  try {
    const { company_id } = req.params;

    await Company.remove(company_id);

    return res.send("Company deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
