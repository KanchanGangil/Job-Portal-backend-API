const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name!"],

    },
    email: {
        type: String,
        required: [true, "Please enter your Email!"],

    },
    coverLetter: {
        type: String,
        required: [true, "Please provide a cover letter!"],
    },
    phone: {
        type: Number,
        required: [true, "Please enter your Phone Number!"],
    },
    address: {
        type: String,
        required: [true, "Please enter your Address!"],
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["job seeker"],
            required: true,
        },
    },
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["employer"],
            required: true,
        },
    },
});

const ApplicationModel = mongoose.model("application", ApplicationSchema);
module.exports = ApplicationModel