const jwt = require("jsonwebtoken");
const authService = require("./auth.service");
const { extractToken } = require("../utils/token");
const redis = require("../config/redis");
const register = async (req, res) => {
  try {
    const user = await authService.registerUser(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.role
    );
    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const login = async (req, res) => {
  try {
    const tokens = await authService.login(req.body.email, req.body.password);
    res.status(200).json(tokens);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};
const logout = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const { jti, exp } = decoded;
    const ttl = exp - Math.floor(Date.now() / 1000);
    if (ttl > 0) {
      await redis.setex(`revoked:${jti}`, ttl, "true");
    }
    return res.status(204).send();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};
const me = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = { register, login, logout, me };
