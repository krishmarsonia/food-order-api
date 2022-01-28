const Food = require("../models/food");

exports.postFoodData = (req, res, next) => {
  console.log(req.body);
  const type = req.body.data.type;
  const name = req.body.data.name;
  const imageUrl = req.body.data.imageUrl;
  const price = req.body.data.price;
  const desc = req.body.data.description;

  const food = new Food({
    type: type,
    name: name,
    imageUrl: imageUrl,
    price: price,
    description: desc,
  });

  food
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Added Sucessfully", fItems: result });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });

  // Food.create({
  //   type: type,
  //   name: name,
  //   imageUrl: imageUrl,
  //   price: price,
  //   description: desc,
  // })
  // console.log("Krish");
};

exports.getFoodData = (req, res, next) => {
  Food.find()
    .then((result) => {
      // console.log(result);
      // const dib = result.map(ob => ob._id.toString())
      // console.log(dib);
      // result.map(arr => console.log(arr.name))
      // result.filter(res => res.type === 'Pizza').map(ikri => console.log(ikri.type));
      // console.log('----------------------------')
      res.status(200).json({ foodData: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
