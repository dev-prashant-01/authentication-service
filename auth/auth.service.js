const { PrismaClient } = require("@prisma/client");
const { hashPass, comparePass } = require("../utils/password");
const { createJsonWebToken, createRefreshToken } = require("../utils/token");

const client = new PrismaClient();

const registerUser = async (email, password) => {
  const existingUser = await client.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User exists");
  // password hashing
  const hashPassword = await hashPass(password);
  const createUser = await client.user.create({
    data: { email, passwordHash: hashPassword },
  });
  return createUser;
};

const login = async (email, password) => {
  const user = await client.user.findUnique({ where: { email } });
  if (!user) throw new Error("User doesn't exist");
  const valid = await comparePass(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  return {
    token: createJsonWebToken({ userId: user.id, role: user.role }),
    refreshToken: createRefreshToken({ userId: user.id }),
  };
};
module.exports = { registerUser, login };
