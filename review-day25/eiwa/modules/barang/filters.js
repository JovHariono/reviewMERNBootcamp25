const _ = require("lodash");

function BarangFilter(req) {
  let qSearch = {};
  const { search, limit, page, ...filters } = req.query;

  // if (_.isArray(search) && search.length > 0) {
  //   search = search.join("");
  // }

  if (search) {
    qSearch = {
      $or: [
        /**
         * You can change field1 and field2 according to your needs.
         **/

        { nama: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    };
  }

  return { ...filters, ...qSearch };
}

module.exports = {
  BarangFilter,
};
