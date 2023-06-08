const User = require("../model/User");
const jwt = require("jsonwebtoken");


const verifyToken = async (token) => {
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await User.findOne({ _id: payload._id }).exec();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = verifyToken;
