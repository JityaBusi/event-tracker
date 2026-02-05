const Joi = require('joi');
const { v4: uuid } = require('uuid');
const publish = require('../services/rabbitmq');

const schema = Joi.object({
  userId: Joi.string().required(),
  eventType: Joi.string().min(1).required(),
  timestamp: Joi.date().iso().required(),
  payload: Joi.object().required()
});

exports.createActivity = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const event = {
    id: uuid(),
    ...value
  };

  try {
    await publish(event);
    return res.status(202).json({ message: 'Event accepted' });
  } catch (err) {
    return res.status(500).json({ error: 'Queue unavailable' });
  }
};
