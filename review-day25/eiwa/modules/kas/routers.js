
const { LibHTTPRouter } = require("../../libs/https");
const {
  KasControllerList,
  KasControllerCreate,
  KasControllerDetail,
  KasControllerUpdate,
  KasControllerDelete
} = require("./controllers");
const {
  KasMiddlewareCreate,
  KasMiddlewareUpdate,
  KasMiddlewareList,
  KasMiddlewareDetail,
  KasMiddlewareDelete
} = require("./middlewares");

const KasRouter = LibHTTPRouter();

KasRouter.get("", KasMiddlewareList, KasControllerList);
KasRouter.post("", KasMiddlewareCreate, KasControllerCreate);
KasRouter.get("/:id", KasMiddlewareDetail, KasControllerDetail);
KasRouter.put("/:id", KasMiddlewareUpdate, KasControllerUpdate);
KasRouter.delete("/:id", KasMiddlewareDelete, KasControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { KasRouter } = require("./modules/kas/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "kas", KasRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  KasRouter,
};  
