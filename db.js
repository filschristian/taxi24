/*
this script is for creating the postgres DB,
creating tables and seeding the database
for data needed to cover some case scenarios.
*/

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      drivers(
        id SERIAL PRIMARY KEY,
        names VARCHAR(25) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        email VARCHAR(25) NOT NULL UNIQUE,
        location TEXT[],
        status VARCHAR(25)
      ); CREATE TABLE IF NOT EXISTS
      riders(
        id SERIAL PRIMARY KEY,
        names VARCHAR(25) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        email VARCHAR(25) NOT NULL UNIQUE,
        location TEXT[]
      ); CREATE TABLE IF NOT EXISTS
      trips(
        id SERIAL PRIMARY KEY,
        pickup VARCHAR(25),
        destination VARCHAR(25),
        cost numeric,
        status VARCHAR(25) DEFAULT 'active',
        rider_id integer REFERENCES riders (id),
        driver_id integer REFERENCES drivers (id)
      );`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const seedDatabase = () => {
  const queryText = `INSERT INTO drivers
                      (names, phone, email, location, status) 
                      VALUES
                      ('chris1', '07888888881', 'chris1@email.com', '{-1.956537, 30.063616}', 'available'),
                      ('chris2', '07888888882', 'chris2@email.com', '{-1.971142, 30.103683}', 'on duty'),
                      ('chris3', '07888888883', 'chris3@email.com', '{-1.949549, 30.126161}', 'available'),
                      ('chris4', '07888888884', 'chris4@email.com', '{-1.978963, 30.223335}', 'on duty'),
                      ('chris5', '07888888885', 'chris5@email.com', '{-1.977940, 30.043773}', 'available');
                    INSERT INTO riders
                      (names, phone, email, location)
                      VALUES
                      ('Rene1', '0781111111', 'rene1@email.com', '{-1.977940, 30.043773}'),
                      ('Rene2', '0781111112', 'rene2@email.com', '{-1.978963, 30.223335}'),
                      ('Rene3', '0781111113', 'rene3@email.com', '{-1.947859, 30.059655}'),
                      ('Rene4', '0781111114', 'rene4@email.com', '{-1.971142, 30.103683}'),
                      ('Rene5', '0781111115', 'rene5@email.com', '{-1.956537, 30.063616}');
                    INSERT INTO trips
                      (pickup, destination, cost, status, rider_id, driver_id)
                      VALUES
                      ('Gikondo', 'Niboye', '2000', 'complete', '1', '1'),
                      ('Kacyiru', 'Kagarama', NULL, 'active', '2', '2'),
                      ('Biryogo', 'Gatsata', NULL, 'active', '3', '3'),
                      ('Kanombe', 'Kabuga', '5000', 'complete', '4', '4'),
                      ('Kicukiro', 'Gasabo', '6000', 'complete', '5', '5');`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = `DROP TABLE IF EXISTS drivers;
                    DROP TABLE IF EXISTS riders; 
                    DROP TABLE IF EXISTS trips;`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
  seedDatabase
};

require('make-runnable');
