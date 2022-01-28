const mongoose = require('mongoose');

const Schema = mongoose.Schema

const CartModel = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    items: [
        {
            foodId: {type:Schema.Types.ObjectId, required: false},
            type:  {type: String, required: false},
            name: {type: String, required: false},
            imageUrl: {type: String, required: false},
            price: {type: Number, required: false},
            description: {type: String, required: false},
            quantity: {type: Number, required: false}
        }
    ]
})

module.exports = mongoose.model('FoodCart', CartModel);