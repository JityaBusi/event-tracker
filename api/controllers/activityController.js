const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const publish = require('../services/rabbitmq');

/**
 * Validation schema for incoming activity events
 * Matches assignment requirements exactly
 */
const activitySchema = Joi.object({
  userId: Joi.string().required(),
  eventType: Joi.string().min(1).required(),
  timestamp: Joi.string().isoDate().required(),
  payload: Joi.object().required()
});

exports.createActivity = async (req, res) => {
  // Validate request body
  const { error, value } = activitySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  // Construct event message
  const event = {
    id: uuidv4(),
    userId: value.userId,
    eventType: value.eventType,
    timestamp: value.timestamp,
    payload: value.payload
  };

  try {
    // Publish event to RabbitMQ
    await publish(event);

    // Asynchronous acceptance
    return res.status(202).json({
      message: 'Activity event accepted'
    });
  } catch (err) {
    console.error('RabbitMQ publish failed:', err.message);

    return res.status(500).json({
      error: 'Failed to enqueue activity event'
    });
  }
};
