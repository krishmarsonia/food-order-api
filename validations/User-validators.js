const yup = require('yup');

exports.postUserSignup = yup.object({
    userName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required()
})

exports.postAddcart = yup.object({
    cartArray: yup.array().required()
})