
/**
 * These naming rules follow the following pattern:
 * 
 *  HelloValidator<YourValidationPurpose>
 * 
 * For example:
 *  const HelloValidationEmailExist = (value, { req }) => {}
 **/

const HelloValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  HelloValidator,
};
