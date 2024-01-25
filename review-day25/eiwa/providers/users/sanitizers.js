const bcrypt = require("bcrypt");

const UserSanitizerPasswordHash = (password) => {
  if (!password) {
    return password;
  }

  return bcrypt.hashSync(password, 10);
};

module.exports = {
  UserSanitizerPasswordHash,
};
