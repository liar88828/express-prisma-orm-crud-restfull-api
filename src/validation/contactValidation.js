import Joi from "joi";

export const createContactValidation = Joi.object({
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().max(100).email().optional(),
  phone: Joi.string().max(100).optional(),
})
export const getContactValidation = Joi.number().positive().required()