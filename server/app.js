const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.port || 8080;

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Content-Length, Accept,Authorization,Enctype, responseType"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/", function (req, res) {
  res.status(200).send({ title: "Server is up & running" });
});

//#region [Routes]
const testCasesRoutes = require("./api/routes/test-case-route");
app.use("/api", testCasesRoutes);
//#endregion

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
