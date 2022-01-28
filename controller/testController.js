const mongoose = require("mongoose");

const User = require("../models/user");
const Food = require("../models/food");
const Cart = require("../models/cart");
// const {ObjectId} = require('mongoose')

exports.datatest = (req, res, next) => {
  const ids = mongoose.Types.ObjectId("61deda3ea67f6ff3de1fc0ec");
  // const ids = mongoose.Types.ObjectID.fromHexString("4eb6e7e7e9b7f4194e000001")

  // console.log(ids)
  Cart.findOne({
    _id: ids,
  })
    .then((r) => {
      // console.log(r.items);
      const items = r.items;

      const arrmap = items.map(({ name, quantity }) => ({ name, quantity }));
      // console.log(arrmap)

      var newmaparr = arrmap.map((tes) => {
        console.log(tes.name);
        Food.findOne({
          name: tes.name,
        })
          .then((z) => console.log(z))
          .catch((err) => console.log(err));
      });
      // console.log(newmaparr)
      return res.status(200).json({
        status: "Good",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json({
        status: "not good",
      });
    });
};
