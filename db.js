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

const createDB = () => {
  const queryText = 'CREATE DATABASE taxi24;';
  new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  }).query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

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
                      VALUES('chris', '078', 'chris@email.com', '{-1.956537, 30.063616}', 'available');
                    INSERT INTO riders
                      (names, phone, email, location)
                      VALUES('Rene', '078', 'rene@email.com', '{-1.947859, 30.059655}');
                    INSERT INTO trips
                      (pickup, destination, cost, rider_id, driver_id)
                      VALUES('Gikondo', 'Niboye', '2000', '1', '1');`;
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
  createDB,
  seedDatabase
};

require('make-runnable');
