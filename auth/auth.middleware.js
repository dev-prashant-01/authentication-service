const jwt = require("jsonwebtoken");
const redis = require("../config/redis");

const authenticate = async (req, res, next) => {
  const authValue = req.headers.authorization;

  if (!authValue || !authValue.startsWith("Bearer ")) {
    return res.status(401).json("Autherization token Missing");
  }
  const token = authValue.split(" ")[1].trim();
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decoded_token.jti) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const revoked = await redis.exists(`revoked:${decoded_token.jti}`);
    if (revoked) {
      return res.status(401).json({ message: "Token revoked" });
    }
    req.user = {
      id: decoded_token.userId,
      role: decoded_token.role,
    };
    next();
  } catch (error) {
    return res.status(401).json("Invalid or expired token");
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json("It's forbidden");
    }
    next();
  };
};

module.exports = { authenticate, authorizeRole };
