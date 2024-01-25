
const { LibHTTPRouter } = require("../../libs/https");
const {
  BarangControllerList,
  BarangControllerCreate,
  BarangControllerDetail,
  BarangControllerUpdate,
  BarangControllerDelete
} = require("./controllers");
const {
  BarangMiddlewareCreate,
  BarangMiddlewareUpdate,
  BarangMiddlewareList,
  BarangMiddlewareDetail,
  BarangMiddlewareDelete
} = require("./middlewares");

const BarangRouter = LibHTTPRouter();

BarangRouter.get("", BarangMiddlewareList, BarangControllerList);
BarangRouter.post("", BarangMiddlewareCreate, BarangControllerCreate);
BarangRouter.get("/:id", BarangMiddlewareDetail, BarangControllerDetail);
BarangRouter.put("/:id", BarangMiddlewareUpdate, BarangControllerUpdate);
BarangRouter.delete("/:id", BarangMiddlewareDelete, BarangControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { BarangRouter } = require("./modules/barang/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "barang", BarangRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  BarangRouter,
};  
