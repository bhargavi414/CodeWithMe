const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    verdict: {
        type: String,
        required: true
    },

    passed: {
        type: Number,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    results: [
        {
            input: String,
            got: String,
            expected: String,
            status: String
        }
    ],

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
});

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;