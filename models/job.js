const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    description: {
        type: String,
        required: [true, "please provide a description"]
    },
    category: {
        type: String
    },
    country: {
        type: String,
        required: [true, "please provide a country name"]
    },
    city: {
        type: String,
        required: [true, "please provide a city name"]
    },
    location: {
        type: String,
        required: [true, "please provide a location"]
    },
    fixedSalary: {
        type: Number
    },
    salaryFrom: {
        type: Number
    },
    salaryTo: {
        type: Number
    },
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
})
const JobModel = mongoose.model("job", jobSchema)
module.exports = JobModel;