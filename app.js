const express = require("express");
const logger = require("./logger");

const app = express();

//applies anything comes after /api
app.use("/api", logger);
s;

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
