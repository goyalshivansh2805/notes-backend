const User = require("../../models/User");
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {

    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"Please provide all fields!"}
    )};
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ id : user._id,message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = handleRegister;