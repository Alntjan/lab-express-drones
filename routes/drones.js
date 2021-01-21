const express = require('express');
const DroneModel = require('../models/Drone.model');

// require the Drone model here

const router = express.Router();

router.get('/drones', (req, res, next) => {
  DroneModel.find()
    .then((drones) => {
      console.log(drones);
      res.render('drones/list', { drones });
    })
    .catch((err) => {console.log('Error while getting the movies from the DB: ', err)})
});

router.get('/drones/create', (req, res, next) => {
  res.render("drones/create-form");
});

router.post('/drones/create', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  DroneModel.create({ name, propellers, maxSpeed })
    .then((drone) => {
      console.log(`New drone created: ${drone.name}`);
      res.redirect('/drones')
    }
  )
    .catch(() => res.render("drones/create-form"))
});

router.get('/drones/:id/edit', (req, res, next) => {
  DroneModel.findById(req.params.id)
    .then((drone) => {
    console.log(drone);
    res.render("drones/update-form", {drone});
  })
    .catch((err) => {console.log(err)})
});

router.post('/drones/:id/edit', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  DroneModel.findByIdAndUpdate(req.params.id, { name, propellers, maxSpeed }, { new: true })
    .then(() => {
      res.redirect('/drones')
    })
    .catch(() => res.render("drones/update-form"))
});

router.post('/drones/:id/delete', (req, res, next) => {
  DroneModel.findByIdAndDelete(req.params.id)
    .then(() => {res.redirect('/drones')})
    .catch((err) => console.log(err))
});

module.exports = router;
