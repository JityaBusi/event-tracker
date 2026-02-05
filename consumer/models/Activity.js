const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: { type: String, unique: true },
  userId: String,
  eventType: String,
  timestamp: Date,
  processedAt: { type: Date, default: Date.now },
  payload: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('Activity', schema);
