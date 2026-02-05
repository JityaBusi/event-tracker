jest.mock('../services/rabbitmq', () => jest.fn());

const request = require('supertest');
const app = require('../server');
const publish = require('../services/rabbitmq');

describe('POST /api/v1/activities', () => {

  beforeEach(() => {
    publish.mockClear();
  });

  it('returns 202 and publishes event for valid payload', async () => {
    const res = await request(app)
      .post('/api/v1/activities')
      .send({
        userId: 'user-123',
        eventType: 'login',
        timestamp: new Date().toISOString(),
        payload: { device: 'desktop' }
      });

    expect(res.statusCode).toBe(202);
    expect(publish).toHaveBeenCalledTimes(1);
  });

  it('returns 400 for invalid payload', async () => {
    const res = await request(app)
      .post('/api/v1/activities')
      .send({
        eventType: 'login'
      });

    expect(res.statusCode).toBe(400);
  });
});
