import { Schema, model } from "mongoose";

const employerSchema = new Schema({
  companyName: {
    type: String,
    required: [true, "Please add a company name"],
  },
  industry: {
    type: String,
    required: [true, "Please add the industry name"],
  },
  email:{
    type: String,
    required: [true, "Please add an email"]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "employer"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  image: {
    type: String
  }
});

export const Employer = model("Employer", employerSchema, "employers")

export type EmployerModel = typeof Employer;
