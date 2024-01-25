const { validationResult, matchedData, body } = require("express-validator");
const _ = require("lodash");

LibValidationGroup = (errors, field) => {
  const validators = _.mapValues(_.groupBy(errors, field), (clist) =>
    clist.map((error) => _.omit(error, field))
  );

  const results = {};

  for (const [key, value] of Object.entries(validators)) {
    results[key] = value.map(({ msg }) => msg);
  }

  return results;
};

const LibValidationExceptionMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(LibValidationGroup(errors.array(), "path"));
  }

  req.cleanedData = matchedData(req);

  return next();
};

const Field = ({
  field,
  widget,
  required = true,
  customs = [],
  sanitizers = [],
}) => {
  widget = widget ? widget : body;
  const fieldSet = widget(field);

  fieldSet.notEmpty().withMessage("This field not be blank").bail();

  if (!required) {
    fieldSet.optional();
  }

  for (const custom of customs) {
    fieldSet.custom(custom);
  }

  for (const sanitizer of sanitizers) {
    fieldSet.customSanitizer(sanitizer);
  }

  return fieldSet;
};

const CharField = ({ minLength = 1, maxLength = 225, ...args }) => {
  const fieldSet = Field(args);
  fieldSet
    .isLength({ min: minLength, max: maxLength })
    .withMessage(
      `This field must have a minimum of ${minLength} characters and no more than ${maxLength} characters`
    ).bail();

  return fieldSet;
};

const NumberField = ({ minLength = 1, maxLength = 20000000, ...args }) => {
  const fieldSet = Field(args);
  fieldSet
    .isNumeric()
    .withMessage("Field must be numeric value.")
    .bail()
    .isInt({ min: minLength, max: maxLength })
    .withMessage(`Fields must be at a minimum of ${minLength}`)
    .bail();

  return fieldSet;
};

const ArrayField = ({ minLength = 1, maxLength = 30, ...args }) => {
  const fieldSet = Field(args);
  fieldSet.isArray({min: minLength, max: maxLength}).withMessage(`
    The minimum length of items in the array is ${minLength} and the maximum is ${maxLength}
  `).bail()
  return fieldSet;
}

const ObjectField = ({strict= true, ...args}) => {
  const fieldSet = Field(args);
  fieldSet.isObject({strict}).withMessage(`Invalid object`).bail()
  return fieldSet;
}

const EmailField = ({host_blacklist=[], host_whitelist=[], allow_ip_domain=true, ...args}) => {
  const fieldset = Field(args);
  fieldset.isEmail({
    host_blacklist,
    host_whitelist,
    allow_ip_domain
  }).withMessage("Your email is invalid").bail()

  return fieldset
}

/**
 * DateField for date validation
 * @param format
 * @param delimeters
 * @param strictMode
 * @param args
 * @returns {*}
 * @constructor
 */
const DateField = ({format="", delimeters=[], strictMode=false, ...args}) => {
  const fieldset = Field(args);
  fieldset.isDate({format, delimeters, strictMode}).withMessage("Invalid date").bail();
  return fieldset
}

const LibValidationsMiddleware = (...args) => {
  return args;
};

module.exports = {
  LibValidationExceptionMiddleware,
  LibValidationsMiddleware,
  LibValidationFields: {
    Field,
    CharField,
    NumberField,
    ArrayField,
    ObjectField,
    EmailField,
    DateField,
  },
};
