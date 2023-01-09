const jwt = require("jsonwebtoken");
const response = require("../utils/response");

const AuthToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return response(res, 401, "Unauthorized");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return response(res, 403, err.message);
    }

    req.email = decoded.email;

    next();
  });
};

module.exports = AuthToken;
