// const Activity = require('../models/activityModel');

// async function processActivity(event) {
//   return Activity.create({
//     id: event.id,
//     userId: event.userId,
//     eventType: event.eventType,
//     timestamp: event.timestamp,
//     payload: event.payload,
//   });
// }

// module.exports = processActivity;




const Activity = require('../models/activityModel');

async function processActivity(event) {
  return Activity.create({
    id: event.id,
    userId: event.userId,
    eventType: event.eventType,
    timestamp: new Date(event.timestamp),
    payload: event.payload,
    processedAt: new Date()
  });
}

module.exports = processActivity;
