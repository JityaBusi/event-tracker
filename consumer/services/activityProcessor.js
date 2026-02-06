const amqp = require('amqplib');

const RABBIT_URL = 'amqp://rabbitmq:5672';
const QUEUE = 'activities';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectWithRetry(retries = 10) {
  try {
    const connection = await amqp.connect(RABBIT_URL);
    console.log('Connected to RabbitMQ');
    return connection;
  } catch (err) {
    if (retries === 0) {
      throw err;
    }
    console.log('RabbitMQ not ready, retrying in 3s...');
    await wait(3000);
    return connectWithRetry(retries - 1);
  }
}

module.exports = async function connectRabbit() {
  const connection = await connectWithRetry();
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, {
    durable: true
  });

  return channel;
};
