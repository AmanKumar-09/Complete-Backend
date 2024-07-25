const express = require("express")

const router  = express.Router()
const MenuItem = require("../model/menuItem.model.js")

// create menu item - post create a database 
router.post("/", async(req, res) =>{
    try {
      const data = req.body
      const addedItem =  new MenuItem(data)
      await addedItem.save()
      console.log("data saved")
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

// find menu items   - get read a database
 router.get("/", async(req, res) =>{

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

// find menu items using parameter  - read database using params 

router.get("/:taste", async(req, res) =>{
    try {
        const {taste} = req.params

        // chack validation with taste 
        if(taste === "sour" || taste === "sweet" || taste === "spicy"){
            const response = await MenuItem.find({taste: taste})
            console.log("response fetched successfully")
            res.status(200).json(response)
        } else{
            res.status(400).json({error: "Inalid search taste"})
        }
    } catch (error) {
        console.log("error in server")
        res.status(500).json(error)
    }
})




module.exports = router