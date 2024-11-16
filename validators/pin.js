import Joi from "joi";

export const addPinValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    //price: Joi.string().required(),
    category: Joi.string().required(),
    //user: Joi.string().required(),
});

export const updatePinValidator = Joi.object({
    //title: Joi.string(),
    //description: Joi.string(),
    image: Joi.string(),
    //price: Joi.string(),
    //category: Joi.string(),
});