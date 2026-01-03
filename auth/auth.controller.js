const authService = require("./auth.service");

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(
      req.body.email,
      req.body.password
    );
    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const login = async (req, res) => {
  try {
    const tokens = await authService.login(req.body.email, req.body.password);
    res.status(201).json(tokens);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

module.exports = { register, login };
