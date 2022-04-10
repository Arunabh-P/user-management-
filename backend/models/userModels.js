const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"]
    },
    email:{
        type:String,
        unique: true,
        required:  [true, "Email is required"]
    },
    phone:{
        type: Number,
        required: [true,"Mobile Number is required"]
    },
    password:{
        type: String,
        required: [true,"Password is manditory"]
    }
}, {collection :'user'})

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt =await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
const User =mongoose.model("User",UserSchema)

module.exports = User