const { connectDb } = require("./config/db")
const app =require("./index")
require('dotenv').config();



const PORT = 8000
app.listen(PORT, async()=> {
    await connectDb()
    console.log("server started on ", PORT)
})

