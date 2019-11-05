import Rider from '../models/rider';
import Driver from '../models/driver';
import sortDrivers from '../helpers/sortDrivers';

export default class RidersController {
  static async getAllRiders(req, res) {
    const { rows, rowCount } = await Rider.getAll();
    if (rowCount === 0) {
      return res.status(404)
        .send({ message: 'No riders found' });
    }
    return res.status(200)
      .send({ message: 'Riders retrieved successfully', riders: rows, ridersCount: rowCount });
  }

  static async getRiderById(req, res) {
    const results = await Rider.getOneById(req.params.id);
    if (results.rows.length === 0) {
      return res.status(404)
        .send({ message: 'Rider not found' });
    }
    return res.status(200)
      .send({ message: 'Rider retrieved successfully', rider: results.rows });
  }

  static async getCloseDrivers(req, res) {
    const { rows } = await Rider.getOneById(req.params.id);
    if (rows.length === 0) {
      return res.status(404)
        .send({ message: 'Rider not found' });
    }
    const location = rows[0].location;
    const { rows: drivers } = await Driver.getAll();
    const sortedDrivers = sortDrivers(drivers, location);
    return res.status(200)
      .send({ message: 'Closest drivers to your location', drivers: sortedDrivers });
  }
}
