import Joi from "joi";

export const addBoardValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
}); 