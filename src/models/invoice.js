export default class Invoice {
  constructor(rider, driver, pickup, destination, cost, id) {
    this.rider = rider;
    this.driver = driver;
    this.pickup = pickup;
    this.destination = destination;
    this.cost = cost;
    this.id = id;
  }

  print() {
    return {
      tripId: this.id,
      trip: `From ${this.pickup} to ${this.destination}`,
      rider: this.rider,
      driver: this.driver,
      cost: this.cost
    };
  }
}
