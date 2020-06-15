const Workout = require("../models/workout.js");
const app = require("express").Router();

module.exports = function (app) {

    // GET route retreives exercise data displayed on /stats page 
    app.get("/api/workouts/range", (req, res) => {
        Workout.find({}).limit(7)
            // parses and sends it as an array of objects to the front end
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // POST route creates new exercise 
    app.post("/api/workouts", (req, res) => {
        Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/workouts", (req, res) => {
        Workout.find()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // PUT route updates a workout by locating its id and pushing the changes into the exercise-object body
    app.put("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate({ _id: params.id },
            {$push: {exercises: body }})
            .then(data => {
                res.json(data);
            });
    });

    //DELETE route finds a workout by id and removes it
    app.delete("/api/workouts/:id", ({ body }, res) => {
        console.log(body)
        Workout.findByIdAndDelete({_id: body.id })
        .then(data => {
            res.json(data);
        });

    });
};

