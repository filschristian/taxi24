import Trip from '../../models/trip';
import db from '../../database';

describe('Trip', () => {
  it('should return db errors on createOne', async () => {
    jest.spyOn(db, 'query').mockImplementation(() => {
      throw new Error();
    });
    try {
      await Trip.createOne({
        riderId: 1, driverId: 1, pickup: 'test', destination: 'test'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return db errors on getOneById', async () => {
    jest.spyOn(db, 'query').mockImplementation(() => {
      throw new Error();
    });
    try {
      await Trip.getOneById();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return db errors on getAllActive', async () => {
    jest.spyOn(db, 'query').mockImplementation(() => {
      throw new Error();
    });
    try {
      await Trip.getAllActive();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it('should return db errors on updateOne', async () => {
    jest.spyOn(db, 'query').mockImplementation(() => {
      throw new Error();
    });
    try {
      await Trip.updateOne();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
