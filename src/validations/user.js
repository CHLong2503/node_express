import Joi from "joi";

export const signUpValidator = Joi.object({
  username: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Username cannot be empty",
    "any.required": "Username is required",
    "string.min": "Username must have at least {#limit} characters",
    "string.max": "Username must have less than {#limit + 1} characters",
  }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
    "string.email": "Email invalidate",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must have at least {#limit} characters",
    "string.max": "Password must have less than {#limit + 1} characters",
  }),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .max(255)
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "confirmPassword cannot be empty",
      "any.required": "confirmPassword is required",
      "string.min": "confirmPassword must have at least {#limit} characters",
      "string.max":
        "confirmPassword must have less than {#limit + 1} characters",
      "any.only": "confirmPassword does not match password",
    }),
  role: Joi.string(),
});

export const signInValidator = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
    "string.email": "Email invalidate",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must have at least {#limit} characters",
    "string.max": "Password must have less than {#limit + 1} characters",
  }),
});
