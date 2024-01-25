const { KasRepositoryCreatePemasukkanFromTerima } = require("./repositories");

const KasServiceCreateFromTerima = async (terima, req) => {
  const tanggal = terima.tanggal;
  const total = terima.total;
  const email = req.user.email;
  const nomor = terima.nomor;

  await KasRepositoryCreatePemasukkanFromTerima(tanggal, total, email, nomor);
};

module.exports = {
    KasServiceCreateFromTerima
}
