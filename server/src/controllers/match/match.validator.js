const Joi = require('joi');

export const startMatch = {
  body: Joi.object({
    id: Joi.string(),
    teams: Joi.object(
      {
        East: Joi.string().required(),
        West: Joi.string().required(),
      }
    ),
    matchDuration: Joi.number().required()
  }),
};

export const addScoreToTeam = {
  body: Joi.object(
    {
      matchID: Joi.string().required(),
      conference: Joi.string().required(),
      score: Joi.number().required()
    }
  )
}


