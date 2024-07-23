
const express = require("express");
const app = express();
const db = require("./db");

//parsing the data we get from client
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;


require('dotenv').config();
const routerPerson = require("./routes/person.route.js")
const routerMenuItem = require("./routes/menuItem.router.js")

app.get("/", (req, res) =>{
    res.send("welcome to my hotel .. how can i help use ")
})

app.use("/person" , routerPerson)
app.use("/item", routerMenuItem)

app.listen(PORT, () =>{
    console.log(`listening on the PORT ${PORT}`);
})


