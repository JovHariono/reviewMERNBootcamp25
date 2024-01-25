const { LibHTTPRouter } = require("../../libs/https");
const {
  TerimaControllerList,
  TerimaControllerCreate,
  TerimaControllerDetail,
  TerimaControllerUpdate,
  TerimaControllerDelete,
  TerimaControllerSelesai,
  TerimaControllerDiambil,
} = require("./controllers");
const {
  TerimaMiddlewareCreate,
  TerimaMiddlewareUpdate,
  TerimaMiddlewareList,
  TerimaMiddlewareDetail,
  TerimaMiddlewareDelete,
} = require("./middlewares");

const TerimaRouter = LibHTTPRouter();

TerimaRouter.get("", TerimaMiddlewareList, TerimaControllerList);
TerimaRouter.post("", TerimaMiddlewareCreate, TerimaControllerCreate);
TerimaRouter.get("/:id", TerimaMiddlewareDetail, TerimaControllerDetail);
TerimaRouter.put("/:id", TerimaMiddlewareUpdate, TerimaControllerUpdate);
TerimaRouter.put(
  "/:id/selesai/",
  TerimaMiddlewareDetail,
  TerimaControllerSelesai
);
TerimaRouter.put(
  "/:id/diambil/",
  TerimaMiddlewareDetail,
  TerimaControllerDiambil
);
TerimaRouter.delete("/:id", TerimaMiddlewareDelete, TerimaControllerDelete);

/**
 * You need to register your application in the index.js file
 * so that it can be accessed and used as an API, as in the following example:
 *
 *  // ...
 *  const { TerimaRouter } = require("./modules/terima/routers");
 *
 *  // ...
 *  LibModuleRegister(app, "terima", TerimaRouter);
 *
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  TerimaRouter,
};
