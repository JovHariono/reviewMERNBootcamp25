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

const KasMiddlewareList = LibValidationsMiddleware(LibAuthenticationMiddleware);

const KasMiddlewareDetail = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const KasMiddlewareCreate = LibValidationsMiddleware(
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
   *    customs: [KasValidatorField3Unique],
   *  }),
   *  LibValidationFields.CharField({
   *    field: "field4",
   *    sanitizers: [KasSanitizerField4ToHash],
   *  }),
   *  ...
   */
  // LibValidationFields.DateField({ field: "tanggal", format: "YYYY-MM-DD" }),
  LibValidationFields.CharField({ field: "keterangan" }),
  LibValidationFields.NumberField({
    field: "pemasukkan",
    required: false,
    minLength: 0,
  }),
  LibValidationFields.NumberField({
    field: "pengeluaran",
    required: false,
    minLength: 0,
  }),
  LibValidationFields.CharField({ field: "nomorTransaksi", required: false }),
  LibValidationExceptionMiddleware
);

const KasMiddlewareUpdate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */
  LibValidationFields.DateField({ field: "tanggal", format: "YYYY-MM-DD" }),
  LibValidationFields.CharField({ field: "keterangan" }),
  LibValidationFields.NumberField({
    field: "pemasukkan",
    required: false,
    minLength: 0,
  }),
  LibValidationFields.NumberField({ field: "pengeluaran", required: false }),
  LibValidationFields.CharField({ field: "nomorTransaksi", required: false }),
  LibValidationExceptionMiddleware
);

const KasMiddlewareDelete = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

module.exports = {
  KasMiddlewareCreate,
  KasMiddlewareUpdate,
  KasMiddlewareDetail,
  KasMiddlewareList,
  KasMiddlewareDelete,
};
