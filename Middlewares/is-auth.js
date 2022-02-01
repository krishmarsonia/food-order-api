const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // console.log(req.get('Authorization'))
  const token = req.get("Authorization");
  if(!token){
    const error = new Error('No Authorization Header is present');
    error.statusCode = 500;
    throw error
  }
  const header = token.split(" ")[1];
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
