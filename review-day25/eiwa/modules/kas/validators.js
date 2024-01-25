
/**
 * These naming rules follow the following pattern:
 * 
 *  KasValidator<YourValidationPurpose>
 * 
 * For example:
 *  const KasValidationEmailExist = (value, { req }) => {}
 **/

const KasValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  KasValidator,
};
