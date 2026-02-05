const amqp = require('amqplib');
const mongoose = require('mongoose');
const Activity = require('./models/Activity');

(async () => {
  await mongoose.connect(process.env.DATABASE_URL);

  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue('user_activities', { durable: true });

  channel.consume('user_activities', async (msg) => {
    try {
      const data = JSON.parse(msg.content.toString());
      await Activity.create(data);
      channel.ack(msg);
    } catch (err) {
      console.error(err);
      channel.nack(msg, false, true); // requeue
    }
  });
})();
