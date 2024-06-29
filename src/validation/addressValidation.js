import Joi from "joi";

export const createAddressValidation = Joi.object({
  street: Joi.string().max(255).required(),
  city: Joi.string().max(100).required(),
  province: Joi.string().max(100).required(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.string().max(10).required(),
})

export const getAddressValidation = Joi.number().min(1).positive().required()

export const updateAddressValidation = Joi.object({
  id: Joi.number().min(1).positive().required(),
  // contactId: Joi.number().min(1).positive().required(),
  street: Joi.string().max(255).required(),
  city: Joi.string().max(100).required(),
  province: Joi.string().max(100).required(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.string().max(10).required(),
})