
const express = require('express');
const activityRoutes = require('./routes/activityRoutes');

const app = express();
app.use(express.json());

app.use('/api/v1', activityRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

if (require.main === module) {
  app.listen(process.env.API_PORT || 3000, () => {
    console.log('API running');
  });
}

module.exports = app;
