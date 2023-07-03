const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "64a2a84bb310215c88751446",
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
