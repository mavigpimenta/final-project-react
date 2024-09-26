const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require("bcryptjs");
const { User } = require('../models/user');

class UserController {
    static async register(req, res) {
        const { name, birthDate, edv, password, confirmPassword, role } = req.body;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!name || !role || !edv || !password || !birthDate)
            return res.status(400).json({ message: "Missing information." });
    
        const userExist = await User.findOne({ edv: edv });

        if (password != confirmPassword)
            return res.status(400).json({ message: "Passwords don't match." });

        if(!regex.test(password))
            return res.status(400).json({ message: "The password is weak." });
    
        if(userExist)
            return res.status(409).json({ message: "This EDV is already registered." });

        const normalizedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name: normalizedName,
            edv,
            password: passwordHash,
            role,
            birthDate,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
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
    
        if (!user) {
            return res.status(400).send({ message: "Invalid EDV or password." });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid EDV or password." });
        }
    
        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                name: user.name,
            },
            secret,
            {
                expiresIn: '2d',
            }
        );
    
        return res.status(200).send({ token });
    }
    

    static async updatePassword(req, res) {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const id = req.user?.id; 
        const userId = await User.findById(id);
        console.log('User ID from token:', userId);

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "Missing information." });
        }

        if (!userId) {
            return res.status(400).json({ message: "User not found." });
        }

        const validPassword = await bcrypt.compare(oldPassword, userId.password);

        if (!validPassword) 
            return res.status(400).json({ message: "Old password is incorrect." });

        if (newPassword !== confirmPassword) 
            return res.status(400).json({ message: "Passwords don't match." });

        if (!regex.test(newPassword)) 
            return res.status(400).json({ message: "The new password is weak." });

        const salt = await bcrypt.genSalt(12);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);

        userId.password = newPasswordHash;
        console.log(newPasswordHash);
        userId.updatedAt = Date.now();

        try {
            await userId.save();
            res.status(200).send({ message: "Password updated successfully." });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong.", data: error.message });
        }
    }

    static async searchUsers(req, res) {
        const { name, page = 1 } = req.query;
        const limit = 10; 
        const skip = (page - 1) * limit; 
    
        try {
            let query = { removedAt: null }; 
    
            if (name) {
                query.name = { $regex: name, $options: 'i' }; 
            }
    
            const users = await User.find(query).skip(skip).limit(limit);
            const totalUsers = await User.countDocuments(query); 
    
            const totalPages = Math.ceil(totalUsers / limit); 
    
            return res.status(200).json({
                users,
                totalPages,
                currentPage: page,
                totalUsers,
            });
        } catch (error) {
            return res.status(500).send({ message: "Something went wrong.", data: error.message });
        }
    }
    

    static async delete(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findById(id);
            if (!user) return res.status(404).send({ message: "user not found" });

            if (req.user.role !== 'ADMIN') 
                return res.status(403).send({ message: "Forbbiden" });
            
            user.removedAt = Date.now();
            await user.save();

            return res.status(200).send({ message: "Deleted post with sucessfully" });
        } catch (error) {
            return res.status(500).send({ error: "Something wrong", data: error.message });
        }
    }
}

module.exports = UserController;