const express = require("express");
const app = express();
const db = require("./db");
const passport = require("./auth.middleware.js")

//parsing the data we get from client
const bodyParser = require("body-parser");
app.use(bodyParser.json());


const PORT = process.env.PORT || 10000;

require('dotenv').config();
const routerPerson = require("./routes/person.route.js")
const routerMenuItem = require("./routes/menuItem.router.js");

const logRequest = ( req ,res , next) =>{
    console.log(`[${ new Date().toLocaleString()}] Request made to ${req.originalUrl}`);
    next(); // move to the next phase
}
app.use(logRequest)

// passport authentication with username and password 

// initialising the middleware 
 app.use(passport.initialize());
 const localAuthMiddleware = passport.authenticate('local', {session: false})


app.get("/", localAuthMiddleware, (req, res) =>{
    res.send("welcome to my hotel .. how can i help use ")
})

app.use("/person" , routerPerson)
app.use("/item",  routerMenuItem)

app.listen(PORT, () =>{
    console.log(`listening on the PORT ${PORT}`);
})


