const mongoose = require("mongoose");
require("../configs/db.config");
const DroneModel = require("../models/Drone.model");

// Iteration #1
const drones = [
  {
    name: "General Atomics MQ-9 Reaper",
    propellers: 3,
    maxSpeed: 18,
  },
  {
    name: "General Atomics MT-700",
    propellers: 2,
    maxSpeed: 14,
  },
  {
    name: "General Atomics SuperCenas",
    propellers: 6,
    maxSpeed: 30,
  },
];

// require database configuration


DroneModel.create(drones)
    .then((drones) => {
        console.log(`Created ${drones.length} drones`);
        mongoose.connection.close();
    })
    .catch((err) =>
    console.log(`An error occurred while creating drones from the DB: ${err}`)
  );

