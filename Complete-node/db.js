const mongoose = require("mongoose")
require("dotenv").config()

// defining mongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL  = process.env.MONGODB_URL

//setup mongodb connection
mongoose.connect(mongoURL)


// get the default connection 
// mongoose maintains a default connection object representing the mongodb connection
const db = mongoose.connection


// defined the event listener for database connection
db.on('connected', () =>{
    console.log("connected to mongodb server")
})
db.on('error', (error) =>{
    console.log("mongodb connection error",error)
})


db.on('disconnected', () =>{
    console.log("mongodb  disconnected")
})


// export the databse connection
module.exports  = db;
