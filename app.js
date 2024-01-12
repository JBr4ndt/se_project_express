require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();
const cors = require("cors");
const { errors } = require("celebrate");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/error-handler");

const routes = require("./routes");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

// Remove this code after passing review
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(express.json());

app.use(limiter);
app.use(helmet());
app.use(cors());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
