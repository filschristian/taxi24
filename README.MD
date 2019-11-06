[![Coverage Status](https://coveralls.io/repos/github/filschristian/taxi24/badge.svg?branch=master)](https://coveralls.io/github/filschristian/taxi24?branch=master)

# Taxi 24 API

A Mini Project to demonstrate software architecture, restfull design, quality of code and ability to model problems.

## Prerequisites

-   Install Node JS and NPM
    if you don't know how, follow this link `https://nodejs.org/en/download/`

-   Download and install POSTGRESQL database link: `https://www.postgresql.org/download/`

-   Install a code editor in case you want to edit or change something.

-   Install Postman to test the RestFull API endpoints.

## Get Started

-   Open your terminal
-   Clone the repo: `git clone https://github.com/filschristian/taxi24.git`
-   Set up dev environment: `duplicate .env.example` (Note: you must have a `.env` file in your root directory )
    ```
      PORT=5000
      PGHOST = localhost
      PGUSER = your_postgres_username
      PGPASSWORD = your_postgres_password
      PGDATABASE = taxi24
      PGPORT = 5432
    ```
-   Setup the above credentials in `.env` file
-   Install packages:`npm install`
-   Create DB, tables and seed data: `npm run db:seed`
-   Run the development server: `npm start`

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
