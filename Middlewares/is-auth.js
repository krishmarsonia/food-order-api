const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // console.log(req.get('Authorization'))
  const header = req.get("Authorization").split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(header, "secret");
  } catch (err) {
    err.message = "Please sign in to use this facility";
    err.statusCode = 500;
    throw err;
  }
  if (!decodeToken) {
    const error = new Error("Not Authenciated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodeToken.userId;
  next();
};
