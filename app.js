const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
// const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

// require("./models/user");
require("./models/food");

const userRoutes = require("./Routes/userRoutes");
const foodRoutes = require("./Routes/foodRoutes");
const testRoutes = require("./Routes/testRoutes");

// const sequelize = require("./util/database");

app.use(cors());

app.use(bodyparser.json());

app.get("/dataPost", (req, res, next) => {
  res.json([
    { Name: "krish", age: "50" },
    { Name: "Krinix", age: "18" },
  ]);
});
app.use(userRoutes);
app.use(foodRoutes);
app.use(testRoutes);

app.use((error, req, res, next) => {
  console.log(error.message);
  const status = error.statusCode || 422;
  const message = error.message;
  const err = new Error();
  err.status = status;
  res.status(status).json({ message: message, err: err });
});

// sequelize
//   .sync()
//   .then((result) => {
//     // console.log(result);
//     app.listen(5050, ()=>{
//         console.log('Server running');
//     })
//   })
//   .catch((err) => console.log(err));

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    module.exports = app.listen(5050, () => console.log("Server Running"));
  })
  .catch((err) => console.log(err));
