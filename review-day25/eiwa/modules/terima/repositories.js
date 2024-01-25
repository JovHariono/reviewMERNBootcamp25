const TerimaRepositoryHitungTotal = (berat) => {
    const harga = 10_000; //10.000 / kg
    return berat * harga;
  };
  
  const TerimaRepositoryHitungSisa = (total, uangMuka) => {
    if(uangMuka >= total){
        return 0
    } 
    return total - uangMuka;
  };
  
  const TerimaRepositorySetSisaDanTotal = (sisa, total, req) => {
    req.cleanedData.sisa = sisa;
    req.cleanedData.total = total;
    req.cleanedData.email = req.user.email
  
    return req.cleanedData
  };
  
module.exports = {
    TerimaRepositoryHitungTotal,
    TerimaRepositoryHitungSisa,
    TerimaRepositorySetSisaDanTotal,
}