import db from '../database';

export default class Rider {
  static async getAll() {
    const queryString = 'SELECT * FROM riders';
    try {
      return await db.query(queryString);
    } catch (error) {
      return error;
    }
  }

  static async getOneById(id) {
    const queryString = 'SELECT * FROM riders WHERE id=$1';
    const values = [id];
    try {
      return await db.query(queryString, values);
    } catch (error) {
      return error;
    }
  }
}
