const {TokenExpiredError} = require("jsonwebtoken");

const LibHTTPResponseException = (res, error) => {
  if (error?.status === 401 && error?.message) {
    return res.status(error.status).json({
      detail: error.message,
    });
  } else if (error?.status === 404 && error?.message) {
    return res.status(error.status).json({
      detail: error.message,
    });
  } else if (error?.status === 403 && error?.message) {
    return res.status(error.status).json({
      detail: error.message,
    });
  } else {
    console.log("LibServiceResponseException", error);
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        detail: "Token JWT expired.",
      });
    } else {
      return res.status(500).json({
        detail: "Something when wrong!",
      });
    }

  }
};

const LibHTTPRouter = () => {
  return require("express").Router();
};

const LibHTTPGetDataOr404 = async (model, params, res) => {
  const data = await model.findOne(params);
  if (!data) {
    throw { status: 404, message: "Not Found" };
  }

  return data;
};

module.exports = {
  LibHTTPResponseException,
  LibHTTPRouter,
  LibHTTPGetDataOr404,
};
