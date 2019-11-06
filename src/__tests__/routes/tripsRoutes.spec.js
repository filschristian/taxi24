import request from 'supertest';
import app from '../../server';
import Trip from '../../models/trip';
import db from '../../database';

describe('tripsRoutes', () => {
  afterAll(async () => {
    await db.query('DELETE FROM trips WHERE pickup=$1 AND destination=$2;', ['test', 'test']);
  });
  it('should create a trip request', async () => {
    const res = await request(app)
      .post('/api/v1/trips')
      .send({
        riderId: 1,
        driverId: 1,
        destination: 'test',
        pickup: 'test'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('trip');
  });

  it('should return errors', async () => {
    const res = await request(app)
      .post('/api/v1/trips');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should return errors', async () => {
    const res = await request(app)
      .post('/api/v1/trips')
      .send({
        riderId: 100,
        driverId: 100,
        destination: 'test',
        pickup: 'test'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBeDefined();
  });

  it('should get active trips', async () => {
    const res = await request(app)
      .get('/api/v1/trips/active');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('trips');
  });

  it('should not get active trips (Not found)', async () => {
    jest.spyOn(Trip, 'getAllActive').mockResolvedValue({ rowCount: 0 });
    const res = await request(app)
      .get('/api/v1/trips/active');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('No active trip found');
  });

  it('should complete a trip', async () => {
    const { body: { trip: newTrip } } = await request(app)
      .post('/api/v1/trips')
      .send({
        riderId: 1,
        driverId: 1,
        destination: 'test',
        pickup: 'test'
      });
    const res = await request(app)
      .put(`/api/v1/trips/${newTrip.id}/complete`)
      .send({
        cost: 4000
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('invoice');
  });

  it('should get trip already completed', async () => {
    const res = await request(app)
      .put('/api/v1/trips/2/complete')
      .send({
        cost: 4000
      });
    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toBe('This trip is already completed');
  });

  it('should complete a trip', async () => {
    const res = await request(app)
      .put('/api/v1/trips/100/complete')
      .send({
        cost: 4000
      });
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Trip not found');
  });

  it('should get errors when completing trip', async () => {
    const res = await request(app)
      .put('/api/v1/trips/1/complete')
      .send({
        cost: 'Kigali'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });
});
