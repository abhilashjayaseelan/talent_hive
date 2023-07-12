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
        required: false
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
    },
    about: {
        type: String,
    },
    profession: {
        type: String,
    },
    resume: {
        type: String,
    }, 
    location: {
        type: String
    },
    experience: {
        type: Object
    }
})

export const User = model("User", userSchema, "users")
export type UserModel = typeof User;