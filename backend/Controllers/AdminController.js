
const Admin = require("../models/adminModel")
const asyncHandler = require("express-async-handler")
const generateToken=require('../Token/tokenGenerate')


const authAdmin = asyncHandler (async (req,res) =>{
   
    const {name,password} = req.body
    const admin = await Admin.findOne({name,password})
    if(admin){
        res.json({
            _id: admin._id,
            name:admin.name,
            token:generateToken(admin._id)
        })
    }else{
        throw new Error("Invalid login")
    }
    
   
})
module.exports ={authAdmin}