const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/db");

// routes
const authorRoute = require("./routes/authorRoute");
const bookRoute = require("./routes/bookRoute");
const genderRoute = require("./routes/genderRoute");
const memberRoute = require("./routes/memberRoute");
const loanRoute = require("./routes/loanRoute");

// load env variables
dotenv.config({path: "./config/config.env"});

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Mount routers
app.use("/api/v1/authors", authorRoute);
app.use("/api/v1/books", bookRoute);
app.use("/api/v1/genders", genderRoute);
app.use("/api/v1/members", memberRoute);
app.use("/api/v1/loans", loanRoute);

// global management middleware error /middleware de gestion des erreurs
app.use(errorHandler);

module.exports = app;