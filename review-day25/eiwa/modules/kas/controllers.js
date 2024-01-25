const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Kas } = require("./models");
const { KasFilter } = require("./filters");

const KasControllerList = async (req, res) => {
  try {
    const results = Kas.find(KasFilter(req)).sort([["tanggal", -1]]);
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const KasControllerCreate = async (req, res) => {
  try {
    const result = await Kas.create({
      ...req.cleanedData,
      email: req.user.email,
    });
    return res.status(201).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const KasControllerDetail = async (req, res) => {
  try {
    const result = await Kas.findOne({ _id: req.params.id });
    if (!result) throw { status: 404, message: "Not found" };

    return res.status(200).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const KasControllerUpdate = async (req, res) => {
  try {
    const kas = await Kas.findOne({ _id: req.params.id });
    if (!kas) throw { status: 404, message: "Not found" };

    const result = await Kas.findOneAndUpdate(
      { _id: req.params.id },
      req.cleanedData,
      { new: true }
    );

    return res.status(200).json(kas);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const KasControllerDelete = async (req, res) => {
  try {
    // Your code here
    throw { status: 403, message: "Not Allowed" }
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

module.exports = {
  KasControllerList,
  KasControllerCreate,
  KasControllerDetail,
  KasControllerUpdate,
  KasControllerDelete,
};
