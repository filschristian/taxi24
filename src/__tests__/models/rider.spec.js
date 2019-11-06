import Rider from '../../models/rider';
import db from '../../database';

describe('Rider', () => {
  it('should return db errors on getAll', async () => {
    jest.spyOn(db, 'query').mockImplementation(() => {
      throw new Error();
    });
    try {
      await Rider.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return db errors on getOneById', async () => {
    jest.spyOn(db, 'query').mockImplementation(() => {
      throw new Error();
    });
    try {
      await Rider.getOneById();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
