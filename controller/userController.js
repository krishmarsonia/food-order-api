const User = require("../models/user");
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const Cart = require('../models/cart');

exports.signup = (req, res, next) => {
  const userName = req.body.data.userName;
  // console.log(req.body.data.userName);
  const email = req.body.data.email;
  const pass = req.body.data.password;
  // console.log(req.body.data.email);
  // console.log(req.body.data.password);

  User.findOne({
    email: email,
  })
    .then((user) => {
      if (user) {
        const err = new Error("user already exist");
        err.statusCode = 403;
        throw err;
      } else {
        bcrypt
          .hash(pass, 10)
          .then((hashedPassword) => {
            const user = new User({
              userName: userName,
              email: email,
              password: hashedPassword,
            });
            // User.create({
            //   userName: userName,
            //   email: email,
            //   password: hashedPassword,
            // })
            user
              .save()
              .then((result) => {
                // console.log(result);
                res.status(201).send("User Created");
              })
              .catch((err) => {
                console.log(err);
                if (!err.statusCode) {
                  err.statusCode = 500;
                }
                // res.send("Error");
                return next(err);
              });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });
};

exports.signin = async (req, res, next) => {
  // console.log(req.body.data.email);
  const email = req.body.data.email;
  const password = req.body.data.password;
  // throw new Error('developed by developer')
  User.findOne({
    email: email,
  })
    .then((result) => {
      if (!result) {
        // res.send("Creadentials are wrong")
        const err = new Error("Creadentials are wrong");
        err.statusCode = 401;
        throw err;
      }
      // console.log(result);
      // console.log(result.email);
      // console.log(result.userName);
      bcrypt
        .compare(password, result.password)
        .then((matchedPassword) => {
          if (!matchedPassword) {
            const err = new Error("Password is incorrect");
            err.statusCode = 403;
            throw err;
          } else {
            const token = jwt.sign(
              {
                userName: result.userName,
                userId: result.id,
              },
              "secret",
              { expiresIn: "1h" }
            );
            Cart.findOne({
              userId: result._id,
            })
              .then((carts) => {
                // console.log(carts);
                const quan = carts.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                if (carts === null) {
                  const car = new Cart({
                    userId: result._id,
                    items: [],
                  });
                  car
                    .save()
                    .then(() => {
                      // console.log(carts)
                      return res.status(200).json({
                        email: result.email,
                        userName: result.userName,
                        admin: result.admin,
                        id: result._id,
                        token: token,
                        cart: carts,
                        // quantity: 0,
                      });
                    })
                    .catch((err) => console.log(err));
                } else {
                  return res.status(200).json({
                    email: result.email,
                    userName: result.userName,
                    admin: result.admin,
                    id: result._id,
                    token: token,
                    cart: carts,
                    // quantity: quan,
                  });
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });
};

// exports.PostCartAdd = (req, res, next) => {
//   var cartItems = req.body
//   console.log(cartItems);
// }

exports.postCartAdd = (req, res, next) => {
  //user ni id excaart kari ne
  var kri = [];
  // console.log(req.body.data.cartArray)
  // console.log(req.body.data.userid)
  const cartItems = req.body.data.cartArray;
  // console.log(cartItems);
  const userId = req.body.data.userid;
  // User.findById(userId).then(res => {
  //   console.log(res.cart.items)
  // }).catch(err => console.log(err))
  // console.log(cartItems)
  const maparray = cartItems.map((i) => {
    return { foodId: i._id, quantity: i.quantity };
  });
  // console.log(maparray);
  // Cart.updateOne(
  //   {_id: userId},
  //   { $push: {items: maparray}}
  // )
  Cart.findOne({
    userId: userId,
  })
    .then((res) => {
      if (!res) {
        const cartf = new Cart({
          userId: userId,
          items: cartItems,
        });
        // console.log(cartf)
        cartf
          .save()
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        Cart.findOneAndUpdate({ userId: userId }, { items: cartItems })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));

  // Cart.create
  // User.addToCart(maparray);
  // User.addToCart(function(err, result) {
  //   if(err) {
  //     console.log(err)
  //   }
  //   else{
  //     console.log(result);
  //   }
  // })
  // const first = maparray[0]
  // User.items.push(first)
  // User.save(done)
  // User.update({
  //  _id:userId
  // },
  // {$push: {items:first}}
  // )
  // User.save()
  // User.findByIdAndUpdate(userId,
  //   {$push: {"items":maparray[0]}},
  //   {safe:true, upsert:true},
  //   function(err,model){
  //     if(err){
  //       console.log(err)
  //       return res.send(err)
  //     }
  //     console.log(model);
  //     // User.save()
  //     model.save()

  //     return res.send(model)
  //   }
  //   )
  // cartItems.reduce(i => {
  //lagbag reduce function use kar va nu thase
  //stackover flow ma che
  //https://stackoverflow.com/questions/11006748/how-to-build-a-javascript-object-using-an-array-and-the-map-function

  //aiya user.findone kar su
  // console.log(i._id)
  // and pachi aiya apde user na cart ne update kar va ni try kar shu
  // })

  // console.log(newItemobj)
};

exports.existingCart = (req, res, next) => {
  console.log(req.userId);
  const id = req.userId;
  Cart.findOne({
    userId: id,
  })
    .then((carts) => {
      // console.log(carts);
      res.status(201).json({
        cart: carts,
      });
    })
    .catch((err) => console.log(err));
};

exports.existingCartCount = (req, res, next) => {
  const id = req.userId;
  Cart.findOne({
    userId: id
  }).then(cart => {
    const quan = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return res.status(201).json({
      quantity: quan
    })
  }).catch(err => console.log(err))
}
