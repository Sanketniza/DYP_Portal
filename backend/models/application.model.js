import mongoose from "mongoose";

// Changing exports to ES module style
export const url = 'mongodb://localhost:27017/job-portal';

const applicationSchema = new mongoose.Schema({

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },

    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }

}, { timestamps: true });

// Changing export for Application model
export const Application = mongoose.model("Application", applicationSchema);

export default Application;  // If you want to keep the default export for Application
