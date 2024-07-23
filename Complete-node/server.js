
const express = require("express")
const app = express()
const db = require("./db")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const routerPerson = require("./routes/person.route.js")
const routerMenuItem = require("./routes/menuItem.router.js")

app.get("/", (req, res) =>{
    res.send("welcome to my hotel .. how can i help use ")
})

app.use("/person" , routerPerson)
app.use("/item", routerMenuItem)

app.listen(3000, () =>{
    console.log("listening on port ");
})


