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

  return food
    .save()
    .then((result) => {
      return res.json({ message: "Added Sucessfully", fItems: result });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });
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
      return res.json({ foodData: result });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });
};

exports.testFood = (req, res, next) => {
  const foodArray = [
    {
      id: 1,
      name: "pizza",
      desc: "amazing pizza",
    },
    {
      id: 2,
      name: "sandwich",
      desc: "amazing sandwich",
    },
    {
      id: 3,
      name: "burger",
      desc: "amazing burger",
    },
  ];
  res.json({foodData: foodArray, status:200});
};
