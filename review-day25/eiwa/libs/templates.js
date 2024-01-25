const LibTemplateController = (sanitizeName) => {
  return `
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");

const ${sanitizeName}ControllerList =  async (req, res) => {
  try {
    // Your code here

    // example:
    // const results = YourModel.find(YourFilter(req));
    // return LibPaginationResponse(req, res, results);


    res.status(201).json({
      controller: "${sanitizeName}ControllerList",
      query: req.query
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const ${sanitizeName}ControllerCreate = async (req, res) => {
  try {
    // Your code here
    res.status(201).json({
      controller: "${sanitizeName}ControllerCreate",
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const ${sanitizeName}ControllerDetail = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "${sanitizeName}ControllerDetail",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const ${sanitizeName}ControllerUpdate = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "${sanitizeName}ControllerUpdate",
      params: req.params,
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const ${sanitizeName}ControllerDelete = async (req, res) => {
  try {
    // Your code here
    res.status(204).json({
      controller: "${sanitizeName}ControllerDelete",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  ${sanitizeName}ControllerList,
  ${sanitizeName}ControllerCreate,
  ${sanitizeName}ControllerDetail,
  ${sanitizeName}ControllerUpdate,
  ${sanitizeName}ControllerDelete,
};
`;
};

const LibTemplateModel = (sanitizeName) => {
  return `
const mongoose = require("mongoose");

const ${sanitizeName}Schema = new mongoose.Schema(
  { 
    /** Your schema here */ 
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const ${sanitizeName} = mongoose.model("${sanitizeName}", ${sanitizeName}Schema);

module.exports = {
  ${sanitizeName},
};
    
`;
};

const LibTemplateMiddleware = (sanitizeName) => {
  return `
const { LibAuthenticationMiddleware } = require("../../libs/authentications");
const {
  LibValidationExceptionMiddleware,
  LibValidationFields,
  LibValidationsMiddleware,
} = require("../../libs/validations");

/**
 * If you want to remove JWT authentication, 
 * you can remove 'LibAuthenticationMiddleware' from your middleware list.
 */

const ${sanitizeName}MiddlewareList = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const ${sanitizeName}MiddlewareDetail = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const ${sanitizeName}MiddlewareCreate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */

  /**
   * "LibValidationExceptionMiddleware" is suitable for validating data sent by the client in body. 
   * If you have your own handler, you can replace it.
   * 
   * For example:
   *  ...
   *  LibValidationFields.CharField({ field: "field1" }),
   *  LibValidationFields.CharField({ field: "field2" }),
   *  LibValidationFields.CharField({
   *    field: "field3",
   *    customs: [${sanitizeName}ValidatorField3Unique],
   *  }),
   *  LibValidationFields.CharField({
   *    field: "field4",
   *    sanitizers: [${sanitizeName}SanitizerField4ToHash],
   *  }),
   *  ...
   */

  LibValidationExceptionMiddleware,
);

const ${sanitizeName}MiddlewareUpdate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */
  LibValidationExceptionMiddleware,
);

const ${sanitizeName}MiddlewareDelete = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

module.exports = {
  ${sanitizeName}MiddlewareCreate,
  ${sanitizeName}MiddlewareUpdate,
  ${sanitizeName}MiddlewareDetail,
  ${sanitizeName}MiddlewareList,
  ${sanitizeName}MiddlewareDelete,
};
  `;
};

const LibTemplateRouter = (sanitizeName, moduleName) => {
  return `
const { LibHTTPRouter } = require("../../libs/https");
const {
  ${sanitizeName}ControllerList,
  ${sanitizeName}ControllerCreate,
  ${sanitizeName}ControllerDetail,
  ${sanitizeName}ControllerUpdate,
  ${sanitizeName}ControllerDelete
} = require("./controllers");
const {
  ${sanitizeName}MiddlewareCreate,
  ${sanitizeName}MiddlewareUpdate,
  ${sanitizeName}MiddlewareList,
  ${sanitizeName}MiddlewareDetail,
  ${sanitizeName}MiddlewareDelete
} = require("./middlewares");

const ${sanitizeName}Router = LibHTTPRouter();

${sanitizeName}Router.get("", ${sanitizeName}MiddlewareList, ${sanitizeName}ControllerList);
${sanitizeName}Router.post("", ${sanitizeName}MiddlewareCreate, ${sanitizeName}ControllerCreate);
${sanitizeName}Router.get("/:id", ${sanitizeName}MiddlewareDetail, ${sanitizeName}ControllerDetail);
${sanitizeName}Router.put("/:id", ${sanitizeName}MiddlewareUpdate, ${sanitizeName}ControllerUpdate);
${sanitizeName}Router.delete("/:id", ${sanitizeName}MiddlewareDelete, ${sanitizeName}ControllerDelete);

/**
 * You need to register your application in the index.js file 
 * so that it can be accessed and used as an API, as in the following example:
 *  
 *  // ...
 *  const { ${sanitizeName}Router } = require("./modules/${moduleName}/routers");
 *  
 *  // ...
 *  LibModuleRegister(app, "${moduleName}", ${sanitizeName}Router);
 * 
 * Copy and paste the registration code above inside your index.js file.
 * Run the application and try accessing your API with a client tool such as postman.
 */

module.exports = {
  ${sanitizeName}Router,
};  
`;
};

const LibTemplateValidator = (sanitizeName) => {
  return `
/**
 * These naming rules follow the following pattern:
 * 
 *  ${sanitizeName}Validator<YourValidationPurpose>
 * 
 * For example:
 *  const ${sanitizeName}ValidationEmailExist = (value, { req }) => {}
 **/

const ${sanitizeName}Validator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  ${sanitizeName}Validator,
};
`;
};

const LibTemplateFilter = (sanitizeName) => {
  return `
function ${sanitizeName}Filter(req) {
  let qSearch = {};
  const { search, limit, page, ...filters } = req.query;

  if (search) {
    qSearch = {
      $or: [
        /**
         * You can change field1 and field2 according to your needs.
         **/

        { field1: { $regex: ".*" + search + ".*", $options: "i" } },
        { field2: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    };
  }

  return { ...filters, ...qSearch };
}

module.exports = {
  ${sanitizeName}Filter,
};
  `;
};

module.exports = {
  LibTemplateController,
  LibTemplateModel,
  LibTemplateFilter,
  LibTemplateMiddleware,
  LibTemplateRouter,
  LibTemplateValidator,
};
