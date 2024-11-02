const mongoose = require("mongoose")

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (err) {
        console.log("Error connection: ", err)
    }
}

module.exports = connectDB