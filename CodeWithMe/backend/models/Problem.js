const mongoose = require("mongoose");

const testcaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
});

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        required: true,
        enum: ["Easy", "Medium", "Hard"]
    },

    statement: {
        type: String,
        required: true
    },

    example: {
        type: String,
        required: true
    },

    testcases: {
        type: [testcaseSchema],
        required: true
    }
},
{
    timestamps: true
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;