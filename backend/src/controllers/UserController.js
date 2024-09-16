const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require("bcryptjs");

class UserController {
    static async register(req, res) {
        const { name, birth, edv, password, confirmPassword, role } = req.body;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!name || !role || !edv || !password || !birth)
            return res.status(400).json({ message: "Missing information." });
    
        const userExist = await User.findOne({ edv: edv });

        if (password != confirmPassword)
            return res.status(400).json({ message: "Passwords don't match." });

        if(!regex.test(password))
            return res.status(400).json({ message: "The password is weak." });
    
        if(userExist)
            return res.status(409).json({ message: "This EDV is already registered." });
        
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            birth,
            password: passwordHash,
            createdAt: Date.now(),
            updateAt: Date.now(),
            removedAt: null,
            edv,
            role
        });

        try {
            await User.create(user);
            res.status(201).send({ message: "Created user with sucessfully", data: user });
        } catch (error) {
            return res.status(500).send({ message: "Something failed", data: error.message })
        }   
    }

    static async login(req, res) {
        const { edv, password } = req.body;
        const user = await User.findOne({ edv });

        if(!user)
            return res.status(400).send({ message: "Invalid Email or password." });
        
        if(!bcrypt.compare(password, user.password)) {
            return res.status(400).send({ message: "Invalid Email or password." });
        }

        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            secret,
            {
                expiresIn: '2d'
            }
        );

        return res.status(200).send({token: token});
    }

    static async updatePassword(req, res) {
        const { edv, oldPassword, newPassword, confirmPassword } = req.body;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!edv || !oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "Missing information." });
        }

        const user = await User.findOne({ edv });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const validPassword = await bcrypt.compare(oldPassword, user.password);

        if (!validPassword) 
            return res.status(400).json({ message: "Old password is incorrect." });

        if (newPassword !== confirmPassword) 
            return res.status(400).json({ message: "Passwords don't match." });

        if (!regex.test(newPassword)) 
            return res.status(400).json({ message: "The new password is weak." });

        const salt = await bcrypt.genSalt(12);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);

        user.password = newPasswordHash;
        user.updateAt = Date.now();

        try {
            await user.save();
            res.status(200).send({ message: "Password updated successfully." });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong.", data: error.message });
        }
    }
}

module.exports = UserController;