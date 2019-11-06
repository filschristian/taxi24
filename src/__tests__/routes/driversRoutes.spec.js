import request from 'supertest';
import app from '../../server';
import Driver from '../../models/driver';

describe('Get all drivers', () => {
  it('should get all drivers', async () => {
    const res = await request(app)
      .get('/api/v1/drivers');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('drivers');
  });

  it('should get drivers not found', async () => {
    jest.spyOn(Driver, 'getAll').mockResolvedValue({ rowCount: 0 });
    const res = await request(app)
      .get('/api/v1/drivers');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('No drivers found');
  });

  it('should get available drivers', async () => {
    const res = await request(app)
      .get('/api/v1/drivers?status=available');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('drivers');
  });

  it('should get errors when drivers status is wrong', async () => {
    const res = await request(app)
      .get('/api/v1/drivers?status=busy');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should get bad request because of missing parameters', async () => {
    const res = await request(app)
      .get('/api/v1/drivers/suggestions');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should get drivers suggestions within 3km', async () => {
    const res = await request(app)
      .get('/api/v1/drivers/suggestions?latitude=-1.956537&longitude= 30.063616');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('drivers');
  });

  it('should get no drivers suggestions within 3km', async () => {
    jest.spyOn(Driver, 'getAllByStatus').mockResolvedValue({ rows: [] });
    const res = await request(app)
      .get('/api/v1/drivers/suggestions?latitude=-1.956537&longitude= 30.063616');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('No drivers within 3km from your location');
  });

  it('should get driver by id', async () => {
    const res = await request(app)
      .get('/api/v1/drivers/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('driver');
  });

  it('should get driver not found', async () => {
    const res = await request(app)
      .get('/api/v1/drivers/15');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Driver not found');
  });

  it('should return validation errors', async () => {
    const res = await request(app)
      .get('/api/v1/drivers/hello');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });
});
