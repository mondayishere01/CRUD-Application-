require("./src/db/mySQLConnet");
const express = require("express");
const AllFunction = require("./src/routes/allFuntions");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(AllFunction);

app.listen(port, () => {
  console.log("Server started on port 3000");
});
