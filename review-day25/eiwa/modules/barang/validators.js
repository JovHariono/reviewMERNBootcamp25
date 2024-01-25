
/**
 * These naming rules follow the following pattern:
 * 
 *  BarangValidator<YourValidationPurpose>
 * 
 * For example:
 *  const BarangValidationEmailExist = (value, { req }) => {}
 **/

const BarangValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  BarangValidator,
};
