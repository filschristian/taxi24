import Driver from '../../models/driver';
import db from '../../database';

describe('Driver', () => {
  it('should return db errors on getAll', async () => {
    jest.spyOn(db, 'query').mockImplementation(() => {
      throw new Error();
    });
    try {
      await Driver.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return db errors on getOneById', async () => {
    jest.spyOn(db, 'query').mockImplementation(() => {
      throw new Error();
    });
    try {
      await Driver.getOneById();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return db errors on getAllByStatus', async () => {
    jest.spyOn(db, 'query').mockImplementation(() => {
      throw new Error();
    });
    try {
      await Driver.getAllByStatus();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
