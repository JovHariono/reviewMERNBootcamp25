
const mongoose = require("mongoose");

const BarangSchema = new mongoose.Schema(
  { 
    /** Your schema here */ 
    nama: { type: String, required: true},
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Barang = mongoose.model("Barang", BarangSchema);

module.exports = {
  Barang,
};
    
