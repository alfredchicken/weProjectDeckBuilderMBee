import Joi from "joi";

const cardSchema = Joi.object({
  cardID: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  attack: Joi.number().required(),
  playcost: Joi.number().required(),
  imgURL: Joi.string().required(),
  rarity: Joi.string().required(),
  cardtype: Joi.string().required(),
  tribe: Joi.string().required(),
  flipover: Joi.boolean().required(),
});

export default cardSchema;
