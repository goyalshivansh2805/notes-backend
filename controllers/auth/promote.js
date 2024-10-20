const User = require('../../models/User');

const handlePromote = async (req, res) => {
    const userId = req.user?._id || null;
    if(!userId || req.user.role !== "admin"){
        return res.status(401).json({message:"You are not authorized to promote a user!"});
    }
    const { email } = req.body;
    if(!email){
        return res.status(400).json({message:"Please provide email!"});
    }
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"User does not exist"});
        user.role = "admin";
        await user.save();
        res.status(200).json({message: "User promoted successfully!"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = handlePromote;