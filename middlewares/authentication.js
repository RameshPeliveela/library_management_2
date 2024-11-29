const {verifyToken} = require('../jwt')

function authentication(req, res, next){    

    const token = req.headers['authorization'].split(" ")[1];  
    
    if(!token){
        return res.status(404).json({Error: 'Please signin'})
    }

    const payload = verifyToken(token);

    if(!payload){
        return res.status(404).json({Error: 'Invalid token'})
    }
    req.user = payload;
    next();

}

module.exports = {authentication}
