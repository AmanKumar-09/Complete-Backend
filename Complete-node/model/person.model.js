// import mongoose, { Schema } from "mongoose";
// const { unionBy } = require("lodash");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: String,
    },
    job: {
      type: String,
      enum: ["emp", "senior", "junior"],
    },
    email: {
      type: String,
      unique : true,
      required: true,
    },
    address: {
      type: String,
    },
    sallary: {
      type: Number,
    },
    username:{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);





personSchema.pre('save', async function(next) {
  const person = this;
  if(!person.isModified('password')) return next()

    try {
      //hash password generator
      const salt = await bcrypt.genSalt(10);
      // hash password 

      const hashePassword = await bcrypt.hash(person.password , salt);
      person.password = hashePassword;


      next()
    } catch (error) {
      return next(error)
    }


    personSchema.methods.comparePassword = async function(candidatePassword) {
     
      try {
        return  await bcrypt.compare(candidatePassword , this.password)
          
      } catch (error) {
        console.log("Password didn't compared ")
        throw(error)
      }
    }

   

    


 } )


 const Person =  mongoose.model("Person", personSchema )

 module.exports = Person


 //hasing the password


