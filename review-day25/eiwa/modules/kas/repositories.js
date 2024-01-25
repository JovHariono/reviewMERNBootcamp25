const { Kas } = require("./models");

const KasRepositoryCreatePemasukkanFromTerima = async (tanggal, total, email, nomor) => {
  await Kas.create({
    tanggal: tanggal,
    pemasukkan: total,
    email: email,
    nomorTransaksi: nomor,
  });
};

const KasRepositoryCreatePengeluaran = () => {};


module.exports = {
    KasRepositoryCreatePemasukkanFromTerima,
}