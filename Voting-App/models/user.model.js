const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        name:{
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true

        },
        email:{
            type: String,
        },
        mobile:{
            type: String
        },
        address:{
            type: String,
            required: true
        },
        aadhaarNumber:{
            type: Number,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required:true,
        },
        role:{
            type: String,
            enum: ['voter', 'admin'],
            default: 'voter'
        },
        isVoted:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User;