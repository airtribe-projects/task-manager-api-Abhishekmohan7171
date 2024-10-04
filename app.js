require("dotenv").config()
const express = require('express');
const app = express();
const port = process.env.PORT;


const tasksRouter = require('./routes/tasks');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (req,res,next) => {
    console.log(`${req.method} Request recieved on ${req.url}`);
    next()
}

//error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};

app.use(logger);
app.use(errorHandler);

app.use("/api/v1/tasks",tasksRouter)

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;