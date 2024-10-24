import Joi from 'joi';

export const registerSchema = Joi.object({
    fullname: Joi.string().max(100).required(),
    gender: Joi.string().valid('male', 'female').required(),
    email: Joi.string().required(),
    username: Joi.string().required().min(5).max(20),
    role: Joi.string().valid('regular-user').required(),
    password: Joi.string().required().min(10).max(40)
})