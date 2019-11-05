import trip from '../models/trip';
import Invoice from '../models/invoice';
import Rider from '../models/rider';
import Driver from '../models/driver';

export default class TripsController {
  static async create(req, res) {
    const results = await trip.createOne(req.body);
    if (results.rows) {
      return res.status(201)
        .send({ message: 'Trip request created successfully', trip: results.rows[0] });
    }
    return res.status(400)
      .send({ message: results.detail });
  }

  static async getActiveTrips(req, res) {
    const { rows, rowCount } = await trip.getAllActive();
    if (rowCount === 0) {
      return res.status(404)
        .send({ message: 'No active trip found' });
    }
    return res.status(200)
      .send({ message: 'Active trips retrieved successfully', trips: rows, tripCount: rowCount });
  }

  static async updateTrip(req, res) {
    const results = await trip.updateOne(req.params.id, req.body.cost);
    const {
      riderId, driverId, pickup, destination, cost, id
    } = results.rows[0];
    const rider = await Rider.getOneById(riderId);
    const driver = await Driver.getOneById(driverId);
    const invoice = new Invoice(
      rider.rows[0].names, driver.rows[0].names, pickup, destination, cost, id
    );
    return res.status(200)
      .send({ message: 'Trip completed successfully', invoice: invoice.print() });
  }

  static async completeTrip(req, res) {
    const results = await trip.getOneById(req.params.id);
    if (results.rows.length === 0) return res.status(404).send({ message: 'Trip not found' });
    if (results.rows[0].status === 'complete') return res.status(409).send({ message: 'This trip is already completed' });
    return TripsController.updateTrip(req, res);
  }
}
