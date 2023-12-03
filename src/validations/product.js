import Joi from "joi";

const productValidator = Joi.object({
  name: Joi.string().required().min(3),
  price: Joi.number().required(),
  description: Joi.string(),
  categoryId: Joi.string().required(),
});

export default productValidator;
