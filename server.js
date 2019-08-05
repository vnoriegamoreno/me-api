require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const subscribersRouter = require("./routes/subscribers");

// init express
const app = express();

// middlewares
app.use(express.json());
app.use("/subscribers", subscribersRouter);

// connect to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to the database"));

// listen the app
const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server is running on port ${PORT}`));
