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
  location: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const Employer = model("Employer", employerSchema, "employers")

export default Employer;