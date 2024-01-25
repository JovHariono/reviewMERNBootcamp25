
const mongoose = require("mongoose");

const KasSchema = new mongoose.Schema(
  { 
    /** Your schema here */ 
    tanggal: { type: Date, default: Date.now},
    keterangan: { type: String, default: "No Description..."},
    pemasukkan: { type: Number, default: 0},
    pengeluaran: { type:Number, default: 0},
    email: { type: String },
    nomorTransaksi: { type: String },
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Kas = mongoose.model("Kas", KasSchema);

module.exports = {
  Kas,
};
    
