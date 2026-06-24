const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(
        "mongodb+srv://BhargaviRoutu:N1WGcUDPRbjYjSrA@cluster0.wr78xvz.mongodb.net/oj-platform?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("MongoDB Connected");
}

module.exports = connectDB;