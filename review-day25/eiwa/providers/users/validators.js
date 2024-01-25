const { User } = require("./models");
const bcrypt = require("bcrypt");

const UserValidatorEmailUnique = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("Email sudah terdaftar");
  }
};

const UserValidatorSignIn = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email belum terdaftar");
  }
};

const UserValidatiorUsernameUnique = async (username) => {
  const user = await User.findOne({ username });

  if (user) {
    throw new Error("Username sudah terdaftar");
  }
};

const UserValidatorCheckPassword = async (password, { req }) => {
  const user = await User.findOne({ email: req.body.email });

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Password tidak valid.");
  }
};

module.exports = {
  UserValidatiorUsernameUnique,
  UserValidatorEmailUnique,
  UserValidatorSignIn,
  UserValidatorCheckPassword,
};
