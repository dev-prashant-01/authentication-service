const bcrypt = require("bcrypt");

const hashPass = (pass) => bcrypt.hash(pass, 15);
const comparePass = (pass, hash) => bcrypt.compare(pass, hash);

module.exports = { hashPass, comparePass };
