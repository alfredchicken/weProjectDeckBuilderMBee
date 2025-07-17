import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[^<>]*$/)
    .required()
    .messages({
      "string.pattern.base": "Username must not contain < or >",
      "string.empty": "Username is required",
    }),
  email: Joi.string()
    .email()
    .pattern(/^[^<>]*$/)
    .required()
    .messages({
      "string.pattern.base": "Email must not contain < or >",
      "string.email": "Invalid email address",
      "string.empty": "Email is required",
    }),
  password: Joi.string().min(8).pattern(/[A-Z]/, "uppercase").pattern(/\d/, "number").required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.pattern.name": "Password must contain at least one uppercase letter and one number",
    "string.empty": "Password is required",
  }),
  recaptchaToken: Joi.string().required(),
});

export default userSchema;
