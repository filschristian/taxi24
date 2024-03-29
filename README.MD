[![Build Status](https://travis-ci.org/filschristian/taxi24.svg?branch=master)](https://travis-ci.org/filschristian/taxi24)
[![Coverage Status](https://coveralls.io/repos/github/filschristian/taxi24/badge.svg?branch=master)](https://coveralls.io/github/filschristian/taxi24?branch=master)

# Taxi 24 API

A Mini Project to demonstrate software architecture, restfull design, quality of code and ability to model problems.

## Prerequisites

-   Install Node JS and NPM
    if you don't know how, follow this link https://nodejs.org/en/download/

-   Download and install POSTGRESQL database link: https://www.postgresql.org/download/

-   Install a code editor in case you want to edit or change something.

-   Install Postman to test the RestFull API endpoints.

## Getting Started

-   Open your terminal
-   Clone the repo: `git clone https://github.com/filschristian/taxi24.git`
-   Create a DATABASE in POSTGRESQL `example of the DB name: taxi24`
-   Set up dev environment: **duplicate .env.example** (Note: you must create a `.env` file in your root directory )
    ```
      PORT=5000
      PGHOST = localhost
      PGUSER = your_postgres_username
      PGPASSWORD = your_postgres_password
      PGDATABASE = your_postgres_database (ex: taxi24)
      PGPORT = 5432
    ```
-   Setup the above credentials in your `.env` file
-   Install packages:`npm install`
-   Create tables and seed data: `npm run db:seed`
-   Run the production server: `npm start`

Optional: Instead of using the production server you can run the development server using `npm run dev`

## NPM Scripts

-   `npm run test`: Runs the test
-   `npm run start`: Start the development version of the app
-   `npm run db:seed`: Create and populate the database with dummy data

## Run in Postman

You can import the copy of my Postman API end-points collection to save time!!!! :smiley: **Click the button below**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d15fe94dcb74246ce1af)

## Endpoints

### Documentation

https://documenter.getpostman.com/view/6005466/SW15xbNQ

| Endpoint                                | Methods | Token | Functionalities                  |
| --------------------------------------- | ------- | ----- | -------------------------------- |
| /api/v1/drivers                         | GET     | No    | Get a list of all drivers        |
| /api/v1/drivers?status=available        | GET     | No    | Get a list of available drivers  |
| /api/v1/drivers/suggestions             | GET     | No    | Get available drivers within 3km |
| /api/v1/drivers/`<driverId>`            | GET     | No    | Get a specific driver by ID      |
| /api/v1/trips                           | POST    | No    | Create a trip request            |
| /api/v1/trips/`<tripId>`/complete       | PUT     | No    | Complete a trip                  |
| /api/v1/trips/active                    | GET     | No    | Get all active trips             |
| /api/v1/riders                          | GET     | No    | Get all riders                   |
| /api/v1/riders/`<riderId>`/             | GET     | No    | Get a specific rider by ID       |
| /api/v1/riders/`<riderId>`/closeDrivers | GET     | No    | Get 3 closest drivers            |

### Requirements:

-   `POST: /api/v1/trips`:
    required request body ==>
    ```
    {
    riderId: 'rider Id', <integer>
    driverId: 'driver Id', <integer>
    pickup: 'pickup location', <string>
    destination: 'destination location' <string>
    }
    ```
-   `PUT: /api/v1/trips/<tripId>/complete`:
    required request body ===>
    ```
    {
    cost: 'trip cost' <number>
    }
    ```

## Author

-   **Rene Christian Nshogoza**
