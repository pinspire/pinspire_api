import Joi from "joi";

export const addCategoryValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
});