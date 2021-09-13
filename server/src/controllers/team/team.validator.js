import Joi from 'joi';

export const addTeam = {
    body: Joi.object({
        id: Joi.string(),
        name: Joi.string().required(),
        conference: Joi.string().required(),
        abbr: Joi.string(),
        city: Joi.string(),
        division: Joi.string(),
    }),
};

