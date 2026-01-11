const { PrismaClient } = require("@prisma/client");
const { hashPass, comparePass } = require("../utils/password");
const { createJsonWebToken, createRefreshToken } = require("../utils/token");
const { v4: uuidv4 } = require("uuid");

const client = new PrismaClient();

const registerUser = async (name, email, password, role = "CONSUMER") => {
  const existingUser = await client.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User exists");
  // password hashing
  const hashPassword = await hashPass(password);
  const createUser = await client.user.create({
    data: { name, email, passwordHash: hashPassword, role },
  });
  return createUser;
};

const login = async (email, password) => {
  const user = await client.user.findUnique({ where: { email } });
  if (!user) throw new Error("User doesn't exist");
  const valid = await comparePass(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");
  return {
    success: true,
    message: "Login successful",
    data: {
      accessToken: createJsonWebToken({
        userId: user.id,
        role: user.role,
        jti: uuidv4(),
      }),
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      user: {
        id: user.id,
        role: user.role,
      },
    },
  };
};
module.exports = { registerUser, login };
