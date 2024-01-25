const { LibHTTPRouter } = require("../../libs/https");
const { UserControllerSignUp, UserControllerSignIn } = require("./controllers");
const { UserMiddlewareSignUp, UserMiddlewareSignIn } = require("./middlewares");

const UserRouter = LibHTTPRouter();

UserRouter.post("/signup", [UserMiddlewareSignUp], UserControllerSignUp);
UserRouter.post("/signin", [UserMiddlewareSignIn], UserControllerSignIn);

module.exports = {
  UserRouter,
};
