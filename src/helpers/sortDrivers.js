import calculateDistance from './calculateDistance';

export default (drivers, location) => {
  drivers.forEach((d) => {
    const distance = calculateDistance(location[0], location[1], d.location[0], d.location[1]);
    d.distanceInKm = Math.ceil(distance);
  });

  const sortedDrivers = drivers.sort((a, b) => {
    return a.distanceInKm - b.distanceInKm;
  });

  return sortedDrivers.slice(0, 3);
};
