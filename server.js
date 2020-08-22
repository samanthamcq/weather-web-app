require("./backend/config/config");
require("./backend/models/db");

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;
const routesIndex = require("./backend/routes/index.router");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Create link to Angular build directory
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api", routesIndex);
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});
// Index Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

const server = app.listen(port, function() {
  console.log("Listening on port " + port);
});
