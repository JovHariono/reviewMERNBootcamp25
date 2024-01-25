
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");

const HelloControllerList =  async (req, res) => {
  try {
    // Your code here

    // example:
    // const results = YourModel.find(YourFilter(req));
    // return LibPaginationResponse(req, res, results);


    res.status(201).json({
      controller: "HelloControllerList",
      query: req.query
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const HelloControllerCreate = async (req, res) => {
  try {
    // Your code here
    res.status(201).json({
      controller: "HelloControllerCreate",
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const HelloControllerDetail = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "HelloControllerDetail",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const HelloControllerUpdate = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "HelloControllerUpdate",
      params: req.params,
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const HelloControllerDelete = async (req, res) => {
  try {
    // Your code here
    res.status(204).json({
      controller: "HelloControllerDelete",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  HelloControllerList,
  HelloControllerCreate,
  HelloControllerDetail,
  HelloControllerUpdate,
  HelloControllerDelete,
};
