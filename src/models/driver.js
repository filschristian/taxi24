import db from '../database';

export default class Driver {
  static async getAll() {
    const queryString = 'SELECT * FROM drivers';
    try {
      return await db.query(queryString);
    } catch (error) {
      return error;
    }
  }

  static async getOneById(id) {
    const queryString = 'SELECT * FROM drivers WHERE id=$1';
    const values = [id];
    try {
      return await db.query(queryString, values);
    } catch (error) {
      return error;
    }
  }

  static async getAllByStatus(status) {
    const queryString = 'SELECT * FROM drivers WHERE status=$1';
    const values = [status];
    try {
      return await db.query(queryString, values);
    } catch (error) {
      return error;
    }
  }
}
