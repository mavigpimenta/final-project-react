const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    edv: {
        type: String,
        minlength: 6,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
        default: 'STUDENT',
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    removedAt: {
        type: Date,
        required: false
    }
})

const User = mongoose.model('User', userSchema)

exports.User = User;
exports.userSchema = userSchema;