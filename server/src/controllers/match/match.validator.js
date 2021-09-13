const Joi = require('joi');

export const startMatch = {
  body: {
    id: Joi.string(),
  },
};

