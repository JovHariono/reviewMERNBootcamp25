const { LibAuthenticationMakeJWT } = require("../../libs/authentications");
const {
  LibHTTPResponseException
} = require("../../libs/https");
const { User } = require("./models");

const UserControllerSignUp = async (req, res) => {
  try {
    await User.create(req.cleanedData);
    const { password, ...payloadResponse } = req.cleanedData;
    return res.status(200).json(payloadResponse);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const UserControllerSignIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.cleanedData.email });
    const token = LibAuthenticationMakeJWT({ id: user._id, email: user.email });
    return res.status(200).json({ token });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

module.exports = {
  UserControllerSignUp,
  UserControllerSignIn,
};
