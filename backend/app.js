const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const cors = require("cors");

// import routes
const todos = require("./routes/todo_routes");

// MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "1gb",
    extended: true,
  })
);

app.use(cors());
app.use("/api", todos);

// PORT
const port = 8000;

// SERVER START AT PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
