const db = require("../models");
const app = require("express").Router();

module.exports = function (app) {

    // GET app retreives exercise data displayed on /stats page 
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).limit(7)
            // parses and sends it as an array of objects to the front end
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/workouts", (req, res) => {
        db.Workout.find()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    });

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        db.Workout.findByIdAndUpdate({ _id: params.id },
            {$push: {exercises: body }})
            .then(data => {
                res.json(data);
            })
    })

    app.delete("/api/workouts/:id", ({ body }, res) => {
        console.log(body)
        db.Workout.findByIdAndDelete({_id: body.id })
        .then(data => {
            res.json(data);
        })

    })
};


// set up post route to create a new empty object and return the id (mongoose automatically creates an id)

// put route that updates item that was just created because it is empty. Receive id in the request params, the req body will contain the required info.
// once the item is found in the db, we need to set the req-body to the information.

// getall route, query db and return everything (run find method and pass in an empty object)

// getweeklyworkouts route, use find to pass nothing. Use a mongoose method called limit .limit(7)
// goes to api/workouts/range (see frontend to see where range is targeted)

// delete route targeted by the id which comes from the request params.