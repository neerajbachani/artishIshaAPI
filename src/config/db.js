const mongoose = require("mongoose")



const connectDb = () => {
    return mongoose.connect(process.env.mongodburl);
}

module.exports={connectDb}