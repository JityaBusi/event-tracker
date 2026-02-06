const amqp = require('amqplib');
const processActivity = require('./activityProcessor');

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://rabbitmq:5672';
const QUEUE = 'activities';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectWithRetry(retries = 10) {
  while (retries > 0) {
    try {
      const connection = await amqp.connect(RABBIT_URL);
      const channel = await connection.createChannel();

      await channel.assertQueue(QUEUE, { durable: true });

      console.log('✅ Connected to RabbitMQ');
      console.log('📥 Waiting for messages...');

      channel.consume(QUEUE, async msg => {
        if (!msg) return;

        const event = JSON.parse(msg.content.toString());
        await processActivity(event);

        channel.ack(msg);
      });

      return;
    } catch (err) {
      console.log('⏳ RabbitMQ not ready, retrying...', retries - 1);
      retries--;
      await sleep(3000);
    }
  }

  throw new Error('❌ Could not connect to RabbitMQ');
}

module.exports = connectWithRetry;
