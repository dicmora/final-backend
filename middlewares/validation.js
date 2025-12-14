const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// simple URL validator for celebrate
const validateURL = (value, helpers) => {
  if (validator.isURL(value || "")) return value;
  return helpers.error("string.uri");
};

// Signup: email, password, name (NO avatar)
const validateUserCreation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.email": "Email must be valid",
        "string.empty": "Email is required",
      }),
    password: Joi.string()
      .required()
      .min(8)
      .messages({
        "string.min": "Password must be at least 8 characters",
        "string.empty": "Password is required",
      }),
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        "string.min": "Name min length is 2",
        "string.max": "Name max length is 30",
      }),
  }),
});

// Login validation
const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Article creation
const validateArticle = celebrate({
  [Segments.BODY]: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateURL),
    image: Joi.string().required().custom(validateURL),
  }),
});

// ID validation for params
const validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateUserCreation,
  validateLogin,
  validateArticle,
  validateId,
};
