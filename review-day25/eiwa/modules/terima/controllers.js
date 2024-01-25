const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Terima } = require("./models");
const { result } = require("lodash");
const { TerimaFilter } = require("./filters");
const { TerimaServiceCreate } = require("./services");
const { KasServiceCreateFromTerima } = require("../kas/services");

const TerimaControllerList = async (req, res) => {
  try {
    const results = Terima.find(TerimaFilter(req)).sort([["created", -1]]);

    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const TerimaControllerCreate = async (req, res) => {
  try {
    req.cleanedData = TerimaServiceCreate(req);
    const result = await Terima.create(req.cleanedData);

    return res.status(200).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const TerimaControllerDetail = async (req, res) => {
  try {
    const result = await Terima.findOne({ _id: req.params.id });
    if (!result) throw { status: 404, message: "Not found" };

    return res.status(200).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const TerimaControllerUpdate = async (req, res) => {
  try {
    return res.status(403).json({ message: "Not allowed" });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const TerimaControllerSelesai = async (req, res) => {
  try {
    //periksa apakah transaksi ada / tidak
    const terima = await Terima.findOne({ _id: req.params.id });
    if (!terima) throw { status: 404, message: "Not found" };

    //periksa apakah status masih "diproses" jika iya lanjut
    //jika tidak throw error (403) Forbidden
    if (terima.status !== "diproses")
      throw { status: 403, message: "Tidak diijinkan" };

    const result = await Terima.findOneAndUpdate(
      { _id: req.params.id },
      { status: "selesai" },
      { new: true }
    );

    return res.status(200).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const TerimaControllerDiambil = async (req, res) => {
  try {
    const terima = await Terima.findOne({ _id: req.params.id });
    if (!terima) throw { status: 404, message: "Not found" };

    if (terima.status !== "selesai")
      throw { status: 403, message: "Tidak diijinkan" };

    const result = await Terima.findOneAndUpdate(
      { _id: req.params.id },
      { status: "diambil" },
      { new: true }
    );

    //buat record kas
    KasServiceCreateFromTerima(result, req);

    return res.status(200).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const TerimaControllerDelete = async (req, res) => {
  try {
    let result = Terima.findOne({ _id: req.params.id });
    if (!result) throw { status: 403, message: "Not allowed" };

    await Terima.findByIdAndDelete(req.params.id, req.cleanedData);

    return res.status(204).json(null);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

module.exports = {
  TerimaControllerList,
  TerimaControllerCreate,
  TerimaControllerDetail,
  TerimaControllerUpdate,
  TerimaControllerDelete,
  TerimaControllerSelesai,
  TerimaControllerDiambil,
};
