import db from '../database';

export default class Trip {
  static async createOne({
    riderId, driverId, pickup, destination
  }) {
    const queryString = `INSERT INTO trips(rider_id, driver_id, pickup, destination)
                        VALUES($1, $2, $3, $4) 
                        RETURNING id, rider_id AS "riderId", driver_id AS "driverId", pickup, destination, status`;
    const values = [riderId, driverId, pickup, destination];
    try {
      return await db.query(queryString, values);
    } catch (error) {
      return error;
    }
  }

  static async getAllActive() {
    const queryString = `SELECT trips.id, trips.pickup, trips.destination, riders.names AS rider, drivers.names AS driver, trips.status
                        FROM trips
                        INNER JOIN riders ON riders.id = trips.rider_id
                        INNER JOIN drivers ON drivers.id = trips.driver_id
                        WHERE trips.status=$1`;
    const values = ['active'];
    try {
      return await db.query(queryString, values);
    } catch (error) {
      return error;
    }
  }

  static async getOneById(id) {
    const queryString = 'SELECT * FROM trips WHERE id=$1';
    const values = [id];
    try {
      return await db.query(queryString, values);
    } catch (error) {
      return error;
    }
  }

  static async updateOne(id, cost) {
    const queryString = 'UPDATE trips SET status=$1, cost=$3 WHERE id=$2 RETURNING id, rider_id AS "riderId", driver_id AS "driverId", pickup, destination, status, cost';
    const values = ['complete', id, cost];
    try {
      return await db.query(queryString, values);
    } catch (error) {
      return error;
    }
  }
}
