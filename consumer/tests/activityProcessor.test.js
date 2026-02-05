const processActivity = require('../services/activityProcessor');
const Activity = require('../models/activityModel');

describe('Activity Processor', () => {
  it('stores valid activity event', async () => {
    Activity.create.mockResolvedValue(true);

    const event = {
      id: '123',
      userId: 'user-1',
      eventType: 'login',
      timestamp: new Date(),
      payload: { ip: '127.0.0.1' }
    };

    await processActivity(event);

    expect(Activity.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'user-1',
        eventType: 'login'
      })
    );
  });

  it('throws error if DB fails', async () => {
    Activity.create.mockRejectedValue(new Error('DB error'));

    await expect(
      processActivity({})
    ).rejects.toThrow('DB error');
  });
});
