const fs = require("fs");
const path = require("path");

const LibModuleRegister = (context, name, router) => {
  return context.use(
    `/${process.env.APP_PREFIX_ENDPOINT}/${process.env.APP_VERSION}/${name}`,
    router
  );
};

module.exports = {
  LibModuleRegister,
};
