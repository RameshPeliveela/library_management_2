const userModel = require('../models/userModels')

//getAll users
async function getAllUsers(req, res){
    try{
        const response = await userModel.find({role:'user'});
        if(response.length === 0){
            return res.status(200).json({Message: 'No users'})
        }
        
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        req.status(500).json({Error: 'Internal Server Error'})
    }

}

//create user
async function createUser(req, res) {
    try{
        const data = req.body;
        const newUser = new userModel(data);
        const response = await newUser.save();
        return res.status(201).json('user added')
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

//get user by id
async function getUserById(req, res){
    const {id} = req.params;
    try{
        const user = await userModel.findById(id)
        if(!user){
            return res.status(200).josn({Message : 'No User with this Id'})
        }
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Error: 'Internal Server'})
    }

}

//update user by id
async function updateUser(req, res) {
    const {id} = req.params;
    const data = req.body;
    try{
        await userModel.findByIdAndUpdate(id, data)
        return res.status(200).json("user updated")
    }
    catch(err){
        console.log(err);
        return res.status(500).josn({Error: 'internal server Error'})
    }
    
}

//delete user by id
async function deleteUser(req, res) {
    const {id} = req.params;
    try{
        const response = await userModel.findByIdAndDelete(id);
        return res.status(200).json('user deleted')
    }
    catch(err){
        console.log(err);
        return res.status(500).josn({Error: 'internal server Error'})
    }
}

//user profile
async function userProfile(req, res) {
    const {id} = req.user
    try{
        const userProfile = await userModel.findById(id)
        if(!userProfile){
            return res.status(400).josn("No user")
        }
        return res.status(200).json(userProfile)
    }
    catch(err){
        console.log(err)
        return res.status(500).josn(err)
    }
}

//changePassword

async function changePassword(req, res){
    
    const {id} = req.user;
    const {oldPassword, newPassword} = req.body;
    try{
        const user = await userModel.findById(id);
        const oldPswMatch = await user.comparePassword(oldPassword);
        if(!oldPswMatch){
            return res.status(400).json("Incorrect password")
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json("Password changed successfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).josn("Internal server error")
    }
}

module.exports = {getAllUsers, createUser, getUserById, updateUser, deleteUser, userProfile, changePassword}
