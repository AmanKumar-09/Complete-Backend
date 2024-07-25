const express = require("express")
const Person = require("../model/person.model")
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("../jwt")




// create person data 
router.post("/signup", async(req, res) =>{
    try {
        const data = req.body
        //create a new document using mongoose model 
        const newperson = new Person(data)
        const response = await newperson.save()
        console.log("data saved successfully")
        console.log("token started ")

        //generate the token
        const payLoad = {
            id: response.id,
            username: response.username
        } 
        console.log(JSON.stringify(payLoad))

        const token = generateToken(payLoad);
        console.log('Token is : ', token)
        res.status(200).json(
            {
                response: response,
                token: token
            }
        )
    } catch (error) {
        res.status(500).json({error : "internal server error ", error: error})
    }
})

//login route
router.post("/login", async(req, res)=>{
   try {
     
     const {username, password } = req.body
 
     const user = await Person.findOne({username: username})
     console.log(username, password)
 

     //condition to check the password 

    //  if(!user || !(await user.comparePassword(password))){
    //      return res.status(401).json({error: 'Invalid username or password'})
    //  }
 
     // generate token 
     const payLoad = {
         id: user.id,
         username: user.username
     }
 
     const token = generateToken(payLoad)
     //return token as a response 
     res.status(200).json({token})
   } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Internal sever error '})
   }
    
})

// read all the data 
router.get("/",jwtAuthMiddleware, async(req, res) =>{
    try {
        const user = await Person.find()
        res.status(200).json(user)     
        
    } catch (error) {
        res.status(500).json(error )
    }
})

// getting data form the url 
router.get("/:workType", async (req, res) =>{

    try {
        const {workType} = req.params; // extract the work from the url parameter 

        if(workType === 'emp' || workType === 'senior' || workType === 'junior'){

            const response  = await Person.find({job: workType})
            console.log("response fetched ")
            res.status(200).json({ response})

        }
        else{
            res.status(404).json({error : "error job type"})
        }
    } catch (error) {
        console.log("error occured",error)
        res.status(500).json({ error: "Enternal server error"})
    }


})


//  update the database  - put/patch

router.put("/:_id", async(req, res) =>{
    try {
        const {_id } = req.params  // extract the id from the user url
    
        const updataPersonData = req.body  // update the data from the person 
        const response = await Person.findByIdAndUpdate(_id, updataPersonData ,{
            new : true, // return the updated document 
            runValidators : true  // run and check the mongoose validation 
        })
        if(!response){
            return res.status(404).json({error: 'Person not found '})
        }

        console.log(' data updated')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

// Delete the data-person - delete

router.delete("/:_id", async(req, res) =>{
    try {
        const {_id} = req.params
    
        const response = await Person.findByIdAndDelete(_id)

        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }
        console.log("data deleted")
    
        res.status(200).json({message: 'Person deleted successfully'})
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router