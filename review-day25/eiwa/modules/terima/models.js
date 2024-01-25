const mongoose = require("mongoose");

const TerimaSchema = new mongoose.Schema(
  {
    nomor: { type: String, unique: true, required: true },
    tanggal: { type: Date, default: Date.now },
    pelanggan: {
      nama: { type: String, required: true },
      alamat: { type: String },
      telepon: { type: String },
    },
    berat: { type: Number, default: 1 },
    total: { type: Number, default: 0 },
    uangMuka: { type: Number, default: 0 },
    sisa: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["diproses", "selesai", "diambil"],
      default: "diproses",
    },
    email: { type: String },
    items: [
      {
        nama: { type: String },
      },
    ],
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Terima = mongoose.model("Terima", TerimaSchema);

module.exports = {
  Terima,
};
