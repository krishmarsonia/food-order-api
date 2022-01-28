const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModel = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: "false",
  },
  //Schema.Types.ObjectId
  cart: {
    items: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: 'fooddata', required: false},
        quantity: {
          type: Number,
          required: false
        }
      },
    ],
  },
});

UserModel.statics.addToCart = function(foodItems) {
  const updatedFoodCart = {
    items: foodItems
  }
  this.cart = updatedFoodCart
  return this.save()
}

module.exports = mongoose.model("users", UserModel);



// const Sequelize = require("sequelize");
// const { object } = require("webidl-conversions");

// const sequelize = require("../util/database");

// const food = require("./food");

// const user = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   userName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   admin: {
//     type: Sequelize.BOOLEAN,
//     allowNull: true,
//     defaultValue: false,
//   },
//   cart: {
//     items: [
//       {
//         foodId: {
//           type: Sequelize.INTEGER,
//           autoIncrement: true,
//           allowNull: true,
//           primaryKey: true,
//         },
//         quantity: {
//           type: Sequelize.INTEGER,
//           allowNull: true
//         }
//       },
//     ],
//   },
//   cart :{
//     type: Sequelize.STRING,
//     get: function() {
//       return JSON.parse(this.getDataValue('cart'))
//     },
//     set: function(val) {
//       return this.setDataValue('cart', JSON.stringify(val))
//     }
//   },
//   carts: [
//     {
//       foodId: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: true,
//         primaryKey: true,
//       },
//       quantity: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//       },
//     },
//   ],
// });

// food.hasMany(user, {
//   foreignKey: 'foodId'
// })

// module.exports = user;
