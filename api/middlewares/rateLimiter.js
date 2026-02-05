const requests = new Map();

module.exports = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS);
  const max = Number(process.env.RATE_LIMIT_MAX_REQUESTS);

  if (!requests.has(ip)) {
    requests.set(ip, []);
  }

  const timestamps = requests.get(ip).filter(ts => now - ts < windowMs);
  timestamps.push(now);
  requests.set(ip, timestamps);

  if (timestamps.length > max) {
    const retryAfter = Math.ceil((windowMs - (now - timestamps[0])) / 1000);
    res.set('Retry-After', retryAfter);
    return res.status(429).json({ message: 'Rate limit exceeded' });
  }

  next();
};
