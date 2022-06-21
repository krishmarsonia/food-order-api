const yup = require("yup");

exports.postAddFood = yup.object({
  type: yup.string().required(),
  name: yup.string().required(),
  imageUrl: yup.string().required(),
  price: yup.number,
  description: yup.string().required(),
});

