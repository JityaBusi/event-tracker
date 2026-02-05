// const request = require('supertest');
// const app = require('../server');

// // 👇 THIS is the mock
// jest.mock('../services/rabbitmq', () => jest.fn());

// const publish = require('../services/rabbitmq');

// describe('POST /api/v1/activities', () => {

//   beforeEach(() => {
//     publish.mockClear();
//   });

//   it('publishes event for valid request', async () => {
//     const res = await request(app)
//       .post('/api/v1/activities')
//       .send({
//         userId: 'user-123',
//         eventType: 'login',
//         timestamp: new Date().toISOString(),
//         payload: { device: 'mobile' }
//       });

//     expect(res.statusCode).toBe(202);
//     expect(publish).toHaveBeenCalledTimes(1);
//   });
// });


jest.mock('../services/rabbitmq', () => jest.fn());

const request = require('supertest');
const app = require('../server');
const publish = require('../services/rabbitmq');

describe('Activity API', () => {
  it('publishes event', async () => {
    const res = await request(app)
      .post('/api/v1/activities')
      .send({
        userId: '1',
        eventType: 'login',
        timestamp: new Date().toISOString(),
        payload: {}
      });

    expect(res.statusCode).toBe(202);
    expect(publish).toHaveBeenCalled();
  });
});

