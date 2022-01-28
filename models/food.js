const mongoose = require('mongoose');

const Schema = mongoose.Schema

const FoodSchema = new Schema({
    type:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('fooddata', FoodSchema)


// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const FoodData = sequelize.define("foodData", {
//     id: {
//         type:Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     type: {
//         type:Sequelize.STRING,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     price: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.TEXT,
//         allowNull: true
//     }
// })

// module.exports = FoodData
