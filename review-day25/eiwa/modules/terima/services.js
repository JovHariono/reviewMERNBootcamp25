const { TerimaRepositoryHitungTotal, TerimaRepositoryHitungSisa, TerimaRepositorySetSisaDanTotal } = require("./repositories");

const TerimaServiceCreate = (req) => {
  const total = TerimaRepositoryHitungTotal(req.cleanedData.berat);
  const sisa = TerimaRepositoryHitungSisa(total, req.cleanedData.uangMuka);

  return TerimaRepositorySetSisaDanTotal(sisa, total, req)
};

module.exports = {
    TerimaServiceCreate
}