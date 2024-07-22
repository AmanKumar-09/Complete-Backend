
const express = require("express")
const app = express()
const db = require("./db")
const Person = require("./model/user.model.js")
const MenuItem = require("./model/menu.model.js")
const bodyParser = require("body-parser")
app.use(bodyParser.json())


app.get("/", (req, res) =>{
    res.send("welcome to my hotel .. how can i help use ")
})

app.post("/person", async(req, res) =>{
    try {
        const data = req.body
        const newperson = new Person(data)
        const response = await newperson.save()
        console.log("data saved successfully")
        res.status(200).json(
            {
                success: true,
                data: newperson,
                message: " person added successfully",
            }
        )
    } catch (error) {
        res.status(500).json({error : "internal server error ", error: error})
    }
})



app.get("/person", async(req, res) =>{
    try {
        const user = await Person.find()
        res.status(200).json(user)
        

        
        
    } catch (error) {
        res.status(500).json(error )
    }
})

app.post("/item", async(req, res) =>{
   try {
     const data = req.body
     const addedItem =  new MenuItem(data)
     await addedItem.save()
     res.status(200).json(
        {
            status: true,
            addedItem,
            message: "Item saved successfully"
        }
     )
   } catch (error) {
    res.status(500).json(error)
   }
})

app.get("/item", async(req, res) =>{

    try {
        const data = await MenuItem.find()
        res.status(200).json(
            {
                status: true,
                data,
                message: "get the menu successfully"
            }
         )

    } catch (error) {
        res.status(500).json(error)
        
    }
    
})

app.listen(3000, () =>{
    console.log("listening on port ");
})


