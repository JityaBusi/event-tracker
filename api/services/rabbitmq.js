const amqp = require('amqplib');

let channel;

async function connect() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('user_activities', { durable: true });
}

module.exports = async (event) => {
  if (!channel) await connect();
  channel.sendToQueue(
    'user_activities',
    Buffer.from(JSON.stringify(event)),
    { persistent: true }
  );
};
