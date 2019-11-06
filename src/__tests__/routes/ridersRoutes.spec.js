import request from 'supertest';
import app from '../../server';
import Rider from '../../models/rider';

describe('ridersRoutes', () => {
  it('should get all riders', async () => {
    const res = await request(app)
      .get('/api/v1/riders');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('riders');
  });

  it('should get riders not found', async () => {
    jest.spyOn(Rider, 'getAll').mockResolvedValue({ rowCount: 0 });
    const res = await request(app)
      .get('/api/v1/riders');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('No riders found');
  });

  it('should get rider by id', async () => {
    const res = await request(app)
      .get('/api/v1/riders/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('rider');
  });

  it('should get rider not found', async () => {
    const res = await request(app)
      .get('/api/v1/riders/15');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Rider not found');
  });

  it('should get closest drivers', async () => {
    const res = await request(app)
      .get('/api/v1/riders/1/closeDrivers');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('drivers');
  });

  it('should get no drivers suggestions within 3km', async () => {
    jest.spyOn(Rider, 'getOneById').mockResolvedValue({ rows: [] });
    const res = await request(app)
      .get('/api/v1/riders/1/closeDrivers');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Rider not found');
  });
});
