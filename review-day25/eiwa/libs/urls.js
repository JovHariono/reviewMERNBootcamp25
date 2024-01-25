const LibURLBuilder = (req) => {
  return req.protocol + "://" + req.get("host") + req.originalUrl;
};

module.exports = {
  LibURLBuilder,
};
