
/**
 * These naming rules follow the following pattern:
 * 
 *  TerimaValidator<YourValidationPurpose>
 * 
 * For example:
 *  const TerimaValidationEmailExist = (value, { req }) => {}
 **/

const TerimaValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  TerimaValidator,
};
