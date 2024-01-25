const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Barang } = require("./models");
const { BarangFilter } = require("./filters");

const BarangControllerList = async (req, res) => {
  try {
    // Your code here

    // example:
    // const results = YourModel.find(YourFilter(req));
    // return LibPaginationResponse(req, res, results);

    const results = Barang.find(BarangFilter(req));

    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const BarangControllerCreate = async (req, res) => {
  try {
    const result = await Barang.create(req.cleanedData);

    res.status(201).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const BarangControllerDetail = async (req, res) => {
  try {
    let barang = await Barang.findOne({ _id: req.params.id });

    if (!barang) {
      throw { status: 404, message: "Not found" };
    }

    return res.status(200).json(barang);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const BarangControllerUpdate = async (req, res) => {
  try {
    let barang = await Barang.findOne({ _id: req.params.id });
    if (!barang) throw { status: 404, message: "Not found" };

    await Barang.findByIdAndUpdate(req.params.id, req.cleanedData);

    return res.status(200).json(barang);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const BarangControllerDelete = async (req, res) => {
  try {
    let barang = await Barang.findOne({ _id: req.params.id });
    if (!barang) throw { status: 404, message: "Not found" };

    await Barang.findByIdAndDelete(req.params.id, req.cleanedData);

    res.status(204).json(null);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

module.exports = {
  BarangControllerList,
  BarangControllerCreate,
  BarangControllerDetail,
  BarangControllerUpdate,
  BarangControllerDelete,
};
