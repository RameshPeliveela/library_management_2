const users = require('../models/userModels');
const {generateToken} = require('../jwt');

async function userLogin(req, res){
    try{
        const {email, password} = req.body
        const user = await users.findOne({email: email})
        if(!user){
            return res.status(404).json({Error: 'User not found please register yourslef...'})
        }
        const result = await user.comparePassword(password);
        if(!result){
            return res.status(404).json({Error: 'Incorrect Password'})
        }
        const payload = {
            id:user.id,
            role:user.role,
        }
        const token = generateToken(payload)
        res.status(200).json({Token :token, user:user});
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error: 'internal Error in signin'})
    }
}

module.exports = {userLogin}
