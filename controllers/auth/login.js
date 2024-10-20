const bcrypt = require('bcrypt');
const User = require('../../models/User');
const {v4:uuidv4} = require("uuid");
const {createSession} = require("../../service/auth")

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please provide email and password!"});
    }
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"User does not exist"});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const sessionId = uuidv4();
        createSession(sessionId,user._id);
        res.cookie("sessionId",sessionId,{httpOnly:true});

        res.status(200).json({ id:user._id, message: "User logged in successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = handleLogin;