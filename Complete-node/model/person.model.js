// import mongoose, { Schema } from "mongoose";
const { unionBy } = require("lodash");
const mongoose = require("mongoose")
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
      required: true,
      unique: true
    },
    address: {
      type: String,
    },
    sallary: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

 const Person =  mongoose.model("Person", personSchema )

 module.exports = Person