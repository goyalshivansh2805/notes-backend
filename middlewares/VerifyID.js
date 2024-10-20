const {getSession} = require("../service/auth");
const User = require("../models/User");

const verifyId = async (req, res, next) => {

    const sessionId= req.cookies?.sessionId;
    if(!sessionId) return res.status(401).json({message:"Unauthorized"});

    const userId =  getSession(sessionId);
    console.log(sessionId);
    console.log(userId);
    if(!userId) return res.status(401).json({message:"Unauthorized"});

    const user = await User.findById(userId);
    if(!user) return res.status(401).json({message:"Unauthorized"});

    req.user = {};
    req.user._id = userId;
    req.user.role = user.role;
    next();
}


module.exports = verifyId;