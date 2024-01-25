const jwt = require("jsonwebtoken");
const { LibHTTPResponseException } = require("./https");
const { User } = require("../providers/users/models");

const LibAuthenticationMakeJWT = (payload) => {
  return jwt.sign(payload, process.env.APP_KEY, {
    expiresIn: process.env.APP_ACCESS_TOKEN_LIFETIME,
  });
};

const LibAuthenticationMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      throw { status: 401, message: "Token dibutuhkan untuk otentikasi" };
    }

    token = token.split(" ")[1];

    const result = jwt.verify(token, process.env.APP_KEY);

    if (!result) {
      throw { status: 401, message: "Token tidak valid" };
    }

    req.user = await User.findOne({ _id: result.id });

    return next();
  } catch (error) {
    if(error instanceof jwt.JsonWebTokenError){
      return res.status(401).json({ message: "Invalid Token" })
    }
    return LibHTTPResponseException(res, error);
  }
};

module.exports = {
  LibAuthenticationMakeJWT,
  LibAuthenticationMiddleware,
};
