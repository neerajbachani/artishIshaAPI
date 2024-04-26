
const RAZORPAY = require("razorpay")
// import { RAZORPAY } from 'razorpay'; 

// apiKey = "rzp_test_a5dyAtDUVaoFn3"
// apiSecret = "P6bawVWNvCYWj8w7kJTcXT7A"



 const razorpay = new RAZORPAY({
    key_id: process.env.apiKey,
    key_secret: process.env.apiSecret
})

module.exports = {razorpay}