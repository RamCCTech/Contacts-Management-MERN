const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contactRoutes = require("./routes/ContactRoutes");
const authRoute = require("./routes/AuthRoute");

require("dotenv").config();

const { MONGO_URL, PORT } = process.env;

var app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use("/", contactRoutes);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
