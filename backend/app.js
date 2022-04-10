const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const userRoutes = require("./routes/AuthRouter")
const adminRoutes = require("./routes/adminRouter")
const app = express()

dotenv.config()

mongoose.connect('mongodb://localhost:27017/myapp',{
    useNewUrlParser:true,
    useUnifiedTopology :true
},()=>{
    console.log("DB connected");
})

app.use(express.json())
// app.use(cors())


app.use('/users',userRoutes)
app.use('/admin',adminRoutes)



const PORT = process.env.PORT || 5000
app.listen(PORT,
    console.log(`server started at port ${PORT}`)
)