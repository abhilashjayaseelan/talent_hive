import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "please add a name"]
    },
    email: {
        type: String,
        required: [true, "please add an email"]
    }, 
    phone: {
        type : Number,
        required: [true, "please add a phone number"]
    }, 
    password: {
        type: String
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    education: {
        type: Array
    },
    skills: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: "user"
    },
    image: {
        type: String,
    }
})

const User = model("User", userSchema, "users")

export default User;