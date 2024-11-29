const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    mobile:{
        type:String
    }
}, {timestamps:true})

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        
    }
    catch(err){
        console.log(err)
    }
    next();
})

userSchema.methods.comparePassword = async function(typedPassword){
    try{
        const result = await bcrypt.compare(typedPassword, this.password);
        return result;
    }
    catch(err){
        console.log(err)
    }
}

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
