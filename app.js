const express = require("express");

require('dotenv').config();

require("./models/user");
require("./models/food");

const bodyparser = require("body-parser");

const userRoutes = require("./Routes/userRoutes");
const foodRoutes = require("./Routes/foodRoutes");
const testRoutes = require("./Routes/testRoutes");

const cors = require("cors");

// const jwt = require('jsonwebtoken')
// const sequelize = require("./util/database");
const mongoose = require("mongoose");

const app = express();

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

mongoose.connect(
  process.env.MONGODB_URI
).then(result => app.listen(5050, () => console.log("Server Running"))).catch(err => console.log(err));
