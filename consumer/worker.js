const amqp = require('amqplib');
const processActivity = require('./services/activityProcessor');

const QUEUE = 'user_activities';

async function startWorker() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, { durable: true });

  console.log('🟢 Worker waiting for messages...');

  channel.consume(QUEUE, async (msg) => {
    if (!msg) return;

    try {
      const event = JSON.parse(msg.content.toString());
      await processActivity(event);

      channel.ack(msg); // ✅ VERY IMPORTANT
    } catch (err) {
      console.error('❌ Processing failed:', err.message);

      // Requeue message for retry
      channel.nack(msg, false, true);
    }
  });
}

startWorker().catch(console.error);
