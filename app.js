require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT = 3001 } = process.env;
const app = express();
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/error-handler");
const routes = require("./routes");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

//Remove this code after passing review
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(express.json());
app.use(cors());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
