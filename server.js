const express = require("express");

const app = express();

app.use(express.json());

// ROUTES

const companies = require("./routes/companies");
app.use("/api/companies", companies);

const customers = require("./routes/customers");
app.use("/api/customers", customers);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
