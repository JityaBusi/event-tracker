const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    eventType: { type: String, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    payload: { type: Object, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', ActivitySchema);




// module.exports = {
//   create: jest.fn()
// };