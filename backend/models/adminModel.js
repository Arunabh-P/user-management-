const mongoose = require ("mongoose")
const bcrypt = require("bcrypt")


const AdminSchema = mongoose.Schema(
{
    
    name:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
}    
)
AdminSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt =await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

AdminSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const Admin =mongoose.model("Admin",AdminSchema)

module.exports = Admin