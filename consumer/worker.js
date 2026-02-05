const amqp = require('amqplib');
const processActivity = require('./services/activityProcessor');

const QUEUE = 'user_activities';

async function startWorker() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });

  channel.consume(QUEUE, async (msg) => {
    if (!msg) return;

    try {
      const event = JSON.parse(msg.content.toString());
      await processActivity(event);
      channel.ack(msg);
    } catch (err) {
      console.error('Processing failed', err);
      channel.nack(msg, false, true); // requeue
    }
  });
}

module.exports = { startWorker };
