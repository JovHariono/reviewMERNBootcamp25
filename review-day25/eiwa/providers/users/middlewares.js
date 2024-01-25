const {
  LibValidationsMiddleware,
  LibValidationFields,
  LibValidationExceptionMiddleware,
} = require("../../libs/validations");
const { UserSanitizerPasswordHash } = require("./sanitizers");
const {
  UserValidatiorUsernameUnique,
  UserValidatorEmailUnique,
  UserValidatorSignIn,
  UserValidatorCheckPassword,
} = require("./validators");

const UserMiddlewareSignUp = LibValidationsMiddleware(
  LibValidationFields.CharField({
    field: "username",
    customs: [UserValidatiorUsernameUnique],
  }),
  LibValidationFields.CharField({
    field: "email",
    customs: [UserValidatorEmailUnique],
  }),
  LibValidationFields.CharField({
    field: "password",
    sanitizers: [UserSanitizerPasswordHash],
  }),
  LibValidationFields.CharField({
    field: "profile.firstName",
    required: false,
  }),
  LibValidationFields.CharField({ field: "profile.lastName", required: false }),
  LibValidationExceptionMiddleware
);

const UserMiddlewareSignIn = LibValidationsMiddleware(
  LibValidationFields.CharField({
    field: "email",
    customs: [UserValidatorSignIn],
  }),
  LibValidationFields.CharField({
    field: "password",
    customs: [UserValidatorCheckPassword],
  }),
  LibValidationExceptionMiddleware
);

module.exports = {
  UserMiddlewareSignUp,
  UserMiddlewareSignIn,
};
