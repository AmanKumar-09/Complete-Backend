// voting app for mern 

const express = require("express")
const app = express()

require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.get("/catagory", (req, res) =>{
    
})

app.listen(PORT , ()=>{
    console.log(`Listening on PRT ${PORT}`)
})


