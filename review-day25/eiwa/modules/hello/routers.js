
const { LibHTTPRouter } = require("../../libs/https");
const {
  HelloControllerList,
  HelloControllerCreate,
  HelloControllerDetail,
  HelloControllerUpdate,
  HelloControllerDelete
} = require("./controllers");
const {
  HelloMiddlewareCreate,
  HelloMiddlewareUpdate,
  HelloMiddlewareList,
  HelloMiddlewareDetail,
  HelloMiddlewareDelete
} = require("./middlewares");

const HelloRouter = LibHTTPRouter();

HelloRouter.get("", HelloMiddlewareList, HelloControllerList);
HelloRouter.post("", HelloMiddlewareCreate, HelloControllerCreate);
HelloRouter.get("/:id", HelloMiddlewareDetail, HelloControllerDetail);
HelloRouter.put("/:id", HelloMiddlewareUpdate, HelloControllerUpdate);
HelloRouter.delete("/:id", HelloMiddlewareDelete, HelloControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { HelloRouter } = require("./modules/hello/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "hello", HelloRouter);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  HelloRouter,
};  
