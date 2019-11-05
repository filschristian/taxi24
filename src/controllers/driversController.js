import driver from '../models/driver';
import calculateDistance from '../helpers/calculateDistance';

export default class DriversController {
  static async getAllDrivers(req, res) {
    const { status } = req.query;
    const { rows, rowCount } = status
      ? await driver.getAllByStatus(status)
      : await driver.getAll();

    if (rowCount === 0) {
      return res.status(404)
        .send({ message: 'No drivers found' });
    }
    return res.status(200)
      .send({ message: 'Drivers retrieved successfully', drivers: rows, driversCount: rowCount });
  }

  static async getDriverById(req, res) {
    const results = await driver.getOneById(req.params.id);
    if (results.rows.length === 0) {
      return res.status(404)
        .send({ message: 'Driver not found' });
    }
    return res.status(200)
      .send({ message: 'Driver retrieved successfully', driver: results.rows });
  }

  static async getCloseDrivers(req, res) {
    const { latitude, longitude } = req.query;
    const { rows } = await driver.getAll();
    const drivers = rows.filter((d) => {
      return calculateDistance(latitude, longitude, d.location[0], d.location[1]) < 3;
    });
    if (drivers.length === 0) return res.status(404).send({ message: 'No drivers within 3km from your location' });

    return res.status(200).send({ message: 'List of drivers within 3Km', drivers });
  }
}
