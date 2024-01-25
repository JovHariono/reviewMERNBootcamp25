
function KasFilter(req) {
  let qSearch = {};
  const { search, limit, page, ...filters } = req.query;

  if (search) {
    qSearch = {
      $or: [
        /**
         * You can change field1 and field2 according to your needs.
         **/

        { nomorTransaksi: { $regex: ".*" + search + ".*", $options: "i" } },
        { keterangan: { $regex: ".*" + search + ".*", $options: "i" } },
        { email: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    };
  }

  return { ...filters, ...qSearch };
}

module.exports = {
  KasFilter,
};
  