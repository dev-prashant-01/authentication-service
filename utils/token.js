const jwt = require("jsonwebtoken");

const createJsonWebToken = (payload) => {
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
const createRefreshToken = (payload) => {
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

module.exports = { createJsonWebToken, createRefreshToken };
